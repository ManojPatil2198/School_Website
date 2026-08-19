import { test } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Helpful Links', () => {
    test("TC_HLP_001 - Validate 'Helpful Links' section and link cards are displayed", async ({
        homePage,
    }) => {
        const links = TEST_DATA.homepage.helpfulLinks;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to Helpful Links section
        await homePage.helpfulLinks.scrollToHelpfulLinksSection();

        // Step 3: Verify the Helpful Links heading is displayed (Validate ER-1)
        await homePage.helpfulLinks.verifyHelpfulLinksSectionVisible();
        await homePage.helpfulLinks.verifyHelpfulLinksHeadingVisible();

        // Step 4: Verify all available link cards/options are displayed (Validate ER-2)
        await homePage.helpfulLinks.verifyAllLinkCardsDisplayed(links);

        // Step 5: Verify each link card has readable text (Validate ER-3)
        await homePage.helpfulLinks.verifyAllLinksReadable(links);

        // Step 6: Verify no card appears broken or empty (Validate ER-4)
        await homePage.helpfulLinks.verifyNoBrokenOrEmptyCards(links);
    });
});
