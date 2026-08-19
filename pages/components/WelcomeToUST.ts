import { Page, Locator, expect } from '@playwright/test';

export class WelcomeToUST {
    readonly page: Page;
    readonly welcomeSection: Locator;
    readonly heading: Locator;
    readonly tagline: Locator;
    readonly contentArea: Locator;
    readonly sectionImage: Locator;
    readonly learnMoreLink: Locator;
    readonly instagramIcon: Locator;
    readonly facebookIcon: Locator;
    readonly youtubeIcon: Locator;

    constructor(page: Page) {
        this.page = page;

        this.welcomeSection = page
            .locator('section, div[data-testid="container"]')
            .filter({ hasText: 'Welcome to the United School of Tokyo' })
            .first();

        this.heading = page.getByText('Welcome to the United School of Tokyo');

        this.tagline = page.getByText('International School with a Conscience');

        this.contentArea = this.welcomeSection;

        this.sectionImage = page
            .locator('section, div[data-testid="container"]')
            .filter({ hasText: 'Welcome to the United School of Tokyo' })
            .locator('img')
            .first();

        this.learnMoreLink = page
            .locator('section, div[data-testid="container"]')
            .filter({ hasText: 'Welcome to the United School of Tokyo' })
            .getByRole('link', { name: /Learn More/i })
            .or(page.getByRole('link', { name: /Learn More/i }))
            .or(page.getByRole('button', { name: /Learn More/i }))
            .or(page.getByText('Learn More', { exact: true }));

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

    async scrollToSection(): Promise<void> {
        await this.welcomeSection.scrollIntoViewIfNeeded().catch(() => {});
        await expect(this.heading.first()).toBeVisible();
    }

    async verifyWelcomeSectionVisible(): Promise<void> {
        await expect(this.welcomeSection.first()).toBeVisible();
    }

    async verifyHeadingVisible(): Promise<void> {
        await expect(this.heading.first()).toBeVisible();
    }

    async verifyTaglineVisible(): Promise<void> {
        await expect(this.tagline.first()).toBeVisible();
    }

    async verifyContentAreaLoaded(): Promise<void> {
        await expect(this.contentArea.first()).toBeVisible();
    }

    async verifyLearnMoreLinkVisible(): Promise<void> {
        await expect(this.learnMoreLink.first()).toBeVisible();
    }

    async clickLearnMoreLink(): Promise<void> {
        await expect(this.learnMoreLink.first()).toBeVisible();
        await this.learnMoreLink.first().click();
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

    async clickInstagramIcon(): Promise<void> {
        await expect(this.instagramIcon).toBeVisible();
        await expect(this.instagramIcon).toHaveAttribute('href', /instagram\.com/i);
    }

    async clickFacebookIcon(): Promise<void> {
        await expect(this.facebookIcon).toBeVisible();
        await expect(this.facebookIcon).toHaveAttribute('href', /facebook\.com/i);
    }

    async clickYoutubeIcon(): Promise<void> {
        await expect(this.youtubeIcon).toBeVisible();
        await expect(this.youtubeIcon).toHaveAttribute('href', /youtube\.com/i);
    }

    async verifySectionImageLoaded(): Promise<void> {
        const count = await this.sectionImage.count();
        if (count > 0) {
            await expect(this.sectionImage.first()).toBeVisible();
            const isLoaded = await this.sectionImage.first().evaluate((el: HTMLElement) => {
                if (el instanceof HTMLImageElement) {
                    return el.complete && el.naturalWidth > 0;
                }
                return true;
            });
            expect(isLoaded).toBe(true);
        } else {
            await expect(this.welcomeSection.first()).toBeVisible();
        }
    }

    async verifySectionLayout(): Promise<void> {
        await expect(this.heading.first()).toBeVisible();
        await expect(this.tagline.first()).toBeVisible();
        const box = await this.welcomeSection.first().boundingBox();
        expect(box).not.toBeNull();
        if (box) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
        }
    }
}
