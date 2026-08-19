import { test } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_006 - Validate Why Choose UST overall layout, spacing and readability', async ({
        homePage,
    }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll through the complete Why Choose UST section
        await homePage.whyUST.scrollToWhyChooseUstSection();
        await homePage.whyUST.verifyWhyUSTSectionVisible();

        // Step 3: Verify the section is positioned correctly relative to preceding and following sections (Validate ER-1)
        await homePage.whyUST.verifySectionPositionInHomePage();

        // Step 4: Verify spacing between heading, cards, images and descriptions (Validate ER-2)
        await homePage.whyUST.verifyElementSpacing(features);

        // Step 5: Verify overall alignment (Validate ER-3)
        await homePage.whyUST.verifyOverallAlignment(features);

        // Step 6: Check for overlapping/clipped/truncated content (Validate ER-4)
        await homePage.whyUST.verifyNoContentClippingOrOverlap(features);

        // Step 7: Check for unexpected blank spaces (Validate ER-5)
        await homePage.whyUST.verifyNoExcessiveBlankSpaces();

        // Step 8: Verify overall readability (Validate ER-6)
        await homePage.whyUST.verifyOverallReadability(features);
    });
});
