import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Sidebar', { tag: ['@regression'] }, () => {
    test('TC_SB_001 - Validate School Overview CTA in Sidebar', async ({ homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Locate the Sidebar on the Home page
        await homePage.sidebar.verifySidebarVisible();

        // Step 3: Verify the 'Inquire' CTA is displayed
        await homePage.sidebar.verifyInquireCTAVisible();

        // Step 4: Click on 'Inquire' CTA in the Sidebar (Validate ER-1)
        await homePage.sidebar.clickInquireCTA();

        // Step 5: Verify the destination page/functionality (Validate ER-2)
        await expect(homePage.page).not.toHaveTitle(/404|Error/i);
    });
});
