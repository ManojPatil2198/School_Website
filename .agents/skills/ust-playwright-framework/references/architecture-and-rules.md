# UST Playwright Framework Architecture & Engineering Rules

## 1. Core Principles & Mindset

### Authority & Precedence Hierarchy

When conflicting guidance arises, resolution must strictly follow this order:

1. Explicit user prompt constraints
2. `SKILL.md` (Main Orchestration & Routing)
3. `references/architecture-and-rules.md` (This Architecture & Rules Document)
4. `references/workflows.md` (Execution Workflows)
5. `references/templates-and-examples.md` (Templates & Examples)
6. Existing project code patterns in `pages/`, `tests/`, `fixtures/`, `utils/`

### Universal Principles

- **Reuse Before Create**: Never create a new Page Object, Component, Fixture, Utility, Helper, or Data file without first inspecting existing codebase assets. If it exists, reuse it; if it can be extended or composed, do so.
- **Do Not Guess**: Never assume locator selectors, page routes, DOM structures, or error causes. Always inspect source files, actual DOM tree, or Playwright execution traces/logs before making edits.
- **Minimal Change Principle**: Touch only the exact files required to accomplish the target task. Do not perform unsolicited refactoring, file movement, or cosmetic edits on unrelated files.
- **No Unnecessary Abstractions**: Do not introduce generic wrapper functions, BaseClasses, helper layers, or architectural abstractions unless there is a concrete, immediate framework requirement.

---

## 2. Layered Architecture & Separation of Concerns

```
Test → Fixture → Page Object → Reusable Component → Locator
```

### Layer Responsibilities (Strict & Non-Reversible)

| Layer                               | Responsibility                    | What It May Contain                                                                                         | What Is Prohibited                                                                             |
| :---------------------------------- | :-------------------------------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Test** (`tests/`)                 | Business scenarios & verification | Scenario steps, business assertions, calls to fixtures/POM methods, scenario state (e.g. `setViewportSize`) | Raw locators (`getByRole`, `locator`), direct UI actions (`click`, `fill`), hardcoded raw data |
| **Fixture** (`fixtures/`)           | Dependency injection & lifecycle  | Page Object instantiation, test context setup, auth state, typed data loading                               | Business scenario logic, UI assertions, un-typed generic objects                               |
| **Page Object** (`pages/`)          | Page-specific UI encapsulation    | Page locators, user actions/workflows, component composition, navigation, DOM load waits                    | Scenario-level assertions, generic utilities, duplicated component locators ("God Object")     |
| **Component** (`pages/components/`) | Reusable UI section encapsulation | Root/child locators for reusable UI, component actions, component visibility checks                         | Page-level navigation, scenario logic, duplicated locators owned by other components           |
| **Locator**                         | UI Element identification         | Semantic locators (`getByRole`, `getByLabel`), stable attributes                                            | Unstable CSS classes, positional indices (`nth`), XPath text matching                          |

---

## 3. WordPress Page, Template & Component Rules

App Under Test: United School of Tokyo (UST) ~33-page WordPress site.

### Page Object & Template Decision Tree

Before creating a new Page Object, evaluate:

```
Target WordPress Page
  ├─ Shares layout & behavior with an existing Page Object? → REUSE existing Page Object
  ├─ Uses a shared WordPress Page Template (e.g. standard info page)? → EXTEND/REUSE template Page Object
  ├─ Consists primarily of existing components (Header, Footer, Nav)? → COMPOSE existing Components
  └─ Has genuinely unique layout, workflows, and elements? → CREATE new Page Object
```

> **Rule**: One URL **does not** equal one Page Object. Pages sharing the same WordPress layout/template (`/about`, `/learning`, `/school-life`) must share a reusable Page Object structure rather than duplicating identical locator files.

### Component Ownership & Reuse

Current registered reusable components in `pages/components/`:

- `Header.ts` — Logo, top controls, language selectors, top bar.
- `NavigationMenu.ts` — Main navigation bar, multi-level dropdown menus, mobile menu toggle.
- `HeroSlider.ts` — Hero banner slides, next/prev slide controls, hero CTA buttons.
- `HelpfulLinks.ts` — Quick access cards, helpful link grid.
- `SocialLinks.ts` — External social media icons and footer social links.
- `Footer.ts` — Footer container, site map links, copyright section.

**Single Ownership Rule**: Each UI element has **exactly one logical component owner**.

- Example: The UST Logo locator lives exclusively in `Header.ts`. `HomePage.ts`, `AboutPage.ts`, and `AdmissionsPage.ts` must compose `Header` rather than redeclaring the logo locator.

---

## 4. Locator Strategy & Hierarchy

Always select locators in the following strict priority order:

1. `page.getByRole(...)` — Accessibility role + accessible name (e.g. `getByRole('button', { name: 'Submit' })`)
2. `page.getByLabel(...)` — Form controls with associated `<label>`
3. `page.getByPlaceholder(...)` — Form inputs with placeholder text
4. `page.getByText(...)` — Non-interactive text containers with exact/regex text
5. `page.getByTitle(...)` — Elements with `title` attributes
6. `page.getByTestId(...)` — Elements with explicit `data-testid`
7. **Stable CSS selector** — Unique IDs (`#main-content`) or structural data attributes
8. **XPath** — **Last resort only** when no semantic locator or attribute exists

### Locator Anti-Patterns (Prohibited)

- ❌ Positional selectors: `.nth(0)`, `:nth-child(3)`, `.first()`, `.last()`
- ❌ Dynamic/generated CSS classes: `.css-1a2b3c`, `div.elementor-element-7a89b`
- ❌ Deeply nested CSS paths: `div > div > ul > li > a`
- ❌ Generic tag locators without scope: `page.locator('button')`
- ❌ Selector duplication across multiple Page Objects

---

## 5. Assertions & Synchronization Rules

### Web-First Assertions (Mandatory)

Playwright web-first assertions automatically wait and retry until conditions are met:

- ✅ `await expect(locator).toBeVisible();`
- ✅ `await expect(locator).toHaveText('Welcome');`
- ✅ `await expect(page).toHaveURL(/admissions/);`
- ✅ `await expect(locator).toHaveCount(4);`

### Assertion Anti-Patterns (Prohibited)

- ❌ Manual boolean checks: `expect(await locator.isVisible()).toBe(true);`
- ❌ String evaluation sync: `expect(await locator.innerText()).toContain('Text');`
- ❌ Catch-all verification methods: `await pageObject.verifyEverythingOnPage();`

### Synchronization Standards

- **Use Playwright Auto-Waiting**: Actions (`click()`, `fill()`) automatically wait for element visibility, enablement, and stability.
- **Explicit Synchronization**: Use `await expect(locator).toBeVisible()`, `await page.waitForURL(...)`, or `await page.waitForResponse(...)`.
- **Prohibition of Sleep/Timeout**: Never use `page.waitForTimeout(5000)` or `setTimeout()`. If a test is flaky, diagnose the root cause (network latency, DOM animation, locator instability) and fix the wait target.

---

## 6. Static vs. Dynamic Test Data Rules

```
Data Element Decision
  ├─ Intentionally controlled static expected text? → Typed JSON in test-data/ + TypeScript contract
  ├─ Value changes at runtime (date, year, session ID, cart count)? → Derive dynamically at runtime
  └─ Sourced from API, CMS, or Database? → Fetch directly from source or API fixture
```

### Key Data Guidelines

1. **Static Expected Content**: Site titles, navigation label arrays, section headers, static form inputs belong in `test-data/<feature>/<file>.json`.
2. **Dynamic Values**: Current copyright year (`new Date().getFullYear()`), generated timestamps, or dynamic counts must **never** be hardcoded into static JSON.
3. **No Self-Validating UI Echo**: Never read text from UI and assert it against itself (`const val = await loc.textContent(); expect(loc).toHaveText(val);`).
4. **Secrets & Security**: Never commit passwords, tokens, or credentials to `test-data/` or source code. Use environment variables (`process.env.SECRET`).

---

## 7. Tooling, Config & Quality Rules

### TypeScript Standards

- Strict mode is mandatory (`"strict": true` in `tsconfig.json`).
- Zero tolerance for `any` type. Use explicit interfaces, generics, or `unknown` with type guards.
- Use explicit return types for all public class methods (`async navigate(): Promise<void>`).

### Configuration & Tooling

- **Centralized Config**: `playwright.config.ts` owns base URL, browser matrix, viewports, retries, and reporting. Do not hardcode URLs or viewport sizes inside individual tests unless testing a scenario-specific breakpoint.
- **Code Quality Tools**: Code must pass ESLint (`npm run lint`), Prettier (`npm run format`), and TypeScript type checks (`npx tsc --noEmit`).
- **Husky & Git Hooks**: Never bypass pre-commit hooks or force-push broken linting states.
