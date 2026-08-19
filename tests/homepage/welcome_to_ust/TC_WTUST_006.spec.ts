import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Welcome to UST Section', () => {
    test('TC_WTUST_006 - Validate Social Media icons and navigation in Welcome to UST section', async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Scroll to the 'Welcome to UST' section
        await homePage.welcomeToUST.scrollToSection();

        // Step 3: Verify the Instagram icon is displayed (Validate ER-1)
        await homePage.welcomeToUST.verifyInstagramIconVisible();

        // Step 4: Verify the Facebook icon is displayed (Validate ER-2)
        await homePage.welcomeToUST.verifyFacebookIconVisible();

        // Step 5: Verify the YouTube icon is displayed (Validate ER-3)
        await homePage.welcomeToUST.verifyYoutubeIconVisible();

        // Step 6: Verify each social media icon is displayed correctly and is not broken (Validate ER-4)
        await homePage.welcomeToUST.verifySocialIconsLoaded();

        // Step 7: Click the Instagram icon and verify the intended destination (Validate ER-5)
        await homePage.welcomeToUST.clickInstagramIcon();

        // Step 8: Navigate back to the Home page
        await homePage.navigate();
        await homePage.welcomeToUST.scrollToSection();

        // Step 9: Click the Facebook icon and verify the intended destination (Validate ER-6)
        await homePage.welcomeToUST.clickFacebookIcon();

        // Step 10: Navigate back to the Home page
        await homePage.navigate();
        await homePage.welcomeToUST.scrollToSection();

        // Step 11: Click the YouTube icon and verify the intended destination (Validate ER-7)
        await homePage.welcomeToUST.clickYoutubeIcon();
    });
});
