import { Page, Locator, expect } from '@playwright/test';

export class HeroSlider {
    readonly page: Page;
    readonly heroSection: Locator;
    readonly previousButton: Locator;
    readonly nextButton: Locator;
    readonly slideIndicators: Locator;
    readonly heroHeading: Locator;
    readonly heroSubheading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heroSection = page.locator('main').first();
        this.previousButton = page.getByRole('button', { name: 'Previous' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.slideIndicators = page.getByRole('link', { name: /Slide\s+\d+/ });
        this.heroHeading = page.getByText('Welcome to the United School of Tokyo', {
            exact: false,
        });
        this.heroSubheading = page.getByText('International School with a Conscience', {
            exact: false,
        });
    }

    getSlideIndicator(slideNumber: number): Locator {
        return this.page.getByRole('link', { name: `Slide ${slideNumber}` });
    }

    async verifyHeroSectionDisplayedAtTop(): Promise<void> {
        await expect(this.heroSection).toBeVisible();

        const box = await this.heroSection.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.y).toBeLessThan(300);
    }

    async verifyHeroImageLoadedCorrectly(): Promise<void> {
        const heroImages = this.heroSection.locator('img, wix-bg-image, wix-bg-media');
        const count = await heroImages.count();
        expect(count).toBeGreaterThan(0);

        const topImage = heroImages.nth(0);
        await expect(topImage).toBeVisible();

        const imgElement = this.heroSection.locator('img').first();
        if (await imgElement.isVisible()) {
            const loaded = await imgElement.evaluate((el: HTMLImageElement) => {
                return el.complete && (el.naturalWidth > 0 || el.clientWidth > 0);
            });
            expect(loaded).toBe(true);
        }
    }
}
