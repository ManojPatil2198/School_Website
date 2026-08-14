import { Page, Locator, expect } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly headerContainer: Locator;
  readonly logoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerContainer = page.locator('header');
    this.logoLink = page.getByRole('link', { name: 'UNITED SCHOOL OF TOKYO' });
  }

  async verifyHeaderVisible(): Promise<void> {
    await expect(this.headerContainer).toBeVisible();
  }

  async verifyLogoVisible(): Promise<void> {
    await expect(this.logoLink).toBeVisible();
  }

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }
}
