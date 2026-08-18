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

        this.heroSection = page
            .locator('section')
            .filter({
                hasText: 'Welcome to the United School of Tokyo',
            })
            .first();

        this.previousButton = page.getByRole('button', {
            name: 'Previous',
        });

        this.nextButton = page.getByRole('button', {
            name: 'Next',
        });

        this.slideIndicators = page.getByRole('link', {
            name: /Slide\s+\d+/,
        });

        this.heroHeading = page.getByText('Welcome to the United School of Tokyo');

        this.heroSubheading = page.getByText('International School with a Conscience');
    }

    getSlideIndicator(slideNumber: number): Locator {
        return this.page.getByRole('link', {
            name: `Slide ${slideNumber}`,
        });
    }

    async verifyHeroSectionVisible(): Promise<void> {
        await expect(this.heroSection).toBeVisible();
    }

    async verifySlideIndicatorsVisible(): Promise<void> {
        await expect(this.slideIndicators.first()).toBeVisible();
    }
}
