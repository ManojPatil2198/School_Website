import { Page, Locator } from '@playwright/test';

export class HeroSlider {
  readonly page: Page;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly slideIndicators: Locator;
  readonly heroHeading: Locator;
  readonly heroSubheading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.previousButton = page.getByRole('button', { name: 'Previous' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.slideIndicators = page.getByRole('link', { name: /Slide\s+\d+/ });
    this.heroHeading = page.getByText('Welcome to the United School of Tokyo');
    this.heroSubheading = page.getByText('International School with a Conscience');
  }

  getSlideIndicator(slideNumber: number): Locator {
    return this.page.getByRole('link', { name: `Slide ${slideNumber}` });
  }
}
