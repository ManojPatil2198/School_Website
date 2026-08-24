import { test, expect } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Helpful Links', { tag: ['@regression'] }, () => {
    test('TC_HLP_002 - Validate all Helpful Links navigate to their intended destinations', async ({
        homePage,
    }) => {
        test.setTimeout(90000);
        const links = TEST_DATA.homepage.helpfulLinks;

        for (const linkName of links) {
            // Step 1: Open the Application URL & Navigate to Home page
            await homePage.navigate();

            // Step 2: Scroll to Helpful Links section
            await homePage.helpfulLinks.scrollToHelpfulLinksSection();
            await expect(homePage.helpfulLinks.helpfulLinksHeading).toBeVisible();

            // Step 3, 4 & 5: Click link, verify intended destination loads, return to Home page before next link
            await homePage.helpfulLinks.clickLinkCard(linkName);
            await expect(homePage.page).not.toHaveURL(/about:blank/);
            await expect(homePage.page).toHaveURL(/.*united-school-of-tok/i);
        }
    });
});
