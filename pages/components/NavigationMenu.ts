import { Page, Locator } from '@playwright/test';

export class NavigationMenu {
    readonly page: Page;
    readonly navContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navContainer = page.getByRole('navigation', { name: 'Site' });
    }

    getMenuItem(menuName: string): Locator {
        return this.navContainer.locator('li').filter({ hasText: menuName });
    }

    getMenuButton(menuName: string): Locator {
        return this.navContainer.getByRole('button', {
            name: `More ${menuName} pages`,
        });
    }

    getSubMenuItem(itemName: string): Locator {
        // Wix navigation contains hidden accessibility fallback links inside li > ul[aria-hidden="true"] with tabindex="-1".
        // The actual visible dropdown items are rendered inside the expanded dropdown menu container ([id$="dropWrapper"]).
        // Targeting elements inside dropWrapper or excluding tabindex="-1" ensures we select the visible link.
        return this.navContainer
            .locator(
                '[id$="dropWrapper"] [data-testid="linkElement"], [data-testid="linkElement"]:not([tabindex="-1"])',
            )
            .filter({ hasText: itemName });
    }

    async openMenu(menuName: string): Promise<void> {
        const menuItem = this.getMenuItem(menuName).first();

        // Wix navigation widget uses custom web components. Wait for prewarmup hydration to complete.
        const wixMenu = this.page.locator('wix-dropdown-menu');
        if ((await wixMenu.count()) > 0) {
            try {
                await this.page.waitForFunction(
                    (el) => !el?.classList.contains('hidden-during-prewarmup'),
                    await wixMenu.first().elementHandle(),
                    { timeout: 3000 },
                );
            } catch {
                // Hydration check best effort
            }
        }

        const dropWrapper = this.navContainer.locator('[id$="dropWrapper"]');
        const menuToggle = menuItem.locator('[data-testid="linkElement"]').first();

        // Trigger hover on menu item
        await menuItem.hover();
        await menuToggle.hover();

        const dropShown = await dropWrapper.getAttribute('data-dropdown-shown').catch(() => null);
        if (dropShown !== 'true') {
            await menuItem.hover();
            await menuToggle.hover();
        }
    }

    async clickMenuItem(itemName: string): Promise<void> {
        const subMenuItem = this.getSubMenuItem(itemName).first();

        if (await subMenuItem.isVisible()) {
            await subMenuItem.click();
            return;
        }

        const menuItem = this.getMenuItem(itemName).first();
        const link = menuItem.locator('a, [data-testid="linkElement"]').first();
        if (await link.isVisible()) {
            await link.click();
        } else {
            await menuItem.click();
        }
    }
}
