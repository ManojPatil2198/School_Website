import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Sidebar', () => {
    test('TC_SB_003 - Validate School Overview CTA in Sidebar', async ({ homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Locate the Sidebar on the Home page
        await homePage.sidebar.verifySidebarVisible();

        // Step 3: Verify the 'School Overview' CTA is displayed
        await homePage.sidebar.verifySchoolOverviewCTAVisible();

        // Step 4: Click on 'School Overview' CTA in the Sidebar (Validate ER-1)
        await homePage.sidebar.clickSchoolOverviewCTA();

        // Step 5: Verify the destination page/functionality (Validate ER-2)
        await expect(homePage.page).not.toHaveTitle(/404|Error/i);
    });
});
