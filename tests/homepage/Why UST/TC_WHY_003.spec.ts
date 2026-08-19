import { test, expect } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_003 - Validate Why Choose UST responsive layout', async ({ homePage }) => {
        const features = TEST_DATA.homepage.whyChooseUstFeatures;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Helper function for viewport checks
        async function checkViewport(width: number, height: number) {
            await homePage.page.setViewportSize({ width, height });
            await homePage.whyUST.scrollToWhyChooseUstSection();
            await expect(homePage.whyUST.whyUstSection).toBeVisible();
            await expect(homePage.whyUST.whyUstHeading).toBeVisible();

            for (const feature of features) {
                await expect(homePage.whyUST.getFeatureHeading(feature.heading)).toBeVisible();
            }
        }

        // Step 1 Verification: Desktop Viewport 1920x1080 (Validate ER-1)
        await checkViewport(1920, 1080);

        // Step 2 Verification: Tablet Viewport 768x1024 (Validate ER-2)
        await checkViewport(768, 1024);

        // Step 3 Verification: Mobile Viewport 390x844 (Validate ER-3)
        await checkViewport(390, 844);

        // Step 4 Verification: Feature cards rearrange correctly across viewports (Validate ER-4)
        const firstHeadingText = features[0].heading;

        await homePage.page.setViewportSize({ width: 1920, height: 1080 });
        await homePage.whyUST.scrollToWhyChooseUstSection();
        const desktopBox = await homePage.whyUST.getFeatureHeadingBoundingBox(firstHeadingText);
        expect(desktopBox).not.toBeNull();

        await homePage.page.setViewportSize({ width: 390, height: 844 });
        await homePage.whyUST.scrollToWhyChooseUstSection();
        const mobileBox = await homePage.whyUST.getFeatureHeadingBoundingBox(firstHeadingText);
        expect(mobileBox).not.toBeNull();

        expect(mobileBox!.x).toBeLessThanOrEqual(desktopBox!.x);

        // Step 5 Verification: Content completeness, readability, and visibility (Validate ER-5)
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
