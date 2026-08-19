import { test } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_003 - Validate Why Choose UST responsive layout', async ({ homePage }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 1 Verification: Desktop Viewport 1920x1080 (Validate ER-1)
        await homePage.whyUST.verifySectionInViewport(1920, 1080, features);

        // Step 2 Verification: Tablet Viewport 768x1024 (Validate ER-2)
        await homePage.whyUST.verifySectionInViewport(768, 1024, features);

        // Step 3 Verification: Mobile Viewport 390x844 (Validate ER-3)
        await homePage.whyUST.verifySectionInViewport(390, 844, features);

        // Step 4 Verification: Feature cards rearrange correctly across viewports (Validate ER-4)
        await homePage.whyUST.verifyCardsRearrangeAcrossViewports(features);

        // Step 5 Verification: Content completeness, readability, and visibility (Validate ER-5)
        await homePage.whyUST.verifyContentCompletenessAndReadability(features);
    });
});
