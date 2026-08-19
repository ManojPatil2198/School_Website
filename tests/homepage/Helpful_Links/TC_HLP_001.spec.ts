import { test, expect } from '../../../fixtures/test-fixtures';
import { TEST_DATA } from '../../../utils/test-data';

test.describe('Home Page - Helpful Links', () => {
    test("TC_HLP_001 - Validate 'Helpful Links' section and link cards are displayed", async ({
        homePage,
    }) => {
        const links = TEST_DATA.homepage.helpfulLinks;

        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to Helpful Links section
        await homePage.helpfulLinks.scrollToHelpfulLinksSection();

        // Step 3: Verify the Helpful Links heading is displayed (Validate ER-1)
        await expect(homePage.helpfulLinks.helpfulLinksHeading).toBeVisible();

        // Step 4, 5 & 6: Verify link cards displayed, readable text, and valid content (Validate ER-2, ER-3, ER-4)
        expect(links.length).toBeGreaterThan(0);
        for (const linkName of links) {
            const linkLoc = homePage.helpfulLinks.getLinkCard(linkName);
            await expect(linkLoc).toBeVisible();

            const text = await homePage.helpfulLinks.getLinkCardText(linkName);
            expect(text.trim().length).toBeGreaterThan(0);
            expect(text.toLowerCase()).not.toContain('undefined');
            expect(text.toLowerCase()).not.toContain('null');

            const box = await homePage.helpfulLinks.getLinkCardBoundingBox(linkName);
            expect(box).not.toBeNull();
            expect(box!.width).toBeGreaterThan(0);
            expect(box!.height).toBeGreaterThan(0);
        }
    });
});
