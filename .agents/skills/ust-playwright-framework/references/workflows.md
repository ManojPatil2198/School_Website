# UST Playwright Framework Task Workflows

This document defines explicit, step-by-step workflows for executing the 6 primary AI engineering tasks within the framework.

---

## Workflow 1: `create-test`

**Trigger Prompt Examples**: `"Create TC_NAV_005"`, `"Add test for Footer links"`, `"Write test for Hero slider navigation"`

### Execution Steps

1. **Analyze Requirements & Inspect Existing Assets**:
    - Identify target feature directory in `tests/<feature>/`.
    - Check if relevant Page Object exists in `pages/` or reusable Component exists in `pages/components/`.
    - Check `fixtures/test-fixtures.ts` to verify fixture availability.
    - Check `test-data/` for existing typed test data.
2. **Setup Test Data**:
    - If static test data is required, update/create typed JSON in `test-data/<feature>/`.
    - Ensure contract interface is exported in `utils/test-data.ts` or local feature type file.
3. **Write Test Spec File**:
    - File path: `tests/<feature>/<TC_ID_NAME>.spec.ts`.
    - Import `test` and `expect` from `fixtures/test-fixtures.ts`.
    - Define business-readable scenario description in `test('...')`.
    - Use custom fixtures (e.g. `{ homePage }`) instead of raw `page`.
4. **Implement Business Actions & Assertions**:
    - Execute user actions via Page Object methods (`await homePage.navigateToAdmissions()`).
    - Execute assertions using Playwright web-first assertions (`await expect(homePage.heading).toBeVisible()`).
    - Keep zero raw locators (`getByRole`, `locator`) inside the test spec.
5. **Verify & Validate**:
    - Run type check: `npx tsc --noEmit`.
    - Run linting: `npm run lint`.
    - Run test: `npx playwright test tests/<feature>/<TC_ID_NAME>.spec.ts`.

---

## Workflow 2: `create-page-object`

**Trigger Prompt Examples**: `"Add Admissions Page Object"`, `"Create SchoolLife page"`, `"Add Page Object for Contact Us"`

### Execution Steps

1. **Evaluate WordPress Page & Template Reusability**:
    - Determine target URL and DOM structure.
    - Assess if page uses an existing WordPress template or shares layout with an existing Page Object.
    - If identical layout, reuse/extend existing Page Object.
2. **Identify Reusable Components**:
    - Identify composed components (e.g. `Header`, `NavigationMenu`, `Footer`, `HeroSlider`).
    - Do NOT redeclare locators owned by these components inside the new Page Object.
3. **Create Page Object File**:
    - File path: `pages/<PageName>Page.ts`.
    - Structure class with `readonly page: Page` and instantiated component properties.
    - Define page-specific locators using semantic hierarchy (`getByRole`, `getByLabel`).
    - Expose strongly-typed action methods (`async selectProgram(name: string): Promise<void>`).
4. **Register in Test Fixtures**:
    - Update `fixtures/test-fixtures.ts` to add the new Page Object to the test context fixture type and implementation.
5. **Verify & Validate**:
    - Check type compliance: `npx tsc --noEmit`.
    - Format file: `npm run format`.

---

## Workflow 3: `create-component`

**Trigger Prompt Examples**: `"Add Sidebar component"`, `"Create Modal dialog component"`, `"Add CardGrid component"`

### Execution Steps

1. **Verify UI Reusability & Single Ownership**:
    - Confirm the target UI element appears across multiple pages or represents a self-contained reusable block.
    - Ensure component locators do not duplicate existing components in `pages/components/`.
2. **Create Component File**:
    - File path: `pages/components/<ComponentName>.ts`.
    - Class structure: accept `readonly page: Page` (or root `Locator`) in constructor.
    - Define child locators relative to component root or page semantic roles.
    - Define component-level action methods (`async search(query: string): Promise<void>`).
3. **Compose Component in Page Objects**:
    - Instantiate component in relevant Page Objects (`this.sidebar = new Sidebar(page)`).
    - Expose component getter or delegate component methods where appropriate.
4. **Verify & Validate**:
    - Run linting and type checking (`npx tsc --noEmit && npm run lint`).

---

## Workflow 4: `refactor`

**Trigger Prompt Examples**: `"Refactor Header locators"`, `"Consolidate duplicated footer checks"`, `"Clean up test data"`

### Execution Steps

1. **Audit Target Asset**:
    - Locate hardcoded values, duplicated locators, or anti-patterns in target file.
    - Identify single logical owner for locators or data.
2. **Execute Targeted Refactoring**:
    - Move raw test locators into Page Objects/Components.
    - Extract repeated UI sections into reusable Components.
    - Replace brittle selectors (`div > button`) with semantic locators (`getByRole`).
    - Move static hardcoded strings into typed `test-data/` JSON.
3. **Preserve External Behavior**:
    - Do not alter public method signatures unless necessary.
    - Do not modify unrelated test scenarios or config files.
4. **Verify Regression Safety**:
    - Run impacted test suite (`npx playwright test tests/...`).
    - Run linting and formatting (`npm run lint && npm run format`).

---

## Workflow 5: `debug-failure`

**Trigger Prompt Examples**: `"Debug this failed test"`, `"Fix flaky TC_HERO_004"`, `"Investigate timeout on Admissions page"`

### Execution Steps

1. **Inspect Log & Error Trace First (Do Not Guess)**:
    - Read full stack trace, error logs, and Playwright failure report.
    - Identify exact failure line, expected vs actual values, and timeout location.
2. **Diagnose Root Cause Order**:
    -   1. _Locator failure_: Element detached, hidden, or selector changed?
    -   2. _Page state / sync_: Page navigation incomplete or animation blocking click?
    -   3. _Data mismatch_: Dynamic value hardcoded or environment mismatch?
    -   4. _Test isolation_: Shared state mutation from previous test execution?
3. **Apply Targeted Root Cause Fix**:
    - Stable locator update in Page Object / Component.
    - Add web-first assertion sync (`await expect(locator).toBeVisible()`).
    - Fix dynamic data expectation (e.g. current year calculation).
    - Never solve flakiness by inserting `page.waitForTimeout()` or increasing global timeouts.
4. **Verify Fix**:
    - Execute the failing spec file repeatedly to ensure stability.

---

## Workflow 6: `review-framework`

**Trigger Prompt Examples**: `"Review this Page Object"`, `"Audit framework quality"`, `"Review TC_FTR_006 spec"`

### Execution Steps

1. **Execute Pre-flight Lint & Type Check**:
    - Run `npx tsc --noEmit` and `npm run lint`.
2. **Perform Quality Gate Audit**:
    - Check strict layer separation (Test vs POM vs Component).
    - Audit locator priority hierarchy (`getByRole` > `getByLabel` ...).
    - Check assertion ownership (web-first assertions in tests).
    - Confirm zero arbitrary waits (`waitForTimeout`).
    - Confirm proper static vs dynamic test data handling.
    - Confirm zero committed secrets or `any` types.
3. **Report Audit Results**:
    - Summarize findings, highlighted line numbers, compliance score, and exact recommended changes.
