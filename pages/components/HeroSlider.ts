import { Page, Locator } from '@playwright/test';

export class HeroSlider {
    readonly page: Page;
    readonly heroSection: Locator;
    readonly previousButton: Locator;
    readonly nextButton: Locator;
    readonly slideIndicators: Locator;
    readonly heroHeading: Locator;
    readonly heroSubheading: Locator;
    readonly heroImages: Locator;
    readonly firstHeroImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heroSection = page.locator('main');
        this.previousButton = page.getByRole('button', { name: 'Previous' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.slideIndicators = page.getByRole('link', { name: /Slide\s+\d+/ });
        this.heroHeading = page.getByText('Welcome to the United School of Tokyo', {
            exact: false,
        });
        this.heroSubheading = page.getByText('International School with a Conscience', {
            exact: false,
        });
        this.heroImages = this.heroSection.locator('img, wix-bg-image, wix-bg-media');
        this.firstHeroImage = this.heroSection.locator('img, wix-bg-image, wix-bg-media');
    }

    getSlideIndicator(slideNumber: number): Locator {
        return this.page.getByRole('link', { name: `Slide ${slideNumber}` });
    }

    async getHeroSectionBoundingBox() {
        return await this.heroSection.boundingBox();
    }

    async getHeroImagesCount(): Promise<number> {
        return await this.heroImages.count();
    }

    async isHeroImageLoaded(): Promise<boolean> {
        const imgElement = this.heroSection.locator('img');
        if ((await imgElement.count()) > 0 && (await imgElement.first().isVisible())) {
            return await imgElement.first().evaluate((el: HTMLImageElement) => {
                return el.complete && (el.naturalWidth > 0 || el.clientWidth > 0);
            });
        }
        return true;
    }
}
