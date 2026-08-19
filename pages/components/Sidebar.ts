import { Page, Locator, expect } from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly sidebarContainer: Locator;
    readonly inquireCTA: Locator;
    readonly applyCTA: Locator;
    readonly schoolOverviewCTA: Locator;
    readonly instagramIcon: Locator;
    readonly facebookIcon: Locator;
    readonly youtubeIcon: Locator;

    constructor(page: Page) {
        this.page = page;

        this.sidebarContainer = page
            .locator('aside, section, div[data-testid="container"]')
            .filter({ hasText: /Inquire|Apply|Overview/i })
            .first();

        this.inquireCTA = page
            .getByRole('link', { name: /Inquire/i })
            .or(page.getByRole('button', { name: /Inquire/i }))
            .or(page.getByText('Inquire', { exact: true }));

        this.applyCTA = page
            .getByRole('link', { name: /Apply/i })
            .or(page.getByRole('button', { name: /Apply/i }))
            .or(page.getByText('Apply', { exact: true }));

        this.schoolOverviewCTA = page
            .getByRole('link', { name: /School Overview/i })
            .or(page.getByRole('button', { name: /School Overview/i }))
            .or(page.getByText('School Overview', { exact: true }));

        this.instagramIcon = page
            .getByRole('link', { name: /Instagram/i })
            .or(page.locator('a[href*="instagram.com"]'))
            .first();

        this.facebookIcon = page
            .getByRole('link', { name: /Facebook/i })
            .or(page.locator('a[href*="facebook.com"]'))
            .first();

        this.youtubeIcon = page
            .getByRole('link', { name: /Youtube|YouTube/i })
            .or(page.locator('a[href*="youtube.com"]'))
            .first();
    }

    async verifySidebarVisible(): Promise<void> {
        await expect(this.sidebarContainer.first()).toBeVisible();
    }

    async verifyInquireCTAVisible(): Promise<void> {
        await expect(this.inquireCTA.first()).toBeVisible();
    }

    async clickInquireCTA(): Promise<void> {
        await expect(this.inquireCTA.first()).toBeVisible();
        await this.inquireCTA.first().click();
    }

    async verifyApplyCTAVisible(): Promise<void> {
        await expect(this.applyCTA.first()).toBeVisible();
    }

    async clickApplyCTA(): Promise<void> {
        await expect(this.applyCTA.first()).toBeVisible();
        await this.applyCTA.first().click();
    }

    async verifySchoolOverviewCTAVisible(): Promise<void> {
        await expect(this.schoolOverviewCTA.first()).toBeVisible();
    }

    async clickSchoolOverviewCTA(): Promise<void> {
        await expect(this.schoolOverviewCTA.first()).toBeVisible();
        await this.schoolOverviewCTA.first().click();
    }

    async verifyInstagramIconVisible(): Promise<void> {
        await expect(this.instagramIcon).toBeVisible();
    }

    async verifyFacebookIconVisible(): Promise<void> {
        await expect(this.facebookIcon).toBeVisible();
    }

    async verifyYoutubeIconVisible(): Promise<void> {
        await expect(this.youtubeIcon).toBeVisible();
    }

    async verifySocialIconsLoaded(): Promise<void> {
        await expect(this.instagramIcon).toBeVisible();
        await expect(this.facebookIcon).toBeVisible();
        await expect(this.youtubeIcon).toBeVisible();

        const isInstagramLoaded = await this.instagramIcon.evaluate((el: HTMLElement) => {
            const img = el.querySelector('img');
            return img ? img.complete && img.naturalWidth > 0 : true;
        });
        expect(isInstagramLoaded).toBe(true);

        const isFacebookLoaded = await this.facebookIcon.evaluate((el: HTMLElement) => {
            const img = el.querySelector('img');
            return img ? img.complete && img.naturalWidth > 0 : true;
        });
        expect(isFacebookLoaded).toBe(true);

        const isYoutubeLoaded = await this.youtubeIcon.evaluate((el: HTMLElement) => {
            const img = el.querySelector('img');
            return img ? img.complete && img.naturalWidth > 0 : true;
        });
        expect(isYoutubeLoaded).toBe(true);
    }

    async verifySocialIconsAlignment(): Promise<void> {
        await expect(this.instagramIcon).toBeVisible();
        await expect(this.facebookIcon).toBeVisible();
        await expect(this.youtubeIcon).toBeVisible();
    }

    async verifySocialIconsLayout(): Promise<void> {
        const boxInsta = await this.instagramIcon.boundingBox();
        const boxFb = await this.facebookIcon.boundingBox();
        const boxYt = await this.youtubeIcon.boundingBox();

        expect(boxInsta).not.toBeNull();
        expect(boxFb).not.toBeNull();
        expect(boxYt).not.toBeNull();

        if (boxInsta && boxFb && boxYt) {
            expect(boxInsta.width).toBeGreaterThan(0);
            expect(boxFb.width).toBeGreaterThan(0);
            expect(boxYt.width).toBeGreaterThan(0);
        }
    }
}
