import { test, expect } from '../../../fixtures/test-fixtures';
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
        await expect(homePage.whyUST.whyUstSection).toBeVisible();

        // Step 3: Verify the section is positioned correctly relative to preceding and following sections (Validate ER-1)
        const sectionBox = await homePage.whyUST.getSectionBoundingBox();
        expect(sectionBox).not.toBeNull();
        expect(sectionBox!.y).toBeGreaterThanOrEqual(0);

        // Step 4: Verify spacing between heading, cards, images and descriptions (Validate ER-2)
        const headingBox = await homePage.whyUST.getHeadingBoundingBox();
        expect(headingBox).not.toBeNull();

        const firstFeatureBox = await homePage.whyUST.getFeatureHeadingBoundingBox(
            features[0].heading,
        );
        expect(firstFeatureBox).not.toBeNull();
        expect(firstFeatureBox!.y).toBeGreaterThanOrEqual(headingBox!.y);

        // Step 5: Verify overall alignment (Validate ER-3)
        for (const feature of features) {
            const hBox = await homePage.whyUST.getFeatureHeadingBoundingBox(feature.heading);
            const dBox = await homePage.whyUST.getFeatureDescriptionBoundingBox(
                feature.description,
            );

            expect(hBox).not.toBeNull();
            expect(dBox).not.toBeNull();
            expect(hBox!.width).toBeGreaterThan(0);
            expect(dBox!.width).toBeGreaterThan(0);
        }

        // Step 6: Check for overlapping/clipped/truncated content (Validate ER-4)
        for (const feature of features) {
            await expect(homePage.whyUST.getFeatureHeading(feature.heading)).toBeVisible();
            await expect(homePage.whyUST.getFeatureDescription(feature.description)).toBeVisible();
        }

        // Step 7: Check for unexpected blank spaces (Validate ER-5)
        expect(sectionBox!.height).toBeGreaterThan(100);
        expect(sectionBox!.height).toBeLessThan(15000);

        // Step 8: Verify overall readability (Validate ER-6)
        for (const feature of features) {
            const headingText = await homePage.whyUST
                .getFeatureHeading(feature.heading)
                .innerText();
            const descText = await homePage.whyUST
                .getFeatureDescription(feature.description)
                .innerText();

            expect(headingText).toContain(feature.heading);
            expect(descText).toContain(feature.description);
        }
    });
});
