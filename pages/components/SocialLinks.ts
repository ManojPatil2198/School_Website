import { Page, Locator } from '@playwright/test';

export class SocialLinks {
  readonly page: Page;
  readonly facebookLink: Locator;
  readonly instagramLink: Locator;
  readonly youtubeLink: Locator;
  readonly edsbyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    const footerContainer = page.locator('footer');
    this.facebookLink = footerContainer.getByRole('link', { name: /Facebook/i });
    this.instagramLink = footerContainer.getByRole('link', { name: /Instagram/i });
    this.youtubeLink = footerContainer.getByRole('link', { name: /Youtube/i });
    this.edsbyLink = footerContainer.locator('a[href*="edsby.com"]');
  }
}
