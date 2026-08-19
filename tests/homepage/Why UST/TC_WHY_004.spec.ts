import { test, expect } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_004 - Validate Why Choose UST visual assets', async ({ homePage }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to Why Choose UST section
        await homePage.whyUST.scrollToWhyChooseUstSection();
        await expect(homePage.whyUST.whyUstSection).toBeVisible();

        // Step 3: Locate all images/icons/visual assets (Validate ER-1)
        const assetsCount = await homePage.whyUST.getVisualAssetsCount();
        expect(assetsCount).toBeGreaterThan(0);

        // Step 4: Verify each visual asset loads successfully (Validate ER-2)
        const loadStatuses = await homePage.whyUST.checkImagesLoadedStatus();
        for (const loaded of loadStatuses) {
            expect(loaded).toBe(true);
        }

        // Step 5: Verify each visual is associated with the correct feature/card (Validate ER-3)
        for (const feature of features) {
            await expect(homePage.whyUST.getFeatureHeading(feature.heading)).toBeVisible();
        }

        // Step 6: Check for distortion, stretching or incorrect cropping (Validate ER-4)
        const imagesCount = await homePage.whyUST.getVisualImagesCount();
        for (let i = 0; i < imagesCount; i++) {
            const img = homePage.whyUST.visualImages.nth(i);
            await expect(img).toBeVisible();
            const box = await img.boundingBox();
            expect(box).not.toBeNull();
            expect(box!.width).toBeGreaterThan(0);
            expect(box!.height).toBeGreaterThan(0);
        }

        // Step 7: Check visual alignment with associated content and no overlap (Validate ER-5)
        for (const feature of features) {
            await expect(homePage.whyUST.getFeatureHeading(feature.heading)).toBeVisible();
            await expect(homePage.whyUST.getFeatureDescription(feature.description)).toBeVisible();
        }
    });
});
