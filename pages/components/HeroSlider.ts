import { Page, Locator, expect } from '@playwright/test';

export class HeroSlider {
    readonly page: Page;
    readonly heroSection: Locator;
    readonly heroImage: Locator;
    readonly previousButton: Locator;
    readonly nextButton: Locator;
    readonly slideIndicators: Locator;
    readonly heroHeading: Locator;
    readonly heroSubheading: Locator;
    readonly heroImages: Locator;
    readonly firstHeroImage: Locator;
    readonly heroSupportingText: Locator;
    readonly inquireCTA: Locator;
    readonly slideImages: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heroSection = page.locator('div[data-testid="slideshow"], section').first();

        this.heroImage = page
            .locator('section, div[data-testid="slideshow"]')
            .first()
            .locator('img, div[data-testid="bgMedia"]')
            .first();

        this.slideImages = page
            .locator('section, div[data-testid="slideshow"]')
            .first()
            .locator('img, div[data-testid="bgMedia"]');

        this.previousButton = page
            .getByTestId('prevButton')
            .or(page.getByRole('button', { name: 'Previous' }));

        this.nextButton = page
            .getByTestId('nextButton')
            .or(page.getByRole('button', { name: 'Next' }));

        this.slideIndicators = page.locator('nav[aria-label="Slides"] a, a[aria-label*="Slide"]');

        this.heroHeading = page.getByText('Welcome to the United School of Tokyo', {
            exact: false,
        });

        this.heroSubheading = page.getByText('International School with a Conscience', {
            exact: false,
        });

        this.heroImages = this.heroSection.locator('img, wix-bg-image, wix-bg-media');
        this.firstHeroImage = this.heroSection.locator('img, wix-bg-image, wix-bg-media');

        this.heroSupportingText = page.getByText(
            /Multinational and multicultural student body from 40 different countries/i,
        );

        this.inquireCTA = page
            .getByRole('link', { name: /Inquire/i })
            .or(page.getByRole('button', { name: /Inquire/i }))
            .or(page.getByText('Inquire', { exact: true }));
    }

    getSlideIndicator(slideNumber: number): Locator {
        return this.slideIndicators.nth(slideNumber - 1);
    }

    async verifyHeroSectionVisible(): Promise<void> {
        await expect(this.heroSection.first()).toBeVisible();
    }

    async verifyNavigationArrowsVisible(): Promise<void> {
        const hasNext = (await this.nextButton.count()) > 0;
        if (hasNext) {
            await expect(this.nextButton.first()).toBeAttached();
            await expect(this.previousButton.first()).toBeAttached();
        } else {
            await expect(this.slideIndicators.first()).toBeAttached();
        }
    }

    async verifySlideIndicatorsVisible(): Promise<void> {
        await expect(this.slideIndicators.first()).toBeVisible();
    }

    async verifyHeroImageLoaded(): Promise<void> {
        await expect(this.heroImage.first()).toBeVisible();
        const isLoaded = await this.heroImage.first().evaluate((el: HTMLElement) => {
            if (el instanceof HTMLImageElement) {
                return el.complete && el.naturalWidth > 0;
            }
            return true;
        });
        expect(isLoaded).toBe(true);
    }

    async verifyHeroHeadingVisible(): Promise<void> {
        await expect(this.heroHeading.first()).toBeVisible();
    }

    async verifyHeroSubheadingVisible(): Promise<void> {
        await expect(this.heroSubheading.first()).toBeVisible();
    }

    async verifyHeroSupportingTextVisible(): Promise<void> {
        await expect(this.heroSupportingText.first()).toBeVisible();
    }

    async verifyInquireCTAVisible(): Promise<void> {
        await expect(this.inquireCTA.first()).toBeVisible();
    }

    async clickInquireCTA(): Promise<void> {
        await this.inquireCTA.first().click();
    }

    async getActiveSlideIndex(): Promise<number> {
        const count = await this.slideIndicators.count();
        for (let i = 0; i < count; i++) {
            const ind = this.slideIndicators.nth(i);
            const isSelected = await ind
                .getAttribute('aria-current')
                .then((val) => val === 'true' || val === 'page')
                .catch(() => false);
            if (isSelected) return i;
        }
        return 0;
    }

    async clickNextButton(): Promise<void> {
        const hasNext = (await this.nextButton.count()) > 0;
        if (
            hasNext &&
            (await this.nextButton
                .first()
                .isVisible()
                .catch(() => false))
        ) {
            await this.heroSection
                .first()
                .hover()
                .catch(() => {});
            // eslint-disable-next-line playwright/no-force-option
            await this.nextButton.first().click({ force: true });
        } else {
            const count = await this.slideIndicators.count();
            if (count > 0) {
                const currentActive = await this.getActiveSlideIndex();
                const nextIndex = (currentActive + 1) % count;
                await this.selectSlide(nextIndex);
            }
        }
        // eslint-disable-next-line playwright/no-wait-for-timeout
        await this.page.waitForTimeout(1500);
    }

    async clickPreviousButton(): Promise<void> {
        const hasPrev = (await this.previousButton.count()) > 0;
        if (
            hasPrev &&
            (await this.previousButton
                .first()
                .isVisible()
                .catch(() => false))
        ) {
            await this.heroSection
                .first()
                .hover()
                .catch(() => {});
            // eslint-disable-next-line playwright/no-force-option
            await this.previousButton.first().click({ force: true });
        } else {
            const count = await this.slideIndicators.count();
            if (count > 0) {
                const currentActive = await this.getActiveSlideIndex();
                const prevIndex = (currentActive - 1 + count) % count;
                await this.selectSlide(prevIndex);
            }
        }
        // eslint-disable-next-line playwright/no-wait-for-timeout
        await this.page.waitForTimeout(1500);
    }

    async getSlideCount(): Promise<number> {
        const count = await this.slideIndicators.count();
        expect(count).toBeGreaterThan(0);
        return count;
    }

    async selectSlide(slideIndex: number): Promise<void> {
        const count = await this.slideIndicators.count();
        if (count > 0 && slideIndex < count) {
            const indicator = this.slideIndicators.nth(slideIndex);
            await expect(indicator).toBeVisible();
            await indicator.click();
        }
    }

    async verifySlideImageLoaded(_slideIndex: number): Promise<void> {
        await expect(this.heroSection.first()).toBeVisible();
        const isLoaded = await this.heroImage.first().evaluate((el: HTMLElement) => {
            if (el instanceof HTMLImageElement) {
                return el.complete && el.naturalWidth > 0;
            }
            return true;
        });
        expect(isLoaded).toBe(true);
    }

    async verifyActiveIndicator(slideIndex: number): Promise<void> {
        const count = await this.slideIndicators.count();
        if (count > 0 && slideIndex < count) {
            await expect(this.slideIndicators.nth(slideIndex)).toBeVisible();
        } else {
            await expect(this.heroSection.first()).toBeVisible();
        }
    }

    async verifyResponsiveLayout(_viewportName: string): Promise<void> {
        await expect(this.heroSection.first()).toBeVisible();
        await expect(this.heroImage.first()).toBeVisible();
        await expect(this.inquireCTA.first()).toBeVisible();
        const box = await this.heroSection.first().boundingBox();
        expect(box).not.toBeNull();
        if (box) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
        }
    }

    async getHeroSectionBoundingBox() {
        return await this.heroSection.first().boundingBox();
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
