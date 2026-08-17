---
name: school_webTest
description: Playwright E2E Automation Skill and file-by-file test suite specification for United School of Tokyo navigation testing under tests/homepage/navigation.
---

# United School of Tokyo — Navigation Test Suite Specification

This skill documents the **Navigation Test Suite** (`tests/homepage/navigation/`) in the **School_webTesting** Playwright automation framework. It provides a file-by-file technical reference, mapping test specs to Page Object Models (POM), Component Object Models (COM), and custom fixtures.

---

## 🏗️ Architecture & Framework Integration

All navigation test specs adhere to the project's **Hybrid POM + COM Architecture**:

```text
┌──────────────────────────────────────────────────────────┐
│                   Playwright Spec File                    │
│   (e.g., tests/homepage/navigation/TC_Nav_001.spec.ts)   │
└────────────────────────────┬─────────────────────────────┘
                             │ Uses Fixture ({ homePage })
                             ▼
┌──────────────────────────────────────────────────────────┐
│                 HomePage Page Object                     │
│                (pages/HomePage.ts)                        │
└────────────────────────────┬─────────────────────────────┘
                             │ Aggregates Component
                             ▼
┌──────────────────────────────────────────────────────────┐
│             NavigationMenu Component Object               │
│          (pages/components/NavigationMenu.ts)            │
└──────────────────────────────────────────────────────────┘
```

- **Custom Fixture**: Specs import `{ test, expect }` from `../../../fixtures/test-fixtures` to automatically receive an instantiated `homePage` fixture.
- **Component Object**: All DOM interactions with the menu are encapsulated inside `homePage.navigationMenu`.

---

## 📁 File-by-File Navigation Test Specifications

The navigation test suite is located in [`tests/homepage/navigation/`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation). Below is the file-by-file specification:

### 1. [`TC_Nav_001.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_001.spec.ts) — Navigation Menu Visibility

- **Title**: `TC_HOME_001 - Verify Navigation Menu is visible`
- **Objective**: Verify that the primary site navigation bar container is visible on the home page.
- **Test Steps**:
    1. Navigate to the Home page via `homePage.navigate()`.
    2. Assert visibility of `homePage.navigationMenu.navContainer`.
- **Target COM Method**: `homePage.navigationMenu.navContainer` (Locator: `page.getByRole('navigation', { name: 'Site' })`).
- **Code Structure**:
    ```typescript
    import { test, expect } from '../../../fixtures/test-fixtures';

    test.describe('Home Page - Navigation Menu', () => {
        test('TC_HOME_001 - Verify Navigation Menu is visible', async ({ homePage }) => {
            await homePage.navigate();
            await expect(homePage.navigationMenu.navContainer).toBeVisible();
        });
    });
    ```

---

### 2. [`TC_Nav_002.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_002.spec.ts) — Main Menu Items Visibility

- **Title**: `TC_HOME_002 - Verify main navigation menu items are visible`
- **Objective**: Verify that all top-level main navigation links are visible on the navigation bar.
- **Validated Items**:
    - `About UST`
    - `Learning`
    - `School Life`
    - `Admissions`
    - `Summer School`
    - `Employment`
- **Test Steps**:
    1. Navigate to the Home page.
    2. Sequentially call `homePage.navigationMenu.verifyMenuItemVisible(itemName)` for each item.
- **Target COM Method**: `verifyMenuItemVisible(itemName: string)`
- **Code Structure**:
    ```typescript
    import { test } from '../../../fixtures/test-fixtures';

    test.describe('Home Page - Navigation Menu', () => {
        test('TC_HOME_002 - Verify main navigation menu items are visible', async ({
            homePage,
        }) => {
            await homePage.navigate();
            await homePage.navigationMenu.verifyMenuItemVisible('About UST');
            await homePage.navigationMenu.verifyMenuItemVisible('Learning');
            await homePage.navigationMenu.verifyMenuItemVisible('School Life');
            await homePage.navigationMenu.verifyMenuItemVisible('Admissions');
            await homePage.navigationMenu.verifyMenuItemVisible('Summer School');
            await homePage.navigationMenu.verifyMenuItemVisible('Employment');
        });
    });
    ```

---

### 3. [`TC_Nav_003.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_003.spec.ts) — "About UST" Submenu Items Visibility

- **Title**: `TC_Nav_003 - Verify all About UST submenu items are visible`
- **Objective**: Trigger the hover state on the "About UST" menu item and verify that all associated dropdown submenu links are visible.
- **Validated Submenu Items**:
    - `UST Overview`
    - `Founding Principals`
    - `School Governance`
- **Test Steps**:
    1. Navigate to the Home page.
    2. Hover and open dropdown via `homePage.navigationMenu.openMenu('About UST')`.
    3. Iterate over `submenuItems` array and verify visibility via `homePage.navigationMenu.verifySubMenuVisible(item)`.
- **Target COM Methods**: `openMenu('About UST')`, `verifySubMenuVisible(item)`
- **Code Structure**:
    ```typescript
    import { test } from '../../../fixtures/test-fixtures';

    test.describe('Home Page - Navigation Menu', () => {
        test('TC_Nav_003 - Verify all About UST submenu items are visible', async ({
            homePage,
        }) => {
            await homePage.navigate();
            await homePage.navigationMenu.openMenu('About UST');
            const submenuItems = ['UST Overview', 'Founding Principals', 'School Governance'];
            for (const item of submenuItems) {
                await homePage.navigationMenu.verifySubMenuVisible(item);
            }
        });
    });
    ```

---

### 4. [`TC_Nav_004.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_004.spec.ts) — "Learning" Submenu Items Visibility

- **Title**: `TC_Nav_004 - Verify all Learning submenu items are visible`
- **Objective**: Trigger hover dropdown for the "Learning" top menu item and verify all learning program submenu links are visible.
- **Validated Submenu Items**:
    - `Curriculum`
    - `Early Years Program`
    - `Elementary School`
    - `Extra Curricular`
    - `Middle School`
- **Test Steps**:
    1. Navigate to the Home page.
    2. Hover and open dropdown via `homePage.navigationMenu.openMenu('Learning')`.
    3. Iterate through `submenuItems` and call `homePage.navigationMenu.verifySubMenuVisible(item)`.
- **Target COM Methods**: `openMenu('Learning')`, `verifySubMenuVisible(item)`
- **Code Structure**:
    ```typescript
    import { test } from '../../../fixtures/test-fixtures';

    test.describe('Home Page - Navigation Menu', () => {
        test('TC_Nav_004 - Verify all Learning submenu items are visible', async ({ homePage }) => {
            await homePage.navigate();
            await homePage.navigationMenu.openMenu('Learning');
            const submenuItems = [
                'Curriculum',
                'Early Years Program',
                'Elementary School',
                'Extra Curricular',
                'Middle School',
            ];
            for (const item of submenuItems) {
                await homePage.navigationMenu.verifySubMenuVisible(item);
            }
        });
    });
    ```

---

### 5. [`TC_Nav_005.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_005.spec.ts) — "School Life" Page Navigation

- **Title**: `TC_NAV_005 - Verify School Life navigation`
- **Objective**: Click on the "School Life" navigation link and verify successful page redirect and heading rendering.
- **Assertions**:
    - URL matching regex pattern `/united-school-of-tok/i`.
    - Heading role `'heading'` with text `'Request Info'` is visible on target page.
- **Test Steps**:
    1. Navigate to Home page.
    2. Click link via `homePage.navigationMenu.clickMenuItem('School Life')`.
    3. Assert URL matches `/united-school-of-tok/i`.
    4. Assert visibility of heading `'Request Info'`.
- **Target COM Methods**: `clickMenuItem('School Life')`
- **Code Structure**:
    ```typescript
    import { test, expect } from '../../../fixtures/test-fixtures';

    test.describe('Home Page - Navigation Menu', () => {
        test('TC_NAV_005 - Verify School Life navigation', async ({ homePage }) => {
            await homePage.navigate();
            await homePage.navigationMenu.clickMenuItem('School Life');
            await expect(homePage.page).toHaveURL(/united-school-of-tok/i);
            await expect(
                homePage.page.getByRole('heading', { name: 'Request Info' }),
            ).toBeVisible();
        });
    });
    ```

---

## 🛠️ Summary Matrix of Navigation Tests

| Spec File                                                                                                         | Test Case Title | Target Component Action / Assertion           | Status |
| :---------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------------------------------------- | :----- |
| [`TC_Nav_001.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_001.spec.ts) | `TC_HOME_001`   | Nav container visibility (`toBeVisible`)      | Active |
| [`TC_Nav_002.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_002.spec.ts) | `TC_HOME_002`   | Main menu items (6 links) visibility          | Active |
| [`TC_Nav_003.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_003.spec.ts) | `TC_Nav_003`    | About UST hover dropdown & submenus (3 links) | Active |
| [`TC_Nav_004.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_004.spec.ts) | `TC_Nav_004`    | Learning hover dropdown & submenus (5 links)  | Active |
| [`TC_Nav_005.spec.ts`](file:///d:/Allover_Testing/School_webTesting/tests/homepage/navigation/TC_Nav_005.spec.ts) | `TC_NAV_005`    | School Life menu click & target URL / heading | Active |

---

## 🚀 Execution Guide

To execute all tests within `tests/homepage/navigation/`:

```bash
# Run navigation suite in headless mode
npx playwright test tests/homepage/navigation/

# Run navigation suite in headed mode
npx playwright test tests/homepage/navigation/ --headed

# Run specific navigation test
npx playwright test tests/homepage/navigation/TC_Nav_005.spec.ts
```
