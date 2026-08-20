import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Footer', { tag: ['@regression'] }, () => {
    test('TC_FTR_004 - Validate Footer Quick Links', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Scroll to the Footer
        await homePage.footer.scrollToFooter();

        // Step 3: Check 'Quick Links' section (Validate ER-1)
        await expect(homePage.footer.quickLinksHeading).toBeVisible();
        await expect(homePage.footer.facebookLink).toBeVisible();
        await expect(homePage.footer.instagramLink).toBeVisible();
        await expect(homePage.footer.youtubeLink).toBeVisible();
        await expect(homePage.footer.edsbyLink).toBeVisible();

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
