import { Page, Locator, expect } from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly sidebarContainer: Locator;
    readonly inquireCTA: Locator;

    constructor(page: Page) {
        this.page = page;

        this.sidebarContainer = page
            .locator('aside, section, div[data-testid="container"]')
            .filter({ hasText: /Inquire|Apply|Overview/i })
            .first();

        this.inquireCTA = page
            .getByRole('link', { name: /Inquire/i })
            .or(page.getByRole('button', { name: /Inquire/i }))
            .or(page.getByText('Inquire', { exact: true }));
    }

    async verifySidebarVisible(): Promise<void> {
        await expect(this.sidebarContainer.first()).toBeVisible();
    }

    async verifyInquireCTAVisible(): Promise<void> {
        await expect(this.inquireCTA.first()).toBeVisible();
    }

    async clickInquireCTA(): Promise<void> {
        await expect(this.inquireCTA.first()).toBeVisible();
        await this.inquireCTA.first().click();
    }
}
