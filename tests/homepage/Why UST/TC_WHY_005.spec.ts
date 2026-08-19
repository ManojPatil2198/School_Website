import { test } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_005 - Validate Why Choose UST feature card structure and consistency', async ({
        homePage,
    }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to Why Choose UST section
        await homePage.whyUST.scrollToWhyChooseUstSection();
        await homePage.whyUST.verifyWhyUSTSectionVisible();
        await homePage.whyUST.verifyWhyUSTHeadingVisible();

        // Step 3: Identify all feature cards (Validate ER-1)
        await homePage.whyUST.verifyAllFeatureCardsDisplayed(features);

        // Step 4: Verify each card follows approved component structure (Validate ER-2)
        await homePage.whyUST.verifyFeatureCardStructure(features);

        // Step 5: Verify expected visual, heading, and description are present (Validate ER-3)
        await homePage.whyUST.verifyAllFeatureHeadingsDisplayed(features);
        await homePage.whyUST.verifyAllFeatureDescriptionsDisplayed(features);

        // Step 6: Compare spacing and alignment between cards (Validate ER-4)
        await homePage.whyUST.verifyFeatureCardSpacingAndAlignment(features);

        // Step 7: Verify no card has missing or unexpected extra elements (Validate ER-5)
        await homePage.whyUST.verifyNoMissingOrExtraElements(features, 12);
    });
});
