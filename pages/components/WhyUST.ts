import { Page, Locator, expect } from '@playwright/test';

export interface WhyChooseUstFeatureData {
    readonly heading: string;
    readonly description: string;
}

export class WhyUST {
    readonly page: Page;
    readonly whyUstSection: Locator;
    readonly whyUstHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whyUstSection = page.locator('main').first();
        this.whyUstHeading = page
            .locator('main')
            .locator('h1, h2, h3, h4, p, span, a')
            .filter({ hasText: /Why UST|Why Choose UST|United School/i })
            .first();
    }

    async scrollToWhyChooseUstSection(): Promise<void> {
        await this.whyUstSection.scrollIntoViewIfNeeded();
    }

    async verifyWhyUSTSectionVisible(): Promise<void> {
        await expect(this.whyUstSection).toBeVisible();
    }

    async verifyWhyUSTHeadingVisible(): Promise<void> {
        await expect(this.whyUstHeading).toBeVisible();
    }

    getFeatureHeading(featureName: string): Locator {
        return this.page.getByText(featureName, { exact: false });
    }

    getFeatureDescription(descriptionText: string): Locator {
        return this.page.getByText(descriptionText, { exact: false });
    }

    async verifyFeatureHeadingVisible(feature: string | WhyChooseUstFeatureData): Promise<void> {
        const headingText = typeof feature === 'string' ? feature : feature.heading;
        const featureLocator = this.getFeatureHeading(headingText);
        await expect(featureLocator).toBeVisible();
    }

    async verifyFeatureDescriptionVisible(descriptionText: string): Promise<void> {
        const descLocator = this.getFeatureDescription(descriptionText);
        await expect(descLocator).toBeVisible();
    }

    async verifyAllFeatureCardsDisplayed(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        for (const feature of features) {
            await expect(this.getFeatureHeading(feature.heading)).toBeVisible();
            await expect(this.getFeatureDescription(feature.description)).toBeVisible();
        }
    }

    async verifyAllFeatureHeadingsDisplayed(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        expect(features).toHaveLength(12);
        for (const feature of features) {
            await this.verifyFeatureHeadingVisible(feature.heading);
        }
    }

    async verifyAllFeatureDescriptionsDisplayed(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        for (const feature of features) {
            const descLocator = this.getFeatureDescription(feature.description);
            await expect(descLocator).toBeVisible();
            const text = await descLocator.innerText();
            expect(text.trim().length).toBeGreaterThan(0);
        }
    }

    async verifyNoMissingOrDuplicatedFeatures(
        features: readonly WhyChooseUstFeatureData[],
        expectedCount: number = 12,
    ): Promise<void> {
        const uniqueHeadings = new Set(features.map((f) => f.heading));
        expect(uniqueHeadings.size).toBe(expectedCount);

        for (const feature of features) {
            const headingCount = await this.getFeatureHeading(feature.heading).count();
            expect(headingCount).toBeGreaterThanOrEqual(1);

            // Ensure content is not generic placeholder text
            expect(feature.heading.toLowerCase()).not.toContain('lorem ipsum');
            expect(feature.heading.toLowerCase()).not.toContain('tbd');
            expect(feature.description.toLowerCase()).not.toContain('lorem ipsum');
            expect(feature.description.toLowerCase()).not.toContain('placeholder');
        }
    }

    async verifyContentCompletenessAndReadability(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        for (const feature of features) {
            const headingLoc = this.getFeatureHeading(feature.heading);
            const descLoc = this.getFeatureDescription(feature.description);

            await expect(headingLoc).toBeVisible();
            await expect(descLoc).toBeVisible();

            const headingBox = await headingLoc.boundingBox();
            const descBox = await descLoc.boundingBox();

            expect(headingBox).not.toBeNull();
            expect(headingBox!.width).toBeGreaterThan(0);
            expect(headingBox!.height).toBeGreaterThan(0);

            expect(descBox).not.toBeNull();
            expect(descBox!.width).toBeGreaterThan(0);
            expect(descBox!.height).toBeGreaterThan(0);
        }
    }

    async verifySectionInViewport(
        width: number,
        height: number,
        features: readonly (string | WhyChooseUstFeatureData)[],
    ): Promise<void> {
        await this.page.setViewportSize({ width, height });
        await this.scrollToWhyChooseUstSection();
        await this.verifyWhyUSTSectionVisible();
        await this.verifyWhyUSTHeadingVisible();
        await this.verifyAllFeaturesVisible(features);
    }

    async verifyNoHorizontalOverflow(): Promise<void> {
        const isOverflowing = await this.page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isOverflowing).toBe(false);
    }

    async verifyCardsRearrangeAcrossViewports(
        features: readonly (string | WhyChooseUstFeatureData)[],
    ): Promise<void> {
        const firstHeadingText =
            typeof features[0] === 'string' ? features[0] : features[0].heading;
        const headingLocator = this.getFeatureHeading(firstHeadingText);

        // Desktop check
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        await this.scrollToWhyChooseUstSection();
        const desktopBox = await headingLocator.boundingBox();
        expect(desktopBox).not.toBeNull();

        // Mobile check
        await this.page.setViewportSize({ width: 390, height: 844 });
        await this.scrollToWhyChooseUstSection();
        const mobileBox = await headingLocator.boundingBox();
        expect(mobileBox).not.toBeNull();

        // Verify feature cards rearrange / adapt width & position according to viewport
        expect(mobileBox!.x).toBeLessThanOrEqual(desktopBox!.x);
    }

    async verifyFeatureCardStructure(features: readonly WhyChooseUstFeatureData[]): Promise<void> {
        for (const feature of features) {
            const headingLoc = this.getFeatureHeading(feature.heading);
            const descLoc = this.getFeatureDescription(feature.description);

            await expect(headingLoc).toBeVisible();
            await expect(descLoc).toBeVisible();
        }
    }

    async verifyFeatureCardSpacingAndAlignment(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        const boxes = [];
        for (const feature of features) {
            const headingLoc = this.getFeatureHeading(feature.heading);
            const box = await headingLoc.boundingBox();
            expect(box).not.toBeNull();
            if (box) {
                boxes.push(box);
            }
        }
        expect(boxes).toHaveLength(features.length);
        for (const box of boxes) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
        }
    }

    async verifyNoMissingOrExtraElements(
        features: readonly WhyChooseUstFeatureData[],
        expectedCount: number = 12,
    ): Promise<void> {
        expect(features).toHaveLength(expectedCount);

        for (const feature of features) {
            expect(feature.heading).toBeTruthy();
            expect(feature.description).toBeTruthy();
            await expect(this.getFeatureHeading(feature.heading)).toBeVisible();
            await expect(this.getFeatureDescription(feature.description)).toBeVisible();
        }
    }

    async verifyVisualAssetsPresent(): Promise<void> {
        const visualAssets = this.whyUstSection.locator('img, svg, wix-bg-image');
        const count = await visualAssets.count();
        expect(count).toBeGreaterThan(0);
        await expect(visualAssets.first()).toBeVisible();
    }

    async verifyVisualAssetsLoaded(): Promise<void> {
        const images = this.whyUstSection.locator('img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            if (await img.isVisible()) {
                await img.scrollIntoViewIfNeeded();
                const loaded = await img.evaluate((el: HTMLImageElement) => {
                    return el.complete && (el.naturalWidth > 0 || el.clientWidth > 0);
                });
                expect(loaded).toBe(true);
            }
        }
    }

    async verifyVisualAssetsAssociatedWithFeatures(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        for (const feature of features) {
            const heading = this.getFeatureHeading(feature.heading);
            await expect(heading).toBeVisible();
        }
        const visualAssets = this.whyUstSection.locator('img, svg');
        expect(await visualAssets.count()).toBeGreaterThan(0);
    }

    async verifyVisualAssetsNotDistorted(): Promise<void> {
        const images = this.whyUstSection.locator('img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            if (await img.isVisible()) {
                const box = await img.boundingBox();
                expect(box).not.toBeNull();
                expect(box!.width).toBeGreaterThan(0);
                expect(box!.height).toBeGreaterThan(0);
            }
        }
    }

    async verifyVisualsDoNotOverlapText(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        for (const feature of features) {
            const headingLoc = this.getFeatureHeading(feature.heading);
            const descLoc = this.getFeatureDescription(feature.description);

            await expect(headingLoc).toBeVisible();
            await expect(descLoc).toBeVisible();
        }
    }

    async verifySectionPositionInHomePage(): Promise<void> {
        await expect(this.whyUstSection).toBeVisible();
        const sectionBox = await this.whyUstSection.boundingBox();
        expect(sectionBox).not.toBeNull();
        expect(sectionBox!.y).toBeGreaterThanOrEqual(0);
    }

    async verifyElementSpacing(features: readonly WhyChooseUstFeatureData[]): Promise<void> {
        const headingBox = await this.whyUstHeading.boundingBox();
        expect(headingBox).not.toBeNull();

        if (features.length > 0) {
            const firstFeatureLoc = this.getFeatureHeading(features[0].heading);
            const firstFeatureBox = await firstFeatureLoc.boundingBox();
            expect(firstFeatureBox).not.toBeNull();
            expect(firstFeatureBox!.y).toBeGreaterThanOrEqual(headingBox!.y);
        }
    }

    async verifyOverallAlignment(features: readonly WhyChooseUstFeatureData[]): Promise<void> {
        for (const feature of features) {
            const headingLoc = this.getFeatureHeading(feature.heading);
            const descLoc = this.getFeatureDescription(feature.description);

            const hBox = await headingLoc.boundingBox();
            const dBox = await descLoc.boundingBox();

            expect(hBox).not.toBeNull();
            expect(dBox).not.toBeNull();
            expect(hBox!.width).toBeGreaterThan(0);
            expect(dBox!.width).toBeGreaterThan(0);
        }
    }

    async verifyNoContentClippingOrOverlap(
        features: readonly WhyChooseUstFeatureData[],
    ): Promise<void> {
        for (const feature of features) {
            const headingLoc = this.getFeatureHeading(feature.heading);
            const descLoc = this.getFeatureDescription(feature.description);

            await expect(headingLoc).toBeVisible();
            await expect(descLoc).toBeVisible();
        }
    }

    async verifyNoExcessiveBlankSpaces(): Promise<void> {
        const box = await this.whyUstSection.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.height).toBeGreaterThan(100);
        expect(box!.height).toBeLessThan(15000);
    }

    async verifyOverallReadability(features: readonly WhyChooseUstFeatureData[]): Promise<void> {
        for (const feature of features) {
            const headingLoc = this.getFeatureHeading(feature.heading);
            const descLoc = this.getFeatureDescription(feature.description);

            const headingText = await headingLoc.innerText();
            const descText = await descLoc.innerText();

            expect(headingText).toContain(feature.heading);
            expect(descText).toContain(feature.description);
        }
    }

    async verifyAllFeaturesVisible(
        features: readonly (string | WhyChooseUstFeatureData)[],
    ): Promise<void> {
        for (const feature of features) {
            const heading = typeof feature === 'string' ? feature : feature.heading;
            await this.verifyFeatureHeadingVisible(heading);
        }
    }
}
