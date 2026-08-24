# UST Playwright Framework Templates & Code Examples

This document provides production-grade TypeScript templates and concrete Good vs. Bad implementation examples for each framework layer.

---

## 1. Production Boilerplate Templates

### Template 1: Page Object Pattern (`pages/<PageName>Page.ts`)

```typescript
import { Page, Locator, expect } from '@playwright/test';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export class AdmissionsPage {
    readonly page: Page;
    readonly header: Header;
    readonly footer: Footer;

    // Locators
    readonly pageHeading: Locator;
    readonly applyNowButton: Locator;
    readonly inquiryFormContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.footer = new Footer(page);

        // Locators using semantic hierarchy
        this.pageHeading = page.getByRole('heading', { level: 1, name: /admissions/i });
        this.applyNowButton = page.getByRole('link', { name: /apply now/i });
        this.inquiryFormContainer = page.getByTestId('admissions-inquiry-form');
    }

    /**
     * Navigates directly to the Admissions page URL and waits for DOM readiness.
     */
    async navigate(): Promise<void> {
        await this.page.goto('/admissions');
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Triggers the application workflow.
     */
    async clickApplyNow(): Promise<void> {
        await this.applyNowButton.click();
    }
}
```

---

### Template 2: Component Pattern (`pages/components/<ComponentName>.ts`)

```typescript
import { Page, Locator, expect } from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly container: Locator;
    readonly quickNavLinks: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.getByRole('complementary');
        this.quickNavLinks = this.container.getByRole('link');
        this.searchInput = this.container.getByPlaceholder(/search sidebar/i);
    }

    /**
     * Performs search within sidebar context.
     */
    async searchSidebar(query: string): Promise<void> {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
    }
}
```

---

### Template 3: Test Spec Pattern (`tests/<feature>/<TC_ID_NAME>.spec.ts`)

```typescript
import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Admissions Feature Suite', () => {
    test('TC_ADM_001 - User can navigate to admissions and view page heading', async ({
        admissionsPage,
    }) => {
        // Step 1: Navigate to target page
        await admissionsPage.navigate();

        // Step 2: Web-first assertion on Page Object state
        await expect(admissionsPage.pageHeading).toBeVisible();
        await expect(admissionsPage.pageHeading).toHaveText('Admissions & Enrollment');
    });
});
```

---

### Template 4: Custom Fixtures (`fixtures/test-fixtures.ts`)

```typescript
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AdmissionsPage } from '../pages/AdmissionsPage';

// Declare fixture types
type FrameworkFixtures = {
    homePage: HomePage;
    admissionsPage: AdmissionsPage;
};

// Extend base test with custom Page Object fixtures
export const test = base.extend<FrameworkFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    admissionsPage: async ({ page }, use) => {
        await use(new AdmissionsPage(page));
    },
});

export { expect } from '@playwright/test';
```

---

### Template 5: Typed Test Data Contract & JSON

**JSON File (`test-data/admissions/admissions-data.json`)**:

```json
{
    "staticContent": {
        "pageTitle": "Admissions & Enrollment",
        "expectedFeeNotice": "Application fee is non-refundable."
    }
}
```

**TypeScript Type Definition (`utils/test-data.ts`)**:

```typescript
export interface AdmissionsData {
    staticContent: {
        pageTitle: string;
        expectedFeeNotice: string;
    };
}
```

---

## 2. Good Implementation Examples vs. Anti-Patterns

### Example 1: Locator Selection

**❌ ANTI-PATTERN (Fragile, positional, implementation-bound)**:

```typescript
// BAD: Breaks when CSS classes change or layout shifts
const submitBtn = page.locator('div.elementor-element-49a8 > div > button.btn-primary').nth(0);
const navItem = page.locator('//ul[@id="menu-1"]/li[3]/a');
```

**✅ GOOD PATTERN (Semantic, accessible, stable)**:

```typescript
// GOOD: Resilient to markup changes, uses user-facing role
const submitBtn = page.getByRole('button', { name: 'Submit Application' });
const navItem = page.getByRole('link', { name: 'School Life' });
```

---

### Example 2: Test vs Page Object Boundaries

**❌ ANTI-PATTERN (Raw UI implementation details inside test spec)**:

```typescript
// BAD: Test directly interacts with raw page locators and clicks
test('submit inquiry form', async ({ page }) => {
    await page.goto('/contact');
    await page.getByLabel('Name').fill('John Doe');
    await page.getByRole('button', { name: 'Send' }).click();
    expect(await page.locator('.success-message').isVisible()).toBe(true);
});
```

**✅ GOOD PATTERN (Clean POM delegation and web-first assertion)**:

```typescript
// GOOD: Test describes business intent, POM handles HOW page operates
test('submit inquiry form', async ({ contactPage }) => {
    await contactPage.navigate();
    await contactPage.fillInquiryForm({ name: 'John Doe' });
    await expect(contactPage.successMessage).toBeVisible();
});
```

---

### Example 3: Synchronization & Waits

**❌ ANTI-PATTERN (Arbitrary sleep/timeouts)**:

```typescript
// BAD: Causes flaky, slow tests; masks real async issues
await page.waitForTimeout(5000);
expect(await page.locator('.modal').isVisible()).toBe(true);
```

**✅ GOOD PATTERN (Web-first assertion auto-waiting)**:

```typescript
// GOOD: Retries automatically until condition passes or timeout occurs
await expect(page.getByRole('dialog')).toBeVisible();
```

---

### Example 4: Static vs Dynamic Test Data

**❌ ANTI-PATTERN (Hardcoding dynamic runtime values in static JSON)**:

```json
// BAD: Hardcoding current year in static JSON break tests on Jan 1st
{
    "copyright": "© 2026 United School of Tokyo"
}
```

**✅ GOOD PATTERN (Deriving dynamic value at runtime)**:

```typescript
// GOOD: Calculate dynamic value programmatically
const currentYear = new Date().getFullYear();
await expect(footer.copyrightText).toContainText(`© ${currentYear} United School of Tokyo`);
```
