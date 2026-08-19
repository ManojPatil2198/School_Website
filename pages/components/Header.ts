import { Page, Locator } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly headerContainer: Locator;
    readonly logoLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerContainer = page.getByRole('banner').or(page.locator('header'));
        this.logoLink = this.headerContainer
            .getByAltText('UST_logo_med.png')
            .or(this.headerContainer.locator('img[alt="UST_logo_med.png"]'));
    }

    async clickLogo(): Promise<void> {
        await this.logoLink.click();
    }
}
