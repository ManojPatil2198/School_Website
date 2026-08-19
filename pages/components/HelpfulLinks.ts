import { Page, Locator, expect } from '@playwright/test';

export class HelpfulLinks {
    readonly page: Page;
    readonly helpfulLinksHeading: Locator;
    readonly quickLinksHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.helpfulLinksHeading = page.getByText('Helpful Links', { exact: false });
        this.quickLinksHeading = page.getByText('Quick Links', { exact: false });
    }

    async scrollToHelpfulLinksSection(): Promise<void> {
        await this.helpfulLinksHeading.scrollIntoViewIfNeeded();
    }

    async verifyHelpfulLinksSectionVisible(): Promise<void> {
        await expect(this.helpfulLinksHeading).toBeVisible();
    }

    async verifyHelpfulLinksHeadingVisible(): Promise<void> {
        await expect(this.helpfulLinksHeading).toBeVisible();
    }

    getLinkCard(linkName: string): Locator {
        return this.page.getByText(linkName, { exact: true }).last();
    }

    async verifyLinkCardVisible(linkName: string): Promise<void> {
        const linkLocator = this.getLinkCard(linkName);
        await expect(linkLocator).toBeVisible();
    }

    async verifyAllLinkCardsDisplayed(links: readonly string[]): Promise<void> {
        for (const linkName of links) {
            await this.verifyLinkCardVisible(linkName);
        }
    }

    async verifyLinkTextReadable(linkName: string): Promise<void> {
        const linkLocator = this.getLinkCard(linkName);
        await expect(linkLocator).toBeVisible();
        const text = await linkLocator.innerText();
        expect(text.trim().length).toBeGreaterThan(0);

        const box = await linkLocator.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);
    }

    async verifyAllLinksReadable(links: readonly string[]): Promise<void> {
        for (const linkName of links) {
            await this.verifyLinkTextReadable(linkName);
        }
    }

    async verifyNoBrokenOrEmptyCards(links: readonly string[]): Promise<void> {
        expect(links.length).toBeGreaterThan(0);
        for (const linkName of links) {
            const linkLocator = this.getLinkCard(linkName);
            await expect(linkLocator).toBeVisible();

            const text = await linkLocator.innerText();
            expect(text.trim()).toBeTruthy();
            expect(text.toLowerCase()).not.toContain('undefined');
            expect(text.toLowerCase()).not.toContain('null');
        }
    }

    async clickLinkCard(linkName: string): Promise<void> {
        const linkLocator = this.getLinkCard(linkName);
        await linkLocator.scrollIntoViewIfNeeded();
        await linkLocator.click();
    }

    async verifyLinkNavigation(linkName: string): Promise<void> {
        await this.clickLinkCard(linkName);
        await expect(this.page).not.toHaveURL(/about:blank/);
        await expect(this.page).toHaveURL(/.*united-school-of-tok/i);
        await expect(this.page.locator('body')).toBeVisible();
    }
}
