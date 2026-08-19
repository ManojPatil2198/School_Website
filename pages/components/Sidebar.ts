import { Page, Locator, expect } from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly sidebarContainer: Locator;
    readonly inquireCTA: Locator;
    readonly applyCTA: Locator;
    readonly schoolOverviewCTA: Locator;

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

        this.applyCTA = page
            .getByRole('link', { name: /Apply/i })
            .or(page.getByRole('button', { name: /Apply/i }))
            .or(page.getByText('Apply', { exact: true }));

        this.schoolOverviewCTA = page
            .getByRole('link', { name: /School Overview/i })
            .or(page.getByRole('button', { name: /School Overview/i }))
            .or(page.getByText('School Overview', { exact: true }));
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

    async verifyApplyCTAVisible(): Promise<void> {
        await expect(this.applyCTA.first()).toBeVisible();
    }

    async clickApplyCTA(): Promise<void> {
        await expect(this.applyCTA.first()).toBeVisible();
        await this.applyCTA.first().click();
    }

    async verifySchoolOverviewCTAVisible(): Promise<void> {
        await expect(this.schoolOverviewCTA.first()).toBeVisible();
    }

    async clickSchoolOverviewCTA(): Promise<void> {
        await expect(this.schoolOverviewCTA.first()).toBeVisible();
        await this.schoolOverviewCTA.first().click();
    }
}
