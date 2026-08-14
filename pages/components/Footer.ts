import { Page, Locator } from '@playwright/test';

export class Footer {
  readonly page: Page;
  readonly footerContainer: Locator;
  readonly esCampusHeading: Locator;
  readonly esCampusAddressLink: Locator;
  readonly esCampusPhoneLink: Locator;
  readonly esCampusEmailLink: Locator;
  readonly msCampusHeading: Locator;
  readonly msCampusAddressLink: Locator;
  readonly msCampusPhoneLink: Locator;
  readonly msCampusEmailLink: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footerContainer = page.locator('footer');
    this.esCampusHeading = page.getByText('ES Campus');
    this.esCampusAddressLink = this.footerContainer.locator('a[href*="Bcvjh8K9ajJgyMVV9"]');
    this.esCampusPhoneLink = this.footerContainer.locator('a[href="tel:(+81)357909405"]');
    this.esCampusEmailLink = this.footerContainer.filter({ hasText: 'ES Campus' }).getByRole('link', { name: 'info@united-school.jp' });

    this.msCampusHeading = page.getByText('MS Campus');
    this.msCampusAddressLink = this.footerContainer.locator('a[href*="UgyM69bVGdmWjrNb9"]');
    this.msCampusPhoneLink = this.footerContainer.locator('a[href="tel:(+81)357388850"]');
    this.msCampusEmailLink = this.footerContainer.filter({ hasText: 'MS Campus' }).getByRole('link', { name: 'info@united-school.jp' });

    this.copyrightText = page.getByText(/All Rights Reserved/i);
  }
}
