import { Page, Locator, expect } from '@playwright/test';

export class NavigationMenu {
  readonly page: Page;
  readonly navContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navContainer = page.getByRole('navigation');
  }

  getMenuItem(menuName: string): Locator {
    return this.navContainer
      .getByRole('button', { name: menuName })
      .or(this.navContainer.getByRole('link', { name: menuName }))
      .or(this.navContainer.locator('div[role="button"]').filter({ hasText: menuName }))
      .first();
  }

  getSubMenuItem(itemName: string): Locator {
    return this.page.getByRole('link', { name: itemName }).first();
  }

  async verifyNavigationVisible(): Promise<void> {
    await expect(this.navContainer).toBeVisible();
  }

  async verifyMenuItemVisible(itemName: string): Promise<void> {
    await expect(this.getMenuItem(itemName)).toBeVisible();
  }

  async openMenu(menuName: string): Promise<void> {
    const menuItem = this.getMenuItem(menuName);
    await menuItem.hover();
    await menuItem.click();
  }

  async verifySubMenuVisible(itemName: string): Promise<void> {
    const subMenuItem = this.getSubMenuItem(itemName);
    await expect(subMenuItem).toBeVisible();
  }

  async clickMenuItem(itemName: string): Promise<void> {
    const item = this.getMenuItem(itemName);
    if (await item.isVisible()) {
      await item.click();
    } else {
      await this.getSubMenuItem(itemName).click();
    }
  }
}
