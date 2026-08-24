import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Welcome to UST Section', { tag: ['@regression'] }, () => {
    test('TC_WTUST_002 - Validate Learn More link from Welcome to UST section', async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Scroll to the 'Welcome to UST' section
        await homePage.welcomeToUST.scrollToSection();
        await homePage.welcomeToUST.verifyWelcomeSectionVisible();

        // Step 3 & 4: Locate & verify the 'Learn More' link is displayed and clickable
        await homePage.welcomeToUST.verifyLearnMoreLinkVisible();

        // Step 5: Click on 'Learn More' (Validate ER-1)
        await homePage.welcomeToUST.clickLearnMoreLink();

        // Step 6: Verify the destination page/functionality (Validate ER-2)
        await expect(homePage.page).not.toHaveTitle(/404|Error/i);
    });
});
