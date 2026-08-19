import { test, expect } from '../../../fixtures/test-fixtures';
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
        await expect(homePage.whyUST.whyUstSection).toBeVisible();
        await expect(homePage.whyUST.whyUstHeading).toBeVisible();

        // Step 3 & 4: Verify feature cards displayed and headings visible (Validate ER-1, ER-2)
        expect(features).toHaveLength(12);
        for (const feature of features) {
            const headingLoc = homePage.whyUST.getFeatureHeading(feature.heading);
            await expect(headingLoc).toBeVisible();

            // Step 5: Verify the supporting description for each feature (Validate ER-3)
            const descLoc = homePage.whyUST.getFeatureDescription(feature.description);
            await expect(descLoc).toBeVisible();

            const text = await descLoc.innerText();
            expect(text.trim().length).toBeGreaterThan(0);
        }

        // Step 6: Verify no feature is missing or duplicated (Validate ER-4)
        const uniqueHeadings = new Set(features.map((f) => f.heading));
        expect(uniqueHeadings.size).toBe(12);

        for (const feature of features) {
            const headingCount = await homePage.whyUST.getFeatureHeading(feature.heading).count();
            expect(headingCount).toBeGreaterThanOrEqual(1);

            expect(feature.heading.toLowerCase()).not.toContain('lorem ipsum');
            expect(feature.heading.toLowerCase()).not.toContain('tbd');
            expect(feature.description.toLowerCase()).not.toContain('lorem ipsum');
            expect(feature.description.toLowerCase()).not.toContain('placeholder');
        }

        // Step 7: Verify descriptions are complete and readable (Validate ER-5)
        for (const feature of features) {
            const headingBox = await homePage.whyUST.getFeatureHeadingBoundingBox(feature.heading);
            const descBox = await homePage.whyUST.getFeatureDescriptionBoundingBox(
                feature.description,
            );

            expect(headingBox).not.toBeNull();
            expect(headingBox!.width).toBeGreaterThan(0);
            expect(headingBox!.height).toBeGreaterThan(0);

            expect(descBox).not.toBeNull();
            expect(descBox!.width).toBeGreaterThan(0);
            expect(descBox!.height).toBeGreaterThan(0);
        }
    });
});
