import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA, getExpectedCopyrightPattern } from '../../utils/test-data';

test.describe('Home Page - Footer', () => {
    test('TC_FTR_005 - Validate copyright information in Footer', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to the Footer
        await homePage.footer.scrollToFooter();

        // Step 3: Check the copyright text (Validate ER-1)
        await expect(homePage.footer.copyrightText.first()).toBeVisible();
        const fullText = await homePage.footer.getFullFooterText();
        expect(fullText.replace(/\s+/g, ' ')).toMatch(getExpectedCopyrightPattern());

        const copyrightBox = await homePage.footer.getCopyrightBoundingBox();
        expect(copyrightBox).not.toBeNull();
        expect(copyrightBox!.width).toBeGreaterThan(0);
        expect(copyrightBox!.height).toBeGreaterThan(0);

        // Step 4: Click each applicable Quick Link one at a time (Validate ER-2)
        const links = TEST_DATA.homepage.quickLinks;
        for (const linkItem of links) {
            const linkLoc = homePage.footer.getQuickLinkLocator(linkItem.name);
            await expect(linkLoc).toBeVisible();

            const href = await linkLoc.getAttribute('href');
            expect(href).toContain(linkItem.url);

            const newPage = await homePage.footer.openQuickLink(linkItem.name);
            expect(newPage).not.toBeNull();
            expect(newPage!.url()).not.toContain('about:blank');
            await newPage!.close();
        }
    });
});
