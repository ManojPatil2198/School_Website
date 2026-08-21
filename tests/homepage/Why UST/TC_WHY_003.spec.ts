import { test, expect } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_003 - Validate Why Choose UST responsive layout', async ({ homePage }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to Why Choose UST section and verify visibility
        await homePage.whyUST.scrollToWhyChooseUstSection();
        await expect(homePage.whyUST.whyUstSection).toBeVisible();
        await expect(homePage.whyUST.whyUstHeading).toBeVisible();

        for (const feature of features) {
            await expect(homePage.whyUST.getFeatureHeading(feature.heading)).toBeVisible();
        }

        // Step 3: Verify content completeness, readability, bounding boxes, and visibility
        for (const feature of features) {
            const hBox = await homePage.whyUST.getFeatureHeadingBoundingBox(feature.heading);
            const dBox = await homePage.whyUST.getFeatureDescriptionBoundingBox(
                feature.description,
            );

            expect(hBox).not.toBeNull();
            expect(dBox).not.toBeNull();
        }
    });
});
