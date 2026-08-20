# Locators, Assertions, Synchronization, Test Independence

## Locator strategy (priority order)

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTitle()`
6. `getByTestId()`
7. Stable CSS selector
8. XPath (last resort only, when no reliable semantic/attribute locator exists)

Preferred:

```typescript
page.getByRole('button', { name: 'Login' });
page.getByLabel('Email');
page.getByRole('link', { name: 'Shopping Cart' });
page.getByTestId('product-card');
```

Avoid:

```typescript
page.locator('div:nth-child(3)');
page.locator('.css-1a2b3c');
page.locator('div > div > button');
page.locator('//div[3]/button');
```

Avoid unnecessary `.first()`, `.last()`, `.nth()`. Locators must be
stable, readable, user-facing-semantic, free of implementation-specific
CSS classes and positional selectors, non-duplicated across Page
Objects. If a locator is shared UI, it belongs in the owning Component.

## Assertions

Use web-first assertions:

```typescript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('Success');
await expect(page).toHaveURL(/dashboard/);
await expect(locator).toHaveCount(5);
```

Avoid: `expect(await locator.isVisible()).toBe(true);`

Assertions must verify meaningful business behavior — don't add
assertions just to increase count.

### Assertion ownership

Business acceptance criteria normally belong in Tests:

```typescript
test('footer is displayed', async ({ homePage }) => {
    await homePage.navigate();
    await expect(homePage.footer.container).toBeVisible();
});
```

Page Objects/Components may expose locators, UI state,
implementation-specific state checks, and reusable verification
methods — but avoid hiding multiple business assertions inside a single
`verifyEverything()`-style method. Page Object assertions are fine when
tightly coupled to implementation and genuinely reusable.

## Waits and synchronization

Prefer Playwright's automatic waiting.

Prohibited as normal synchronization:

```typescript
await page.waitForTimeout(5000);
setTimeout(...);
```

Prefer:

```typescript
await expect(locator).toBeVisible();
await page.waitForURL(/dashboard/);
await page.waitForResponse(...);
```

If `waitForTimeout()` is genuinely unavoidable, document why. For flaky
tests, find and fix the root cause instead of adding delays or
increasing timeouts.

If synchronization is always required as part of a Page Object
operation, encapsulate it there:

```typescript
async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
}
```

Test-specific synchronization may remain in the test when it's actually
part of that scenario.

## Test independence

Tests must be independent, deterministic, parallel-safe where possible,
and free of execution-order dependencies (Test 2 must not depend on
Test 1, etc.). Avoid shared mutable users/orders/products/browser
state/files/auth state that can cause interference. Each test
establishes or receives the state it needs.

## Authentication

Use Playwright `storageState` for authenticated scenarios where
appropriate. Don't perform UI login before every test unless auth
itself is the subject under test — those tests should validate the
actual login UI flow. Isolate auth state where required.
