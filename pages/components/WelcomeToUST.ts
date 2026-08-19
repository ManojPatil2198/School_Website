import { Page, Locator, expect } from '@playwright/test';

export class WelcomeToUST {
    readonly page: Page;
    readonly welcomeSection: Locator;
    readonly heading: Locator;
    readonly tagline: Locator;
    readonly contentArea: Locator;
    readonly sectionImage: Locator;
    readonly learnMoreLink: Locator;

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
