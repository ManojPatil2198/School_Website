import { Page, Locator } from '@playwright/test';

export class NavigationMenu {
    readonly page: Page;
    readonly navContainer: Locator;
    readonly hamburgerButton: Locator;

    private isOpeningMenu: Promise<void> | null = null;

    constructor(page: Page) {
        this.page = page;

        const desktopNav = page.locator('wix-dropdown-menu, nav[aria-label="Site"]');

        this.hamburgerButton = page
            .getByRole('button', { name: /navigation menu/i })
            .or(page.locator('#MENU_AS_CONTAINER_TOGGLE'));

        this.navContainer = desktopNav
            .or(page.locator('#MENU_AS_CONTAINER, .wixui-vertical-menu'))
            .first();
    }

    /**
     * Checks whether the mobile menu drawer is currently open and visible (or if desktop nav is active).
     */
    async isMenuDrawerOpen(): Promise<boolean> {
        if (await this.hamburgerButton.isVisible().catch(() => false)) {
            const drawer = this.page.locator('#MENU_AS_CONTAINER, .wixui-vertical-menu').first();
            return await drawer.isVisible().catch(() => false);
        }
        return true;
    }

    /**
     * Ensures the mobile hamburger menu drawer is opened if running in a mobile/tablet hamburger layout.
     */
    async ensureMenuOpen(): Promise<void> {
        if (await this.isMenuDrawerOpen()) {
            return;
        }

        if (this.isOpeningMenu) {
            await this.isOpeningMenu;
            if (await this.isMenuDrawerOpen()) {
                return;
            }
        }

        this.isOpeningMenu = (async () => {
            try {
                for (let attempt = 0; attempt < 3; attempt++) {
                    if (await this.isMenuDrawerOpen()) {
                        return;
                    }

                    const isHamburgerVisible = await this.hamburgerButton
                        .first()
                        .isVisible({ timeout: 1500 })
                        .catch(() => false);

                    if (!isHamburgerVisible) {
                        // Desktop layout or page still navigating
                        await this.hamburgerButton
                            .first()
                            .waitFor({ state: 'visible', timeout: 500 })
                            .catch(() => {});
                        continue;
                    }

                    // Mobile layout: open hamburger menu
                    try {
                        await this.hamburgerButton.first().click({ timeout: 2000 });
                        await this.page
                            .locator('#MENU_AS_CONTAINER, .wixui-vertical-menu')
                            .first()
                            .waitFor({ state: 'visible', timeout: 1000 })
                            .catch(() => {});
                    } catch {
                        // Retry on hydration or transition lag
                    }

                    if (await this.isMenuDrawerOpen()) {
                        return;
                    }
                }
            } finally {
                this.isOpeningMenu = null;
            }
        })();

        await this.isOpeningMenu;
    }

    getMenuItem(menuName: string): Locator {
        this.ensureMenuOpen().catch(() => {});

        const desktopItem = this.page
            .locator('wix-dropdown-menu li, nav[aria-label="Site"] li')
            .filter({ hasText: menuName });

        const mobileItem = this.page
            .locator(
                '#MENU_AS_CONTAINER [data-testid="linkElement"], .wixui-vertical-menu [data-testid="linkElement"]',
            )
            .filter({ hasText: menuName });

        return desktopItem.or(mobileItem);
    }

    getMenuButton(menuName: string): Locator {
        const desktopBtn = this.page
            .locator('wix-dropdown-menu, nav[aria-label="Site"]')
            .getByRole('button', { name: `More ${menuName} pages` });

        const mobileBtn = this.page
            .locator('#MENU_AS_CONTAINER [data-testid="linkElement"]')
            .filter({ hasText: menuName });

        return desktopBtn.or(mobileBtn);
    }

    getSubMenuItem(itemName: string): Locator {
        const desktopSub = this.page
            .locator('wix-dropdown-menu [id$="dropWrapper"] [data-testid="linkElement"]')
            .filter({ hasText: itemName });

        const mobileSub = this.page
            .locator(
                '#MENU_AS_CONTAINER [data-testid="linkElement"], .wixui-vertical-menu [data-testid="linkElement"]',
            )
            .filter({ hasText: itemName });

        return desktopSub.or(mobileSub);
    }

    async openMenu(menuName: string): Promise<void> {
        await this.ensureMenuOpen();

        if (await this.hamburgerButton.isVisible().catch(() => false)) {
            const menuItem = this.getMenuItem(menuName).first();
            if (await menuItem.isVisible()) {
                await menuItem.click();
            }
            return;
        }

        const menuItem = this.getMenuItem(menuName).first();

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

        const dropWrapper = this.page
            .getByRole('navigation', { name: 'Site' })
            .locator('[id$="dropWrapper"]');
        const menuToggle = menuItem.locator('[data-testid="linkElement"]').first();

        await menuItem.hover().catch(() => {});
        await menuToggle.hover().catch(() => {});

        let dropShown = await dropWrapper.getAttribute('data-dropdown-shown').catch(() => null);
        if (dropShown !== 'true') {
            await menuItem.hover().catch(() => {});
            await menuToggle.hover().catch(() => {});
            dropShown = await dropWrapper.getAttribute('data-dropdown-shown').catch(() => null);
            if (dropShown !== 'true') {
                await menuItem.click().catch(() => {});
            }
        }
    }

    async clickMenuItem(itemName: string): Promise<void> {
        await this.ensureMenuOpen();

        const subMenuItem = this.getSubMenuItem(itemName).first();

        if (await subMenuItem.isVisible().catch(() => false)) {
            await Promise.all([
                this.page
                    .waitForURL((url) => !url.href.endsWith('/home'), { timeout: 3000 })
                    .catch(() => {}),
                subMenuItem.click(),
            ]);
            return;
        }

        const menuItem = this.getMenuItem(itemName).first();
        const link = menuItem.locator('a, [data-testid="linkElement"]').first();
        if (await link.isVisible().catch(() => false)) {
            await Promise.all([
                this.page
                    .waitForURL((url) => !url.href.endsWith('/home'), { timeout: 3000 })
                    .catch(() => {}),
                link.click(),
            ]);
        } else {
            await menuItem.click();
        }
    }
}
