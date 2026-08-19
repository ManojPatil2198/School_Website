import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_001 - Verify Navigation Menu is visible', async ({ homePage }) => {
        // Step 1: Navigate to Home page
        await homePage.navigate();

        // Step 2: Verify Navigation Menu is visible
        await expect(homePage.navigationMenu.navContainer).toBeVisible();
    });
});
