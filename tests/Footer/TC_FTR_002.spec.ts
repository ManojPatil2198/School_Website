import { test } from '../../fixtures/test-fixtures';

test.describe('Home Page - Footer', () => {
    test('TC_FTR_002 - Validate ES Campus information in Footer', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to the Footer
        await homePage.footer.scrollToFooter();

        // Step 3: Check 'ES Campus' information (Validate ER-1)
        await homePage.footer.verifyESCampusInformationDisplayed();

        // Step 4: Check displayed telephone number and email address (Validate ER-2)
        await homePage.footer.verifyESCampusContactDetails();
    });
});
