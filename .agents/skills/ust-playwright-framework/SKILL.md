---
name: ust-playwright-framework
description: Production-grade TypeScript and Playwright automation skill for the United School of Tokyo E2E framework. Use whenever creating, modifying, reviewing, refactoring, or debugging Playwright tests, Page Objects, reusable components, fixtures, locators, test data, utilities, or framework configuration.
---

# United School of Tokyo Playwright Framework Skill

## 1. Purpose

This skill defines the mandatory standards for the United School of Tokyo
enterprise Playwright automation framework.

The framework MUST be:

- Maintainable
- Scalable
- Reusable
- Type-safe
- Reliable
- Deterministic
- Easy to debug
- Easy to review

The agent MUST follow this skill for all framework-related changes.

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
| Test Data         | JSON / typed data             |
| Linting           | ESLint                        |
| Formatting        | Prettier                      |
| Git Hooks         | Husky                         |
| Staged Checks     | lint-staged                   |
| Runtime TS Loader | Jiti where required           |

Do not introduce Selenium, Cypress, Puppeteer, WebdriverIO, or another E2E
framework unless explicitly required by the project.

---

## 3. Architecture

The framework follows:

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

- Own page locators.
- Own page actions and workflows.
- Encapsulate page implementation.
- May contain reusable page-specific assertions.

**Components**

- Encapsulate reusable UI such as Header, Footer, Navigation, Modal,
  Slider, Forms, Tables, and Pagination.
- Must be used when the same UI behavior appears across multiple pages.

**Fixtures**

- Provide Page Objects, components, authentication state, test data, or
  other reusable dependencies.
- Must be typed and have a clear responsibility.

**Utilities**

- Must remain generic.
- Must not contain page-specific behavior.

---

## 4. Test vs Page Object Rule

This is a mandatory architectural rule:

> Tests describe WHAT the user does. Page Objects describe HOW the page does it.

### Preferred

```typescript
test('user can login', async ({ loginPage }) => {
    await loginPage.login(user.email, user.password);

    await expect(loginPage.dashboardHeading).toBeVisible();
});
```

### Prohibited

```typescript
test('user can login', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();
});
```

Tests MUST NOT directly define or manipulate UI locators when the behavior
belongs in a Page Object or component.

---

## 5. Page Object Rules

A Page Object should represent one meaningful page and its behavior.

Page Objects MAY contain:

- Locators
- Page actions
- Page workflows
- Navigation
- Page-specific synchronization
- Reusable page-state assertions

Page Objects MUST NOT become containers for unrelated business workflows,
global utilities, or duplicated component logic.

Prefer meaningful methods:

```typescript
await loginPage.login(email, password);
await homePage.searchForProduct('iMac');
await productPage.addToCart();
```

over exposing every low-level interaction to the test.

---

## 6. Component Rules

Create a component when UI behavior is:

- Reused across pages
- Logically independent
- Complex enough to justify encapsulation
- Easier to maintain as a separate abstraction

Examples:

```text
Header
Footer
NavigationMenu
HeroSlider
SearchBox
LoginForm
ProductCard
Pagination
Modal
```

Do not create unnecessary abstractions for individual generic HTML elements.

Prefer composition over deep inheritance.

---

## 7. Locator Strategy

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

---

## 8. Assertions

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

Assertions must verify meaningful business behavior.

Do not add unnecessary assertions just to increase assertion count.

---

## 9. Wait and Synchronization Rules

Playwright's automatic waiting MUST be preferred.

### Prohibited as normal synchronization

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

---

## 10. Test Independence

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

Avoid shared mutable users, orders, products, browser state, or files when
they can cause test interference.

---

## 11. Authentication

Use Playwright `storageState` for authenticated test scenarios where
appropriate.

Do not perform UI login before every test when authentication itself is not
the subject of the test.

Authentication tests SHOULD validate the actual login UI flow.

---

## 12. Test Data

Test data should be externalized where practical.

Recommended:

```text
test-data/
├── users.json
├── products.json
├── orders.json
└── environments/
```

Sensitive credentials MUST NOT be committed.

Use environment variables or approved secret-management mechanisms.

---

## 13. Typed Test Data

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

Use builders/factories when test data becomes complex or dynamic.

---

## 14. TypeScript Standards

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

## 15. Naming and Imports

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

## 16. Utilities

Utilities MUST be generic and reusable.

Good examples:

```text
Date utilities
Random data generation
Environment helpers
File helpers
Generic formatting
```

Bad examples:

```text
clickLoginButton()
addProductFromHomePage()
openShoppingCartFromHeader()
```

Page-specific behavior belongs in Page Objects or components.

Do not create a utility just to save one line of code.

---

## 17. API Testing

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

---

## 18. Error Handling

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

## 19. Playwright Configuration

Keep global Playwright configuration centralized.

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

Do not duplicate global configuration inside individual tests.

Do not increase timeouts simply to hide test failures.

---

## 20. ESLint and Prettier

ESLint and Prettier are mandatory quality tools.

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

## 21. Quality Gate

Before considering a change complete:

```text
✓ Code follows framework architecture
✓ Tests contain business behavior only
✓ Page Objects contain UI implementation
✓ Components are reused appropriately
✓ Locators are stable and semantic
✓ No arbitrary waits
✓ Tests are independent
✓ Test data is typed
✓ No unnecessary any
✓ No secrets
✓ ESLint passes
✓ Prettier passes
✓ TypeScript type checking passes
✓ Relevant Playwright tests pass
```

Use the project's existing npm scripts from `package.json`.

Do not invent validation commands without checking the repository first.

---

## 22. Reuse Before Create

Before creating a new:

- Page Object
- Component
- Fixture
- Utility
- Constant
- Data type
- Helper

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
```

---

## 23. Agent Execution Rules

Before modifying the framework, inspect:

```text
1. Repository structure
2. Existing tests
3. Page Objects
4. Components
5. Fixtures
6. Test data
7. Utilities
8. package.json
9. Playwright configuration
10. TypeScript configuration
11. ESLint configuration
12. Prettier configuration
```

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

---

## 24. Debugging and Flaky Tests

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

Fix the underlying issue.

Do not solve flakiness by blindly adding waits or increasing timeouts.

---

## 25. Refactoring Rules

When refactoring:

- Preserve existing behavior.
- Reduce duplication.
- Improve maintainability.
- Improve locator stability.
- Improve type safety.
- Keep changes focused.
- Avoid unrelated changes.
- Run relevant tests afterward.

Do not perform large architectural refactors while implementing an unrelated
single test or bug fix.

---

## 26. Security

Never commit:

- Passwords
- API keys
- Access tokens
- Private keys
- Client secrets
- Session tokens

If secrets are discovered, do not copy them into new files.

Use environment variables or the project's approved secret-management method.

---

## 27. Final Definition of Done

A change is complete only when:

1. The correct framework layer is used.
2. Tests remain business-readable.
3. Page Objects encapsulate UI implementation.
4. Components are reused appropriately.
5. Locators follow the required hierarchy.
6. Tests are independent and deterministic.
7. Test data is properly typed.
8. No arbitrary waits are introduced.
9. No unnecessary `any` is introduced.
10. No secrets are introduced.
11. Existing project conventions are preserved.
12. ESLint passes.
13. Formatting passes.
14. TypeScript type checking passes.
15. Relevant Playwright tests pass.
16. No unrelated changes are included.

---

# Golden Rule

Always prefer:

```text
Business-readable tests
        +
Page Object encapsulation
        +
Reusable components
        +
Typed fixtures
        +
Typed test data
        +
Stable semantic locators
        +
Playwright web-first assertions
        +
Automatic synchronization
        +
Strict TypeScript
        +
Automated quality gates
        =
Reliable enterprise-grade Playwright automation
```

This skill is the mandatory engineering standard for the
United School of Tokyo Playwright automation framework.
