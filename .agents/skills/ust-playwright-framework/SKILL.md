---
name: ust-playwright-framework
description: Mandatory engineering standard for the United School of Tokyo (UST) Playwright automation framework — a TypeScript/Playwright Hybrid Page Object Model testing a ~33-page WordPress site. Use this skill for ANY request touching this framework — writing or reviewing tests, Page Objects, Components, fixtures, test data, utilities, locators, cross-browser/mobile config, debugging, or refactoring. Trigger it automatically whenever the user asks short implementation requests (e.g. "Create TC_NAV_005", "Add Sidebar component", "Fix Header locators", "Add mobile support", "Debug this failed test", "Review this Page Object") or mentions Playwright tests, Page Objects, WordPress page automation, test-data JSON, or files under school_webtesting/.
---

# UST Playwright Framework Skill

Mandatory standard for the UST enterprise Playwright framework (TypeScript + Playwright Test, Hybrid POM with reusable Components, custom fixtures, typed JSON test data, ESLint + Prettier + Husky).

---

## 1. Authority & Precedence Hierarchy

When conflicting instructions arise during task execution, resolve them strictly in this order:

1. **Explicit User Prompt Constraints** (Highest Priority)
2. **`SKILL.md`** (This Main Orchestration & Routing Document)
3. **`references/architecture-and-rules.md`** (Core Architecture, Locator Hierarchy, Assertion, Sync, Test-Data & Config Rules)
4. **`references/workflows.md`** (Step-by-step Execution Workflows)
5. **`references/templates-and-examples.md`** (TypeScript Templates & Code Examples)
6. Existing project code patterns in `pages/`, `tests/`, `fixtures/`, `utils/` (Lowest Priority)

---

## 2. Task Classification & Reference-Routing Matrix

When a short or underspecified prompt is received, classify the intent into one of the 6 core task types below and follow its specified workflow, references, and templates:

| User Prompt Example                                                            | Classified Task Type | Primary Workflow (`workflows.md`) | Primary References & Templates                                                         |
| :----------------------------------------------------------------------------- | :------------------- | :-------------------------------- | :------------------------------------------------------------------------------------- |
| `"Create TC_NAV_005"`, `"Add test for Footer links"`                           | `create-test`        | Workflow 1: `create-test`         | `architecture-and-rules.md` §2 & §5<br>`templates-and-examples.md` §1 (Template 3 & 4) |
| `"Create Page Object for Admissions"`, `"Add SchoolLife page"`                 | `create-page-object` | Workflow 2: `create-page-object`  | `architecture-and-rules.md` §2 & §3<br>`templates-and-examples.md` §1 (Template 1)     |
| `"Add Sidebar component"`, `"Create Modal dialog component"`                   | `create-component`   | Workflow 3: `create-component`    | `architecture-and-rules.md` §3<br>`templates-and-examples.md` §1 (Template 2)          |
| `"Fix Header locators"`, `"Consolidate footer checks"`, `"Add mobile support"` | `refactor`           | Workflow 4: `refactor`            | `architecture-and-rules.md` §4 & §7<br>`templates-and-examples.md` §2 (Examples 1 & 2) |
| `"Debug this failed test"`, `"Fix flaky TC_HERO_004"`                          | `debug-failure`      | Workflow 5: `debug-failure`       | `architecture-and-rules.md` §5 & §6<br>`templates-and-examples.md` §2 (Example 3)      |
| `"Review this Page Object"`, `"Audit framework quality"`                       | `review-framework`   | Workflow 6: `review-framework`    | `architecture-and-rules.md` All Sections<br>`templates-and-examples.md` All Templates  |

---

## 3. Universal AI Engineering Principles

### Rule 1: Reuse Before Create

Before creating any new file, class, method, fixture, utility, constant, or test-data entry, inspect existing assets:

```
Target Asset Needed
  ├─ Already exists? → REUSE IT
  ├─ Can be extended without breaking current behavior? → EXTEND IT
  ├─ Can be composed? → COMPOSE IT
  └─ Otherwise → CREATE NEW (following strict naming and placement standards)
```

_Never create duplicate abstractions such as `LoginPage2`, `BasePageNew`, `CommonUtils2`, `HomeHeader`, or `AboutHeader`._

### Rule 2: Do Not Guess

- Never guess element locators, attribute names, CSS classes, or page paths.
- Never guess the cause of a test failure or flakiness without inspecting the full execution log, stack trace, or DOM element tree.

### Rule 3: Minimal Change Principle

- Modify only the exact files necessary to fulfill the request.
- Do not perform unsolicited formatting, structural reorganization, or cosmetic refactoring on unrelated files.

### Rule 4: No Unnecessary Abstractions

- Do not introduce `BasePage`, `AbstractPage`, `UIHelper`, `GenericComponent`, or generic wrapper methods unless there is a concrete, explicit requirement. Keep code simple, readable, and direct.

---

## 4. Architectural Baseline & Rules Summary

### Layer Responsibilities

- **Tests** (`tests/`): Describe WHAT the business scenario does. Contain business-level assertions. Zero raw locators or direct UI manipulation.
- **Page Objects** (`pages/`): Describe HOW page interactions work. Contain page-specific locators, workflows, and component composition.
- **Components** (`pages/components/`): Encapsulate reusable UI (e.g. `Header`, `NavigationMenu`, `HeroSlider`, `HelpfulLinks`, `SocialLinks`, `Footer`).
- **Fixtures** (`fixtures/`): Inject Page Objects and context into tests.
- **Utilities** (`utils/`): Pure generic helpers, constants (`constants.ts`), and typed test data loaders (`test-data.ts`).

### WordPress Page & Component Rules

- **One URL ≠ One Page Object**: Pages sharing identical WordPress templates (`/about`, `/learning`, `/school-life`) share Page Objects.
- **Single Component Ownership**: Each UI element has exactly one logical owner (e.g. Logo lives in `Header.ts`).

### Locator Hierarchy

Priority: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `getByTitle` > `getByTestId` > Stable CSS > XPath (last resort).
_Prohibited_: `.first()`, `.last()`, `.nth()`, positional selectors (`:nth-child`), dynamic CSS classes.

### Web-First Assertions & Synchronization

- Always use web-first assertions (`await expect(locator).toBeVisible()`). Never use boolean checks (`expect(await locator.isVisible()).toBe(true)`).
- **Zero Arbitrary Waits**: `page.waitForTimeout()` is strictly prohibited. Fix underlying synchronization root causes.

### Static vs. Dynamic Test Data

- Static expected content → typed JSON in `test-data/` with TypeScript interface contracts.
- Dynamic runtime values (current year/date, generated IDs, cart count) → derive/calculate dynamically at runtime.
- API/CMS data → fetch directly from source or API fixture.

---

## 5. Agent Self-Review Quality Gate (Mandatory Before Completion)

Before declaring any work complete, run through this mandatory self-review audit:

- [ ] **Architecture Check**: Is code placed in the correct layer (Test vs POM vs Component vs Fixture)?
- [ ] **Reuse Verification**: Are existing components (`Header`, `Footer`, etc.) reused without duplication?
- [ ] **Locator Hierarchy**: Are locators semantic (`getByRole`, `getByLabel`) without brittle positional CSS or `.nth()`?
- [ ] **Assertion Ownership**: Are assertions web-first (`await expect(...)`) and placed in the test spec?
- [ ] **Synchronization**: Are there zero `waitForTimeout()` calls or arbitrary sleeps introduced?
- [ ] **Test Data Hygiene**: Is static data typed in JSON? Are dynamic values generated at runtime?
- [ ] **Type Safety & Security**: Is TypeScript running without `any` types? Are there zero committed secrets?
- [ ] **Minimal Changes**: Are changes restricted strictly to requested files without unintended side effects?
- [ ] **Validation Commands**: Have linting (`npm run lint`), formatting (`npm run format`), type checks (`npx tsc --noEmit`), and Playwright tests been verified?
