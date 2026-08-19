import { test } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Footer', () => {
    test('TC_FTR_005 - Validate copyright information in Footer', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to the Footer
        await homePage.footer.scrollToFooter();

        // Step 3: Check the copyright text (Validate ER-1)
        await homePage.footer.verifyCopyrightInformationDisplayed(TEST_DATA.homepage.copyrightText);

        // Step 4: Click each applicable Quick Link one at a time (Validate ER-2)
        const links = TEST_DATA.homepage.quickLinks;
        await homePage.footer.verifyQuickLinksNavigation(links);
    });
});
