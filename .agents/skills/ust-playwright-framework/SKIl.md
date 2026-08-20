---
name: ust-playwright-framework
description: Mandatory engineering standard for the United School of Tokyo (UST) Playwright automation framework — a TypeScript/Playwright Hybrid Page Object Model testing a ~33-page WordPress site. Use this skill for ANY change to this framework — writing or reviewing tests, Page Objects, Components, fixtures, test data, utilities, locators, or config. Trigger it whenever the user mentions Playwright tests, Page Objects, WordPress page automation, test-data JSON, or files under school_webtesting/. Always consult before creating new files or abstractions in this repo.
---

# UST Playwright Framework Skill

Mandatory standard for the UST enterprise Playwright framework. App under test:
a ~33-page WordPress site. Priorities: maintainability, scalability, reuse,
type safety, deterministic execution, stable locators.

**Stack:** TypeScript (strict) + Playwright Test, Hybrid POM with reusable
Component objects, custom fixtures, typed JSON test data, ESLint + Prettier

- Husky/lint-staged. Do not introduce another E2E framework (Selenium,
  Cypress, Puppeteer, WebdriverIO) unless explicitly required.

## 0. Before touching the framework

1. Inspect the existing repo first: `pages/`, `pages/components/`, `fixtures/`,
   `test-data/`, `utils/`, `tests/`, `package.json`, configs. **Reuse before
   create** — see `references/architecture.md` §Reuse Before Create.
2. Preserve existing structure/conventions. Do not reorganize the framework
   or rewrite unrelated files unless explicitly required.
3. For anything beyond a one-line fix, skim the relevant reference file
   below before writing code.

## 1. Baseline repo structure

```
school_webtesting/
├── fixtures/test-fixtures.ts   # Injects Page Objects into tests
├── pages/HomePage.ts, [OtherPages].ts
│   └── components/Header.ts, NavigationMenu.ts, HeroSlider.ts,
│                   HelpfulLinks.ts, SocialLinks.ts, Footer.ts
├── test-data/*.json
├── tests/<feature>/
├── utils/constants.ts, helpers.ts, test-data.ts
├── api/ (only if API testing is needed)
├── eslint.config.ts, playwright.config.ts, tsconfig.json, package.json
```

Full target architecture, growth pattern for `test-data/`, and file-by-file
responsibilities → `references/architecture.md`.

## 2. Core decision rules (memorize these)

```
UI Locator / UI Action?        → Page Object / Component
Business Scenario/Assertion?   → Test
Reusable or shared WordPress UI?→ Component (reuse existing: Header,
                                   NavigationMenu, HeroSlider, HelpfulLinks,
                                   SocialLinks, Footer — before creating new)
New WordPress page?            → Determine unique vs template-based.
                                   One URL ≠ one Page Object.
Controlled expected value?     → Typed test data (JSON + TS contract)
Runtime-generated value        → Generate/derive at runtime, never hardcode
  (date, year, ID, price)?
API/CMS/DB-sourced value?      → Retrieve from authoritative source,
                                   never "read UI value, assert same value"
Secret / credential?           → Env var or secret manager — never a file
Generic reusable logic?        → utils/ (must stay generic, not page-specific)
Theoretical future reuse only? → Do NOT create the abstraction
```

**Test vs Page Object (mandatory):** Tests describe WHAT the user does;
Page Objects/Components describe HOW the page does it. Tests must not
contain raw `page.getByRole/getByLabel/locator(...)` etc. when that
behavior belongs to a Page Object/Component. Test-specific, one-off
state (`setViewportSize`, `waitForURL` for a scenario, `reload()`) may
stay in the test. Full rules + allowed/prohibited examples →
`references/architecture.md` and `references/locators-assertions-sync.md`.

**Page Object size:** one Page Object = one meaningful page/experience.
If it grows large from repeated UI sections, extract a Component. No
"God Objects", no deep inheritance for simple locator sharing.

## 3. Locators, assertions, waits (quick reference)

Locator priority: `getByRole` > `getByLabel` > `getByPlaceholder` >
`getByText` > `getByTitle` > `getByTestId` > stable CSS > XPath (last resort).
Avoid `.first()/.last()/.nth()` and positional/CSS-class selectors.

Use Playwright web-first assertions (`await expect(locator).toBeVisible()`),
never `expect(await locator.isVisible()).toBe(true)`. Business assertions
belong in tests; Page Objects/Components may expose reusable
verification methods but not `verifyEverything()`-style catch-alls.

Never use `page.waitForTimeout()` / `setTimeout()` to mask timing issues —
fix the root cause. Full detail → `references/locators-assertions-sync.md`.

## 4. Test data & hardcoding

Decision: is the value **intentionally controlled** by the test → typed
JSON/test data. Is it **generated at runtime** (year, date, ID, price,
cart count) → derive at runtime, never hardcode/pre-bake into JSON. Does
it come from **API/CMS/DB** → fetch from that authoritative source, don't
just echo the current UI value back as the expected value. Moving a
hardcoded value into JSON does not by itself make it correct. No secrets
in test-data files. Full rules + examples → `references/test-data-rules.md`.

## 5. Config, tooling, quality gate

TypeScript strict mode is mandatory; avoid `any`. Follow existing
ESLint/Prettier/Husky/lint-staged setup — don't disable rules or bypass
hooks. Keep Playwright config centralized in `playwright.config.ts` (base
URL, projects/devices, retries, timeouts, tracing) — don't duplicate it in
tests. Details → `references/tooling-and-config.md`.

Before calling any change done, confirm the **Quality Gate** in
`references/quality-and-refactoring.md` (architecture, reuse, locator
stability, assertion ownership, no arbitrary waits, independent tests,
typed data, lint/format/type-check/tests passing).

## 6. Debugging & refactoring

Root-cause order for failures/flakiness (locator → page state → URL →
sync → app behavior → test data → fixture → auth → browser-specific) and
refactor guardrails (preserve behavior, reduce duplication, no large
architectural refactors inside an unrelated fix) →
`references/quality-and-refactoring.md`.

## Golden rule

Business-readable tests + correct Test/Page Object separation + reusable
WordPress Components + template-aware Page Objects + typed fixtures/data +
correct static-vs-dynamic data handling + stable semantic locators +
single locator ownership + web-first assertions + automatic sync +
independent tests + strict TypeScript + reuse-before-create + automated
quality gates = reliable enterprise-grade Playwright automation.
