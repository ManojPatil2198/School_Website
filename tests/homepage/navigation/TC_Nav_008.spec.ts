import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test("TC_NAV_008 - Validate navigating to 'Employment' page from Header", async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Click on 'Employment' Header option
        await homePage.navigationMenu.clickMenuItem('Employment');

        // Step 3: Verify user is taken to the intended 'Employment' page
        await expect(homePage.page).toHaveURL(/.*about-3/i);
    });
});
