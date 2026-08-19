import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test("TC_NAV_007 - Validate navigating to 'Summer School' page from Header", async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Click on 'Summer School' Header option
        await homePage.navigationMenu.clickMenuItem('Summer School');

        // Step 3: Verify user is taken to the intended 'Summer School' page
        await expect(homePage.page).toHaveURL(/.*news-and-events/i);
    });
});
