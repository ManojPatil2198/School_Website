import { test } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_002 - Validate all approved Why Choose UST feature headings and descriptions', async ({
        homePage,
    }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to the "Why choose UST" section
        await homePage.whyUST.scrollToWhyChooseUstSection();
        await homePage.whyUST.verifyWhyUSTSectionVisible();
        await homePage.whyUST.verifyWhyUSTHeadingVisible();

        // Step 3: Locate all feature cards/items (Validate ER-1)
        await homePage.whyUST.verifyAllFeatureCardsDisplayed(features);

        // Step 4: Verify each approved feature heading (Validate ER-2)
        await homePage.whyUST.verifyAllFeatureHeadingsDisplayed(features);

        // Step 5: Verify the supporting description for each feature (Validate ER-3)
        await homePage.whyUST.verifyAllFeatureDescriptionsDisplayed(features);

        // Step 6: Verify no feature is missing or duplicated (Validate ER-4)
        await homePage.whyUST.verifyNoMissingOrDuplicatedFeatures(features, 12);

        // Step 7: Verify descriptions are complete and readable (Validate ER-5)
        await homePage.whyUST.verifyContentCompletenessAndReadability(features);
    });
});
