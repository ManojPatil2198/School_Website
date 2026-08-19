import { Page, Locator, expect } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly headerContainer: Locator;
    readonly logoLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerContainer = page.locator('header, #SITE_HEADER').first();
        this.logoLink = page
            .locator('header img, #SITE_HEADER img, img[alt*="logo"], a[href*="home"] img')
            .first();
    }

    async verifyHeaderVisible(): Promise<void> {
        await expect(this.headerContainer).toBeVisible();
    }

    async verifyLogoVisible(): Promise<void> {
        await expect(this.logoLink).toBeVisible();
    }

    async verifyLogoImageLoaded(): Promise<void> {
        await expect(this.logoLink).toBeVisible();
        const isLoaded = await this.logoLink.evaluate((el: HTMLElement) => {
            if (el instanceof HTMLImageElement) {
                return el.complete && el.naturalWidth > 0;
            }
            return true;
        });
        expect(isLoaded).toBe(true);
    }

    async verifyLogoAlignment(): Promise<void> {
        await expect(this.logoLink).toBeVisible();
        const box = await this.logoLink.boundingBox();
        expect(box).not.toBeNull();
    }

    async verifyLogoLayout(): Promise<void> {
        await expect(this.logoLink).toBeVisible();
        const box = await this.logoLink.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
        }
    }

    async clickLogo(): Promise<void> {
        await expect(this.logoLink).toBeVisible();
        await this.logoLink.click();
    }
}
