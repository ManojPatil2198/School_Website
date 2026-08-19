import { test } from '../../fixtures/test-fixtures';

test.describe('Home Page - Footer', () => {
    test('TC_FTR_001 - Validate Footer is displayed correctly', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to the bottom of the Home page
        await homePage.footer.scrollToFooter();

        // Step 3: Check the Footer section (Validate ER-1)
        await homePage.footer.verifyFooterDisplayed();
        await homePage.footer.verifyFooterSectionsVisible();
    });
});
