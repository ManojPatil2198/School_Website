import { Page, Locator } from '@playwright/test';

export interface WhyChooseUstFeatureData {
    readonly heading: string;
    readonly description: string;
}

export class WhyUST {
    readonly page: Page;
    readonly whyUstSection: Locator;
    readonly whyUstHeading: Locator;
    readonly visualAssets: Locator;
    readonly visualImages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whyUstSection = page.locator('main').first();
        this.whyUstHeading = page
            .locator('main')
            .getByRole('heading', { name: /Why UST|Why Choose UST|United School/i })
            .or(page.getByText('Why choose UST', { exact: false }))
            .first();
        this.visualAssets = this.whyUstSection.locator('img, svg, wix-bg-image');
        this.visualImages = this.whyUstSection.locator('img');
    }

    async scrollToWhyChooseUstSection(): Promise<void> {
        await this.whyUstSection.scrollIntoViewIfNeeded();
    }

    getFeatureHeading(featureName: string): Locator {
        return this.page.getByText(featureName, { exact: false });
    }

    getFeatureDescription(descriptionText: string): Locator {
        return this.page.getByText(descriptionText, { exact: false });
    }

    async getSectionBoundingBox() {
        return await this.whyUstSection.boundingBox();
    }

    async getHeadingBoundingBox() {
        return await this.whyUstHeading.boundingBox();
    }

    async getFeatureHeadingBoundingBox(featureName: string) {
        return await this.getFeatureHeading(featureName).first().boundingBox();
    }

    async getFeatureDescriptionBoundingBox(descriptionText: string) {
        return await this.getFeatureDescription(descriptionText).first().boundingBox();
    }

    async getVisualAssetsCount(): Promise<number> {
        return await this.visualAssets.count();
    }

    async getVisualImagesCount(): Promise<number> {
        return await this.visualImages.count();
    }

    async checkImagesLoadedStatus(): Promise<boolean[]> {
        const count = await this.visualImages.count();
        const results: boolean[] = [];
        for (let i = 0; i < count; i++) {
            const img = this.visualImages.nth(i);
            if (await img.isVisible().catch(() => false)) {
                await img.scrollIntoViewIfNeeded().catch(() => {});
                const loaded = await img
                    .evaluate(async (el: HTMLImageElement) => {
                        if (!el.complete) {
                            await new Promise((resolve) => {
                                el.onload = resolve;
                                el.onerror = resolve;
                                setTimeout(resolve, 1000);
                            });
                        }
                        return (
                            el.complete &&
                            (el.naturalWidth > 0 ||
                                el.clientWidth > 0 ||
                                el.getBoundingClientRect().width > 0 ||
                                Boolean(el.currentSrc || el.src))
                        );
                    })
                    .catch(() => false);
                results.push(loaded);
            }
        }
        return results;
    }

    async checkHorizontalOverflow(): Promise<boolean> {
        return await this.page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
        });
    }
}
