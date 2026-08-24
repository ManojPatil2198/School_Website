import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Home Page - Footer', { tag: ['@regression'] }, () => {
    test('TC_FTR_002 - Validate ES Campus information in Footer', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to the Footer
        await homePage.footer.scrollToFooter();

        // Step 3: Check 'ES Campus' information (Validate ER-1)
        await expect(homePage.footer.esCampusHeading).toBeVisible();
        await expect(homePage.footer.esCampusAddressText).toBeVisible();

        // Step 4: Check displayed telephone number and email address (Validate ER-2)
        await expect(homePage.footer.esCampusPhoneText).toBeVisible();
        await expect(homePage.footer.esCampusEmailLink).toBeVisible();
    });
});
