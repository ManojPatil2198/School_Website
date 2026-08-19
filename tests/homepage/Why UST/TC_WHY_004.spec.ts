import { test } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_004 - Validate Why Choose UST visual assets', async ({ homePage }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to Why Choose UST section
        await homePage.whyUST.scrollToWhyChooseUstSection();
        await homePage.whyUST.verifyWhyUSTSectionVisible();

        // Step 3: Locate all images/icons/visual assets (Validate ER-1)
        await homePage.whyUST.verifyVisualAssetsPresent();

        // Step 4: Verify each visual asset loads successfully (Validate ER-2)
        await homePage.whyUST.verifyVisualAssetsLoaded();

        // Step 5: Verify each visual is associated with the correct feature/card (Validate ER-3)
        await homePage.whyUST.verifyVisualAssetsAssociatedWithFeatures(features);

        // Step 6: Check for distortion, stretching or incorrect cropping (Validate ER-4)
        await homePage.whyUST.verifyVisualAssetsNotDistorted();

        // Step 7: Check visual alignment with associated content and no overlap (Validate ER-5)
        await homePage.whyUST.verifyVisualsDoNotOverlapText(features);
    });
});
