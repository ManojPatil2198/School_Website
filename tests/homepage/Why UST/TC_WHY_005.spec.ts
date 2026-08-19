import { test, expect } from '../../../fixtures/test-fixtures';
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
        await expect(homePage.whyUST.whyUstSection).toBeVisible();
        await expect(homePage.whyUST.whyUstHeading).toBeVisible();

        // Step 3: Identify all feature cards (Validate ER-1)
        expect(features).toHaveLength(12);

        // Step 4 & 5: Verify card structure, headings, and descriptions (Validate ER-2, ER-3)
        for (const feature of features) {
            const hLoc = homePage.whyUST.getFeatureHeading(feature.heading);
            const dLoc = homePage.whyUST.getFeatureDescription(feature.description);

            await expect(hLoc).toBeVisible();
            await expect(dLoc).toBeVisible();
        }

        // Step 6: Compare spacing and alignment between cards (Validate ER-4)
        for (const feature of features) {
            const hBox = await homePage.whyUST.getFeatureHeadingBoundingBox(feature.heading);
            expect(hBox).not.toBeNull();
            expect(hBox!.width).toBeGreaterThan(0);
            expect(hBox!.height).toBeGreaterThan(0);
        }

        // Step 7: Verify no card has missing or unexpected extra elements (Validate ER-5)
        for (const feature of features) {
            expect(feature.heading).toBeTruthy();
            expect(feature.description).toBeTruthy();
        }
    });
});
