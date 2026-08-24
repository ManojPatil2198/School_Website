import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Sidebar', { tag: ['@regression', '@visual'] }, () => {
    test('TC_SB_002 - Validate Social Media icons are displayed correctly in Sidebar', async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Locate the Sidebar on the Home page
        await homePage.sidebar.verifySidebarVisible();

        // Step 3: Verify the Instagram icon is displayed (Validate ER-1)
        await homePage.sidebar.verifyInstagramIconVisible();

        // Step 4: Verify the Facebook icon is displayed (Validate ER-2)
        await homePage.sidebar.verifyFacebookIconVisible();

        // Step 5: Verify the YouTube icon is displayed (Validate ER-3)
        await homePage.sidebar.verifyYoutubeIconVisible();

        // Step 6: Verify each social media icon is rendered correctly and is not broken (Validate ER-4)
        await homePage.sidebar.verifySocialIconsLoaded();

        // Step 7: Verify the icons are properly aligned and positioned within the Sidebar (Validate ER-5)
        await homePage.sidebar.verifySocialIconsAlignment();

        // Step 8: Verify the icons do not overlap, clip, or display unexpected visual issues (Validate ER-6)
        await homePage.sidebar.verifySocialIconsLayout();
    });
});
