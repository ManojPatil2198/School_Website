import { Page, Locator, expect } from '@playwright/test';

export class ImageSection {
    readonly page: Page;
    readonly firstImage: Locator;
    readonly firstImageSection: Locator;
    readonly secondImage: Locator;
    readonly secondImageSection: Locator;

    constructor(page: Page) {
        this.page = page;

        // First image (Girl with green background image in Welcome to UST section)
        this.firstImageSection = page
            .locator('section, div[data-testid="container"]')
            .filter({ hasText: 'Welcome to the United School of Tokyo' })
            .first();

        this.firstImage = page
            .locator('section, div[data-testid="container"]')
            .filter({ hasText: 'Welcome to the United School of Tokyo' })
            .locator('img')
            .or(page.locator('img[src*="wixstatic"]').nth(1))
            .first();

        // Second image (Girl in swimming pool image section)
        this.secondImageSection = page
            .locator('section, div[data-testid="container"]')
            .filter({ has: page.locator('img[src*="efa756035054434e9c4bd10b7129ff13"]') })
            .first()
            .or(page.locator('section, div[data-testid="container"]').nth(3));

        this.secondImage = page
            .locator('img[src*="efa756035054434e9c4bd10b7129ff13"]')
            .or(page.locator('main img, section img').nth(2))
            .first();
    }

    async scrollToFirstImage(): Promise<void> {
        await this.firstImage.scrollIntoViewIfNeeded().catch(() => {});
        await expect(this.firstImage).toBeVisible();
    }

    async verifyFirstImageDisplayed(): Promise<void> {
        await expect(this.firstImage).toBeVisible();
        const box = await this.firstImage.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
        }

        const isLoaded = await this.firstImage.evaluate((el: HTMLImageElement) => {
            return el.complete && el.naturalWidth > 0;
        });
        expect(isLoaded).toBe(true);
    }

    async verifyFirstImageProperties(): Promise<void> {
        const properties = await this.firstImage.evaluate((el: HTMLElement) => {
            const style = window.getComputedStyle(el);
            return {
                objectFit: style.objectFit,
                objectPosition: style.objectPosition,
            };
        });

        expect(['cover', 'contain', 'fill', 'scale-down', 'none']).toContain(properties.objectFit);
        expect(properties.objectPosition).toBeTruthy();
    }

    async scrollToSecondImage(): Promise<void> {
        await this.secondImage.scrollIntoViewIfNeeded().catch(() => {});
        await expect(this.secondImage).toBeVisible();
    }

    async verifySecondImageDisplayed(): Promise<void> {
        await expect(this.secondImage).toBeVisible();
        const box = await this.secondImage.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
        }

        const isLoaded = await this.secondImage.evaluate((el: HTMLImageElement) => {
            return el.complete && el.naturalWidth > 0;
        });
        expect(isLoaded).toBe(true);
    }

    async verifySecondImageProperties(): Promise<void> {
        const properties = await this.secondImage.evaluate((el: HTMLElement) => {
            const style = window.getComputedStyle(el);
            return {
                objectFit: style.objectFit,
                objectPosition: style.objectPosition,
            };
        });

        expect(['cover', 'contain', 'fill', 'scale-down', 'none']).toContain(properties.objectFit);
        expect(properties.objectPosition).toBeTruthy();
    }

    async verifyScrollingBehavior(): Promise<void> {
        await this.scrollToFirstImage();
        const firstBox1 = await this.firstImage.boundingBox();
        expect(firstBox1).not.toBeNull();

        await this.scrollToSecondImage();
        const secondBox1 = await this.secondImage.boundingBox();
        expect(secondBox1).not.toBeNull();

        await this.scrollToFirstImage();
        const firstBox2 = await this.firstImage.boundingBox();
        expect(firstBox2).not.toBeNull();

        expect(firstBox2!.width).toBeCloseTo(firstBox1!.width, 1);
        expect(firstBox2!.height).toBeCloseTo(firstBox1!.height, 1);

        await this.scrollToSecondImage();
        const secondBox2 = await this.secondImage.boundingBox();
        expect(secondBox2).not.toBeNull();
        expect(secondBox2!.width).toBeCloseTo(secondBox1!.width, 1);
        expect(secondBox2!.height).toBeCloseTo(secondBox1!.height, 1);
    }
}
