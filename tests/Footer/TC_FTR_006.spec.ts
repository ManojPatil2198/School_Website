import { test, expect } from '../../fixtures/test-fixtures';
import { getExpectedCopyrightPattern } from '../../utils/test-data';

test.describe('Home Page - Footer', () => {
    test('TC_FTR_006 - Validate Footer in mobile view', async ({ page, homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Refresh the Home page
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        // Step 3: Scroll to the Footer (Validate ER-1)
        await homePage.footer.scrollToFooter();
        await expect(homePage.footer.footerContainer).toBeVisible();

        // Step 4: Check all Footer sections and links (Validate ER-2)
        const box = await homePage.footer.getFooterBoundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);

        await expect(homePage.footer.esCampusHeading.first()).toBeVisible();
        await expect(homePage.footer.esCampusAddressText.first()).toBeVisible();
        await expect(homePage.footer.esCampusPhoneText.first()).toBeVisible();
        await expect(homePage.footer.esCampusEmailLink.first()).toBeVisible();

        await expect(homePage.footer.msCampusHeading.first()).toBeVisible();
        await expect(homePage.footer.msCampusAddressText.first()).toBeVisible();
        await expect(homePage.footer.msCampusPhoneText.first()).toBeVisible();

        await expect(homePage.footer.quickLinksHeading.first()).toBeVisible();
        await expect(homePage.footer.facebookLink).toBeVisible();
        await expect(homePage.footer.instagramLink).toBeVisible();
        await expect(homePage.footer.youtubeLink).toBeVisible();
        await expect(homePage.footer.edsbyLink).toBeVisible();

        await expect(homePage.footer.copyrightText.first()).toBeVisible();
        const fullText = await homePage.footer.getFullFooterText();
        expect(fullText.replace(/\s+/g, ' ')).toMatch(getExpectedCopyrightPattern());
    });
});
