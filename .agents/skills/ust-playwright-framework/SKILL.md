---
name: ust-playwright-framework
description: Production-grade TypeScript and Playwright automation skill for the United School of Tokyo E2E framework. Use whenever creating, modifying, reviewing, refactoring, or debugging Playwright tests, Page Objects, reusable components, fixtures, locators, test data, utilities, or framework configuration.
---

# United School of Tokyo Playwright Framework Skill

## 1. Purpose

This skill defines the mandatory standards for the United School of Tokyo
enterprise Playwright automation framework.

The application under test is a WordPress-based website with approximately
33 pages. The framework MUST therefore prioritize:

- Maintainability
- Scalability
- Reusability
- Type safety
- Reliability
- Deterministic execution
- Stable locators
- Reusable WordPress UI components
- WordPress template reuse
- Easy debugging
- Easy code review

The agent MUST follow this skill for all framework-related changes.

The agent MUST preserve existing project architecture and conventions unless
a change is explicitly required.

---

## 2. Technology Stack

| Category          | Standard                      |
| ----------------- | ----------------------------- |
| Language          | TypeScript                    |
| Automation        | Playwright                    |
| Test Runner       | Playwright Test               |
| Architecture      | Hybrid Page Object Model      |
| Components        | Reusable UI Component Objects |
| Fixtures          | Custom Playwright Fixtures    |
| Test Data         | JSON / Typed TypeScript Data  |
| Linting           | ESLint                        |
| Formatting        | Prettier                      |
| Git Hooks         | Husky                         |
| Staged Checks     | lint-staged                   |
| Runtime TS Loader | Jiti where required           |
| Application       | WordPress Website             |

Do not introduce Selenium, Cypress, Puppeteer, WebdriverIO, or another E2E
framework unless explicitly required by the project.

---

## 3. Existing Framework Structure

The current framework structure is:

```text
school_webtesting/
├── .agents/               # Skill definitions and agent configuration
├── .husky/                # Git pre-commit hooks for quality checks
├── fixtures/              # Custom Playwright fixtures & dependency injection
│   └── test-fixtures.ts   # Fixture setup injecting Page Objects
├── pages/                 # Page Object Model abstraction layer
│   ├── HomePage.ts        # Main application home page Page Object
│   └── components/        # Reusable UI Component Objects
│       ├── Header.ts
│       ├── NavigationMenu.ts
│       ├── HeroSlider.ts
│       ├── HelpfulLinks.ts
│       ├── SocialLinks.ts
│       └── Footer.ts
├── test-data/             # Centralized test data
│   └── homepage-data.json
├── tests/                 # Categorized Playwright test suites
├── utils/                 # Generic helpers and shared test-data utilities
│   ├── constants.ts
│   ├── helpers.ts
│   └── test-data.ts
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── eslint.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

The agent MUST use this structure as the baseline.

The agent MUST inspect the existing repository before creating new files,
folders, Page Objects, Components, Fixtures, Utilities, or test-data files.

The agent MUST NOT reorganize the entire framework unless explicitly
required.

---

## 4. Architecture

The framework follows a Hybrid Page Object Model with reusable Component
Objects.

```text
Test
  ↓
Fixture
  ↓
Page Object
  ↓
Reusable Component
  ↓
Locator
```

Supporting layers:

```text
Utilities
Constants
Test Data
Type Definitions
API Clients
Configuration
```

### Responsibilities

**Tests**

- Describe business behavior.
- Contain business-level assertions.
- Use fixtures and Page Objects.
- Must not contain UI implementation details.

**Page Objects**

- Represent meaningful pages or page-level experiences.
- Own page-specific locators.
- Own page actions and workflows.
- Encapsulate page implementation.
- Compose reusable Components.
- May expose reusable page-state assertions.

**Components**

- Encapsulate reusable UI such as Header, Footer, Navigation, Hero Slider,
  Helpful Links, Social Links, Modal, Forms, Tables, Pagination, and CTA
  sections.
- Must be used when the same UI behavior appears across multiple pages.

**Fixtures**

- Provide Page Objects, Components, authentication state, test data, API
  clients, or other reusable dependencies.
- Must be typed and have a clear responsibility.

**Utilities**

- Must remain generic.
- Must not contain page-specific behavior.
- Must not become a second Page Object layer.

---

## 5. Test vs Page Object Rule

This is a mandatory architectural rule:

> Tests describe WHAT the user does. Page Objects describe HOW the page does it.

### Preferred

```typescript
test('user can navigate to admissions', async ({ homePage }) => {
    await homePage.navigateToAdmissions();

    await expect(homePage.pageHeading).toHaveText('Admissions');
});
```

### Prohibited

```typescript
test('user can navigate to admissions', async ({ page }) => {
    await page.getByRole('link', { name: 'Admissions' }).click();

    await expect(page.getByRole('heading', { name: 'Admissions' })).toBeVisible();
});
```

Tests MUST NOT directly define or manipulate UI locators when the behavior
belongs in a Page Object or Component.

Tests MUST remain readable at a business level.

### 5.1 Test Responsibilities

Tests SHOULD look like:

```typescript
test('TC_NAV_001 - Verify main navigation menu items are visible', async ({ homePage }) => {
    await homePage.navigate();

    await expect(homePage.navigationMenu.menuItems).toHaveCount(6);
});
```

Tests SHOULD NOT look like:

```typescript
test('TC_NAV_001', async ({ page }) => {
    await page.goto('/');

    const menuItems = ['About UST', 'Learning', 'School Life', 'Admissions'];

    for (const item of menuItems) {
        await page.getByRole('link', { name: item }).isVisible();
    }
});
```

Business-readable test flow is preferred:

```text
Arrange
  ↓
Act through Page Object / Component
  ↓
Assert business behavior
```

### 5.2 Page-Level Playwright APIs

Not every page.* API is a POM violation.

Tests MUST NOT directly define or manipulate UI locators when the behavior
belongs in a Page Object or Component.

However, page-level operations MAY remain in tests when they are specific to
the test scenario.

#### Allowed Page-Level Operations

Examples:

```typescript
await page.setViewportSize({
    width: 390,
    height: 844,
});

await page.waitForLoadState('domcontentloaded');

await page.waitForURL(/home/);

await page.reload();
```

These operations are allowed when they represent legitimate test-specific
scenario state.

#### UI Locators Must Belong to Page Objects or Components

The following MUST normally be encapsulated:

```text
page.getByRole(...)
page.getByLabel(...)
page.getByPlaceholder(...)
page.getByText(...)
page.getByTitle(...)
page.getByTestId(...)
page.locator(...)
```

UI interactions such as:

```typescript
await page.click(...)
await page.fill(...)
await page.check(...)
await page.selectOption(...)
await page.hover(...)
await page.press(...)
```

MUST be implemented inside the appropriate Page Object or Component when
they represent application UI behavior.

#### Navigation

Navigation SHOULD normally be encapsulated by the relevant Page Object:

```typescript
await homePage.navigate();
```

rather than:

```typescript
await page.goto('/');
```

#### Synchronization

If synchronization is always required as part of a Page Object operation,
it SHOULD be encapsulated in the Page Object.

Example:

```typescript
async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
}
```

Then:

```typescript
await homePage.navigate();
```

However, test-specific synchronization MAY remain in the test when it is
actually part of the scenario.

The agent MUST NOT treat every page.* API as a POM violation.

---

## 6. Page Object Rules

A Page Object should represent one meaningful page or page-level experience
and its behavior.

Page Objects MAY contain:

- Locators
- Page actions
- Page workflows
- Navigation
- Page-specific synchronization
- Reusable page-state assertions
- Composition of reusable Components

Page Objects MUST NOT become containers for unrelated business workflows,
global utilities, or duplicated Component logic.

Prefer meaningful methods:

```typescript
await loginPage.login(email, password);
await homePage.searchForProduct('iMac');
await productPage.addToCart();
```

over exposing every low-level interaction to the test.

### Page Object Size Rule

A Page Object MUST NOT become a "God Object".

If a Page Object becomes large because of reusable UI sections, extract those
sections into Components.

Example:

```text
HomePage
├── Header
├── NavigationMenu
├── HeroSlider
├── HelpfulLinks
├── SocialLinks
└── Footer
```

Prefer composition over deep inheritance.

Do not create inheritance hierarchies merely to share simple locators.

---

## 7. WordPress Page and Template Rules

The application is a WordPress website with approximately 33 pages.

The agent MUST distinguish between:

1. Unique WordPress pages.
2. Shared WordPress templates.
3. Reusable Components.
4. Page-specific behavior.

Before creating a new Page Object, the agent MUST determine whether the target
page:

1. Has a unique layout.
2. Has unique behavior.
3. Uses an existing WordPress template.
4. Shares behavior with an existing Page Object.
5. Uses existing reusable Components.

Different URLs MUST NOT automatically be treated as sufficient reason to
create duplicate Page Objects.

### Example

If multiple pages use the same WordPress template:

```text
/about
/learning
/school-life
```

do NOT automatically create:

```text
AboutPage.ts
LearningPage.ts
SchoolLifePage.ts
```

if they have the same structure and behavior.

Instead, prefer a reusable Page Object or template-level abstraction where
appropriate.

Create separate Page Objects when pages have materially different behavior,
layout, or workflows.

### Important Rule

> One URL does not necessarily equal one Page Object.

The agent MUST design Page Objects around behavior and structure, not simply
URL count.

---

## 8. WordPress Component Rules

Common WordPress UI MUST be implemented once and reused wherever practical.

Examples:

```text
Header
Footer
NavigationMenu
Breadcrumb
HeroSection
HeroSlider
CTASection
CardGrid
ContactForm
Accordion
ImageGallery
SearchBox
Pagination
Modal
```

The current project already has:

```text
pages/components/
├── Header.ts
├── NavigationMenu.ts
├── HeroSlider.ts
├── HelpfulLinks.ts
├── SocialLinks.ts
└── Footer.ts
```

The agent MUST reuse these Components before creating duplicate implementations.

Do NOT create:

```text
HomeHeader
AboutHeader
AdmissionsHeader
```

when they represent the same UI behavior.

Instead, reuse:

```text
Header
```

Create specialized Components only when the underlying behavior is materially
different.

---

## 9. Component Ownership

Each reusable UI behavior SHOULD have one logical owner.

For example:

```text
Header
  └── Logo locator
```

should NOT be duplicated in:

```text
HomePage
AboutPage
AdmissionsPage
LearningPage
```

Similarly:

```text
Footer
NavigationMenu
HeroSlider
HelpfulLinks
SocialLinks
```

should own their own UI implementation.

Page Objects SHOULD compose Components rather than duplicate their locators.

---

## 10. Locator Strategy

Use this priority order:

```text
1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByText()
5. getByTitle()
6. getByTestId()
7. Stable CSS selector
8. XPath as a last resort
```

### Preferred

```typescript
page.getByRole('button', { name: 'Login' });
page.getByLabel('Email');
page.getByRole('link', { name: 'Shopping Cart' });
page.getByTestId('product-card');
```

### Avoid

```typescript
page.locator('div:nth-child(3)');
page.locator('.css-1a2b3c');
page.locator('div > div > button');
page.locator('//div[3]/button');
```

Avoid unnecessary:

```typescript
.first()
.last()
.nth()
```

Prefer unique, semantic locators.

XPath is allowed only when no reliable semantic or stable attribute-based
locator is available.

### Locator Rules

Locators MUST:

- Be stable.
- Be readable.
- Prefer user-facing semantics.
- Avoid implementation-specific CSS classes.
- Avoid positional selectors where possible.
- Avoid unnecessary chaining.
- Avoid duplication across Page Objects.

If a locator is shared UI, it belongs in the appropriate Component.

---

## 11. Assertions

Use Playwright web-first assertions.

Preferred:

```typescript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('Success');
await expect(page).toHaveURL(/dashboard/);
await expect(locator).toHaveCount(5);
```

Avoid:

```typescript
expect(await locator.isVisible()).toBe(true);
```

Assertions MUST verify meaningful business behavior.

Do not add unnecessary assertions just to increase assertion count.

---

## 12. Assertion Ownership

Business acceptance criteria SHOULD normally be asserted in Tests.

Preferred:

```typescript
test('footer is displayed', async ({ homePage }) => {
    await homePage.navigate();

    await expect(homePage.footer.container).toBeVisible();
});
```

Page Objects and Components MAY expose:

- Locators.
- UI state.
- Implementation-specific state checks.
- Reusable verification methods.

Avoid hiding multiple business assertions inside:

```typescript
await homePage.verifyEverything();
```

Page Object assertions are acceptable when they are tightly coupled to
implementation behavior and genuinely reusable.

---

## 13. Wait and Synchronization Rules

Playwright's automatic waiting MUST be preferred.

### Prohibited as Normal Synchronization

```typescript
await page.waitForTimeout(5000);
setTimeout(...);
```

Do not use arbitrary sleeps to hide timing problems.

Prefer:

```typescript
await expect(locator).toBeVisible();
await page.waitForURL(/dashboard/);
await page.waitForResponse(...);
```

If `waitForTimeout()` is genuinely unavoidable, document the reason.

When a test is flaky, identify and fix the root cause instead of adding
delays.

Do not increase timeouts simply because a page appears slow.

---

## 14. Test Independence

Tests MUST be:

- Independent
- Deterministic
- Parallel-safe where possible
- Free from execution-order dependencies

Do not make:

```text
Test 2 depend on Test 1
Test 3 depend on Test 2
```

Avoid shared mutable:

- Users
- Orders
- Products
- Browser state
- Files
- Authentication state

when they can cause test interference.

Each test MUST establish or receive the state it requires.

---

## 15. Authentication

Use Playwright `storageState` for authenticated test scenarios where
appropriate.

Do not perform UI login before every test when authentication itself is not
the subject of the test.

Authentication tests SHOULD validate the actual login UI flow.

Authentication state MUST be isolated where required.

---

## 16. Test Data

Test data should be externalized where practical.

The current project contains:

```text
test-data/
└── homepage-data.json
```

Recommended growth structure:

```text
test-data/
├── users/
│   └── users.json
├── homepage/
│   └── homepage-data.json
├── admissions/
│   └── admissions-data.json
├── learning/
│   └── learning-data.json
├── school-life/
│   └── school-life-data.json
├── navigation/
│   └── navigation-data.json
└── environments/
    ├── dev.json
    ├── staging.json
    └── production.json
```

Do NOT create the entire structure unnecessarily.

Create test-data files based on actual test requirements.

Sensitive credentials MUST NOT be committed.

Use environment variables or approved secret-management mechanisms.

Test data MUST remain separate from Page Objects and test implementation.

Static expected business content MAY be stored in JSON.

Examples:

- Page headings
- Section titles
- Navigation labels
- Button labels
- Expected descriptions
- Controlled form values

---

## 17. Typed Test Data

All structured test data MUST have TypeScript contracts.

Example:

```typescript
interface UserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
```

Avoid:

```typescript
const data: any = response;
```

Prefer explicit types or `unknown` followed by safe type narrowing.

Use builders/factories when test data becomes:

- Complex
- Reusable
- Dynamic
- Highly variable

The existing `utils/test-data.ts` SHOULD be reused for typed test-data loading
and contracts where appropriate.

---

## 18. Static vs Dynamic Test Data

The agent MUST distinguish between static expected test data and dynamic
application-generated data.

### Static Expected Test Data

Use externalized test data when the test intentionally validates known,
controlled business content.

Example:

```json
{
    "communitySection": {
        "title": "Close-Knit, Family-Oriented Atmosphere"
    }
}
```

This is valid when the test requirement is to verify known business content.

Moving a hardcoded value from a Test into JSON does NOT automatically make it
dynamic.

### Dynamic Application Data

Values generated or determined at runtime MUST NOT be hardcoded as static
expected values when their purpose is to change dynamically.

Examples:

- Current year
- Current date
- Timestamp
- Generated IDs
- Order numbers
- Cart count
- Dynamic prices
- API-generated values
- Database-generated values
- Environment-specific values
- Dynamic availability

Example:

```typescript
const currentYear = new Date().getFullYear();

await expect(copyrightText).toContainText(`© All Rights Reserved, UST ${currentYear}`);
```

Do NOT create:

```json
{
    "copyright": "© All Rights Reserved, UST 2025"
}
```

if the application is expected to automatically display the current year.

---

## 19. API/CMS/Database-Driven Data

If the application obtains data from an API, WordPress CMS, or database, the
agent MUST determine whether the test is validating:

1. Known expected business content.
2. Correct rendering of runtime data.

For runtime data validation, obtain expected values from the appropriate
authoritative source.

Preferred architecture:

```text
API / CMS / Database
        ↓
Expected Runtime Data
        ↓
API Client / Fixture
        ↓
Page Object
        ↓
UI Assertion
```

Do NOT simply read the current value from the UI and use the same value as
the expected value.

Avoid:

```typescript
const actualText = await locator.textContent();

await expect(locator).toHaveText(actualText);
```

This does not provide meaningful validation.

---

## 20. Dynamic Data Decision

The agent MUST follow this decision:

```text
Is the value intentionally controlled by the test?
            │
           YES
            ↓
     Static Test Data
       JSON / typed data

            NO
            ↓
Is the value generated at runtime?
            │
           YES
            ↓
   Generate / derive it
       at runtime

            NO
            ↓
Does the value come from API/CMS/DB?
            │
           YES
            ↓
Retrieve expected value
from the authoritative source

            NO
            ↓
Determine the correct
environment/configuration source
```

---

## 21. Hardcoding Rules

Hardcoding MUST be evaluated based on the purpose and source of the value.

### Allowed Hardcoding

Hardcoded values MAY be used when they represent stable technical values
or intentionally controlled test data.

Examples:

```typescript
const viewport = {
    width: 390,
    height: 844,
};
```

```json
{
    "productName": "iMac"
}
```

```typescript
await expect(page).toHaveURL(/\/home/);
```

### Avoid Hardcoding

Do not hardcode values that are expected to change independently of the test.

Examples:

- Current year
- Current date
- Generated IDs
- Random values
- Environment URLs
- Dynamic API data
- Database-generated values
- Dynamic prices
- Dynamic availability

Moving a hardcoded value from a Test into JSON does NOT automatically remove
hardcoding.

The agent MUST determine whether the value should be:

1. Static test data.
2. Runtime-generated data.
3. Environment configuration.
4. API/CMS data.
5. Database/test-fixture data.

---

## 22. TypeScript Standards

Strict TypeScript is mandatory.

The framework SHOULD enable:

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "strictBindCallApply": true,
        "strictPropertyInitialization": true,
        "noImplicitThis": true,
        "useUnknownInCatchVariables": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true
    }
}
```

Rules:

- Avoid `any`.
- Prefer explicit types for public contracts.
- Use `unknown` when a value is genuinely unknown.
- Avoid unnecessary type assertions.
- Use type-only imports where appropriate.
- Do not weaken TypeScript strictness to make code compile.

---

## 23. Naming and Imports

Use:

```text
Classes       → PascalCase
Methods       → camelCase
Variables     → camelCase
Types         → PascalCase
Constants     → UPPER_SNAKE_CASE where appropriate
```

Examples:

```text
HomePage
LoginPage
searchForProduct()
login()
UserData
DEFAULT_TIMEOUT
```

Follow existing repository naming conventions if they differ consistently.

Imports MUST be:

- Clean
- Explicit
- Ordered according to project convention
- Free of unused imports

---

## 24. Utilities

The existing utilities are:

```text
utils/
├── constants.ts
├── helpers.ts
└── test-data.ts
```

Reuse these before creating additional utility files.

### `constants.ts`

May contain:

- Stable application constants.
- Application routes.
- Environment-independent constants.
- Approved timeout constants.
- Configuration flags.

Do NOT place page-specific locators or workflows here.

### `helpers.ts`

MUST contain only genuinely generic reusable logic.

Do NOT put page-specific methods in this file.

### `test-data.ts`

Should contain:

- Typed test-data contracts.
- Test-data loading.
- Generic test-data access.

Do NOT put application UI actions here.

---

## 25. Avoid Over-Engineering

The agent MUST NOT create abstractions only for theoretical future reuse.

Do not create additional classes such as:

```text
BasePage
AbstractPage
GenericPage
UIHelper
PageHelper
ComponentHelper
CommonHelper
```

unless there is a concrete architectural or reuse requirement.

The existing project does not require a BasePage simply because Page Objects
exist.

Prefer the simplest design that satisfies the framework rules.

Do not create wrappers around simple Playwright APIs unless the wrapper adds
meaningful framework behavior.

---

## 26. API Testing

When API testing is required, use Playwright's API capabilities or the
framework's established API client abstraction.

API clients MUST remain separate from UI Page Objects.

Preferred structure:

```text
API Client
   ↓
API Fixture
   ↓
Test
```

API request/response models should be typed.

When API data is used to validate UI rendering:

```text
API Client
   ↓
Typed API Response
   ↓
Test / Fixture
   ↓
Page Object
   ↓
UI Assertion
```

Do not duplicate API-generated values as static JSON when the purpose of the
test is to validate runtime API-to-UI data synchronization.

---

## 27. Error Handling

Do not silently swallow errors.

Avoid:

```typescript
try {
    await someAction();
} catch {}
```

Use `try/catch` only when the error can be handled meaningfully or enriched
with useful context.

Avoid unnecessary `console.log()` statements in committed test code.

Use Playwright traces, screenshots, videos, and reports for debugging.

---

## 28. Playwright Configuration

Keep global Playwright configuration centralized in:

`playwright.config.ts`

Configuration may include:

- Base URL
- Projects
- Browsers
- Retries
- Workers
- Timeouts
- Reporter
- Trace
- Screenshot
- Video
- Storage state
- Web server
- Device configurations

Do not duplicate global configuration inside individual tests.

Do not increase timeouts simply to hide test failures.

### Mobile and Browser Configuration

When a viewport or device configuration is common across multiple tests,
prefer Playwright projects/device configuration in `playwright.config.ts`.

Example:

```typescript
projects: [
    {
        name: 'mobile',
        use: {
            ...devices['iPhone 13'],
        },
    },
];
```

Manual viewport changes MAY be used when the exact viewport is part of a
specific test scenario.

---

## 29. ESLint and Prettier

ESLint and Prettier are mandatory quality tools.

The project currently uses:

```text
eslint.config.ts
.prettierrc.json
.prettierignore
```

The agent MUST:

- Follow existing ESLint configuration.
- Fix lint violations.
- Format changed files.
- Avoid global ESLint disables.
- Avoid disabling rules simply to make code pass.

Avoid:

```typescript
/* eslint-disable */
```

Use the smallest possible exception only when genuinely necessary.

Prettier is the formatting authority.

---

## 30. Git Hooks and Quality Checks

The project uses:

```text
.husky/
```

and:

```text
lint-staged
```

The agent MUST preserve existing Git hooks and staged quality checks.

Do not bypass hooks simply to make a change pass.

Do not remove or weaken existing pre-commit checks without explicit
requirement.

---

## 31. Quality Gate

Before considering a change complete:

```text
✓ Code follows framework architecture
✓ Tests contain business behavior only
✓ Page Objects contain UI implementation
✓ Components are reused appropriately
✓ WordPress templates are reused where appropriate
✓ Shared locators are not duplicated
✓ Locators are stable and semantic
✓ Assertions follow correct ownership
✓ No arbitrary waits
✓ Tests are independent
✓ Test data is typed
✓ Static expected content is externalized where appropriate
✓ Dynamic data is generated or retrieved correctly
✓ No unnecessary any
✓ No secrets
✓ Existing utilities are reused where appropriate
✓ Existing Components are reused where appropriate
✓ ESLint passes
✓ Prettier passes
✓ TypeScript type checking passes
✓ Relevant Playwright tests pass
```

Use the project's existing npm scripts from `package.json`.

Do not invent validation commands without checking the repository first.

---

## 32. Reuse Before Create

Before creating a new:

- Page Object
- Component
- Fixture
- Utility
- Constant
- Data type
- Helper
- API client

the agent MUST search the repository first.

Decision order:

```text
Already exists?
      ↓
Reuse it
      ↓
Can it be extended?
      ↓
Can it be composed?
      ↓
Only then create new code
```

Do not create duplicate classes such as:

```text
LoginPage2
BasePageNew
CommonUtils2
HomeHeader
AboutHeader
AdmissionsHeader
```

unless their behavior is genuinely different.

The existing Components MUST be reused when applicable:

```text
Header
NavigationMenu
HeroSlider
HelpfulLinks
SocialLinks
Footer
```

---

## 33. Agent Execution Rules

Before modifying the framework, inspect:

1. Repository structure
2. Existing tests
3. Page Objects
4. Components
5. Fixtures
6. Test data
7. Utilities
8. API clients if present
9. package.json
10. Playwright configuration
11. TypeScript configuration
12. ESLint configuration
13. Prettier configuration
14. Git hooks where relevant

The agent MUST preserve existing project conventions.

The agent MUST NOT:

- Rewrite unrelated files.
- Add unnecessary dependencies.
- Disable quality rules.
- Weaken TypeScript.
- Introduce another test framework.
- Duplicate existing framework logic.
- Add arbitrary waits.
- Put selectors directly into tests.
- Commit secrets.
- Hide failures with retries or delays.
- Create duplicate Page Objects for identical WordPress templates.
- Duplicate shared Components.
- Copy dynamic runtime values into static JSON without justification.
- Read a UI value and use that same value as its expected value.
- Create a new utility when existing framework functionality can be reused.
- Create abstractions only for theoretical future reuse.
- Create a BasePage without a concrete project requirement.

---

## 34. Debugging and Flaky Tests

When a test fails, investigate the root cause in this order:

```text
1. Error message
2. Locator
3. Page state
4. URL
5. Synchronization
6. Application behavior
7. Test data
8. Fixture state
9. Authentication
10. Browser-specific behavior
```

For flaky tests, determine whether the cause is:

- Unstable locator
- Race condition
- Missing synchronization
- Shared test data
- Authentication state
- Network dependency
- Application defect
- Incorrect dynamic-data expectation
- WordPress/CMS content change
- Browser-specific behavior

Fix the underlying issue.

Do not solve flakiness by blindly adding waits or increasing timeouts.

---

## 35. Refactoring Rules

When refactoring:

- Preserve existing behavior.
- Reduce duplication.
- Improve maintainability.
- Improve locator stability.
- Improve type safety.
- Improve Component reuse.
- Improve Page Object boundaries.
- Keep changes focused.
- Avoid unrelated changes.
- Run relevant tests afterward.

When refactoring WordPress pages:

1. Determine whether the page is unique or template-based.
2. Identify existing reusable Components.
3. Reuse existing Page Objects where appropriate.
4. Extract duplicated UI behavior into Components.
5. Do not create duplicate abstractions.
6. Preserve existing test behavior.

When refactoring hardcoded data:

1. Determine whether the value is static or dynamic.
2. If static, externalize it into appropriate typed test data.
3. If dynamic, derive or retrieve it from the correct runtime source.
4. Do not merely move the hardcoded value into JSON.

Do not perform large architectural refactors while implementing an unrelated
single test or bug fix.

---

## 36. Security

Never commit:

- Passwords
- API keys
- Access tokens
- Private keys
- Client secrets
- Session tokens

If secrets are discovered, do not copy them into new files.

Use environment variables or the project's approved secret-management method.

Test data files MUST NOT contain real credentials or secrets.

---

## 37. Final Definition of Done

A change is complete only when:

1. The correct framework layer is used.
2. Tests remain business-readable.
3. Page Objects encapsulate UI implementation.
4. Components are reused appropriately.
5. WordPress shared templates are reused where appropriate.
6. Shared locators are not duplicated.
7. Locators follow the required hierarchy.
8. Assertions follow the correct ownership rules.
9. Tests are independent and deterministic.
10. Test data is properly typed.
11. Static expected data is externalized where appropriate.
12. Dynamic data is generated or retrieved correctly.
13. No arbitrary waits are introduced.
14. No unnecessary `any` is introduced.
15. No secrets are introduced.
16. Existing project conventions are preserved.
17. Existing utilities are reused where appropriate.
18. Existing Components are reused where appropriate.
19. No unnecessary abstractions are introduced.
20. No duplicate Page Objects are introduced.
21. ESLint passes.
22. Formatting passes.
23. TypeScript type checking passes.
24. Relevant Playwright tests pass.
25. No unrelated changes are included.

---

# Golden Rule

Always prefer:

```text
Business-readable tests
        +
Correct Test/Page Object separation
        +
Reusable WordPress Components
        +
Template-aware Page Objects
        +
Typed Fixtures
        +
Typed Test Data
        +
Correct Static/Dynamic Data Handling
        +
Stable Semantic Locators
        +
Single Locator Ownership
        +
Playwright Web-First Assertions
        +
Automatic Synchronization
        +
Independent Tests
        +
Strict TypeScript
        +
Existing Framework Reuse
        +
Automated Quality Gates
        =
Reliable Enterprise-Grade Playwright Automation
```

---

# Core Decision Rules

When implementing or reviewing any Playwright test, the agent MUST use these
rules:

```text
UI Locator?
    ↓
Page Object / Component

UI Action?
    ↓
Page Object / Component

Business Scenario?
    ↓
Test

Business Assertion?
    ↓
Test

Reusable UI?
    ↓
Component

Shared WordPress UI?
    ↓
Reusable Component

WordPress Page?
    ↓
Determine whether it is unique or template-based

Same WordPress Template?
    ↓
Reuse Page Object / Shared abstraction

Controlled Expected Value?
    ↓
Typed Test Data / JSON

Runtime-Generated Value?
    ↓
Generate / derive at runtime

API/CMS/Database Value?
    ↓
Retrieve from authoritative source when appropriate

Environment-Specific Value?
    ↓
Environment Configuration

Secret?
    ↓
Environment / Secret Management

Page-Level Test State?
    ↓
May remain in Test when test-specific

Global Browser Configuration?
    ↓
Playwright Configuration

Generic Reusable Logic?
    ↓
Utility

API Interaction?
    ↓
API Client / API Fixture

Shared Locator?
    ↓
Single Component / Page Object owner

Existing Abstraction?
    ↓
Reuse before creating new

Large Page Object?
    ↓
Extract reusable Components

Theoretical Abstraction?
    ↓
Do not create unless concrete reuse exists
```

---

# Mandatory POM Principle

The agent MUST always maintain the following separation:

```text
TEST
"What are we validating?"
        ↓
FIXTURE
"What dependencies does the test need?"
        ↓
PAGE OBJECT
"How does this page behave?"
        ↓
COMPONENT
"How does this reusable UI behave?"
        ↓
LOCATOR
"How is the UI element identified?"
```

The framework MUST NOT reverse these responsibilities.

Tests MUST NOT become Page Objects.

Page Objects MUST NOT become Utilities.

Utilities MUST NOT become Page Objects.

Fixtures MUST NOT become business-logic containers.

Components MUST NOT become unrelated page containers.

---

# Current UST Component Strategy

The current framework already contains:

```text
pages/components/
├── Header.ts
├── NavigationMenu.ts
├── HeroSlider.ts
├── HelpfulLinks.ts
├── SocialLinks.ts
└── Footer.ts
```

The agent MUST reuse these Components before creating duplicate
implementations.

### Header

Responsible for reusable header behavior such as:

- Logo
- Header controls
- Top-level header interactions

### NavigationMenu

Responsible for:

- Main navigation
- Navigation links
- Dropdowns
- Multi-level navigation
- Navigation-specific interactions

### HeroSlider

Responsible for:

- Hero slides
- Next/previous controls
- Slide navigation
- Hero CTA behavior

### HelpfulLinks

Responsible for:

- Helpful Links section
- Link cards
- Contextual navigation

### SocialLinks

Responsible for:

- Social media links
- External social navigation
- Social link validation

### Footer

Responsible for:

- Footer visibility
- Footer links
- Footer sections
- Copyright information
- Secondary navigation

Do not duplicate these behaviors inside individual Page Objects.

---

# Future Page Object Strategy

As additional WordPress pages are automated, follow this decision:

```text
New Page/Test Requirement
          ↓
Does an existing Page Object support it?
          │
         YES
          ↓
       Reuse it
          │
         NO
          ↓
Does an existing WordPress template/
Page Object abstraction support it?
          │
         YES
          ↓
       Reuse/extend it
          │
         NO
          ↓
Does an existing Component provide
the required UI behavior?
          │
         YES
          ↓
       Compose it
          │
         NO
          ↓
Is the behavior genuinely reusable?
          │
         YES
          ↓
     Create Component
          │
         NO
          ↓
Create focused Page Object logic
```

The agent MUST NOT create a new Page Object simply because a new URL exists.

---

# Final Architecture for the UST Framework

The intended architecture is:

```text
school_webtesting/
│
├── .agents/
│
├── .husky/
│
├── fixtures/
│   └── test-fixtures.ts
│
├── pages/
│   ├── HomePage.ts
│   ├── [OtherPageObjects].ts
│   │
│   └── components/
│       ├── Header.ts
│       ├── NavigationMenu.ts
│       ├── HeroSlider.ts
│       ├── HelpfulLinks.ts
│       ├── SocialLinks.ts
│       ├── Footer.ts
│       └── [ReusableComponents].ts
│
├── test-data/
│   └── [TypedJSONData].json
│
├── tests/
│   ├── home/
│   ├── about/
│   ├── learning/
│   ├── school-life/
│   ├── admissions/
│   └── [OtherSuites]/
│
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── test-data.ts
│
├── api/
│   └── [APIClientsWhenRequired]/
│
├── eslint.config.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

The agent MUST evolve this structure incrementally.

Do not reorganize the entire framework unless explicitly required.

---

# Mandatory Engineering Standard

This skill is the mandatory engineering standard for the United School of
Tokyo Playwright automation framework.

Every framework change MUST prioritize:

```text
Correct Architecture
        ↓
Reuse Existing Code
        ↓
Stable Locators
        ↓
Reusable Components
        ↓
WordPress Template Reuse
        ↓
Business-Readable Tests
        ↓
Typed Test Data
        ↓
Reliable Synchronization
        ↓
Independent Tests
        ↓
Strict TypeScript
        ↓
Automated Quality Validation
```

The agent MUST prefer correctness, maintainability, and reuse over quick
implementation.

The agent MUST fix root causes rather than hiding failures.

The agent MUST NOT violate the POM architecture merely to make a test pass.

The agent MUST NOT introduce unnecessary complexity merely to appear
"enterprise-grade".

The resulting framework MUST remain simple enough for developers and testers
to understand, maintain, review, and extend.

This skill is the mandatory engineering standard for the United School of
Tokyo Playwright automation framework.
