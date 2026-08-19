import { Page, Locator } from '@playwright/test';

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

    getLinkCard(linkName: string): Locator {
        return this.page.getByText(linkName, { exact: true }).last();
    }

    async getLinkCardText(linkName: string): Promise<string> {
        const linkLocator = this.getLinkCard(linkName);
        return await linkLocator.innerText();
    }

    async getLinkCardBoundingBox(linkName: string) {
        const linkLocator = this.getLinkCard(linkName);
        return await linkLocator.boundingBox();
    }

    async clickLinkCard(linkName: string): Promise<void> {
        const linkLocator = this.getLinkCard(linkName);
        await linkLocator.scrollIntoViewIfNeeded();
        await linkLocator.click();
    }
}
