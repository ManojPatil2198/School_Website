import { Page } from '@playwright/test';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { HeroSlider } from './components/HeroSlider';
import { WelcomeToUST } from './components/WelcomeToUST';
import { Sidebar } from './components/Sidebar';
import { HelpfulLinks } from './components/HelpfulLinks';
import { SocialLinks } from './components/SocialLinks';
import { Footer } from './components/Footer';

export class HomePage {
    readonly page: Page;

    // Components
    readonly header: Header;
    readonly navigationMenu: NavigationMenu;
    readonly heroSlider: HeroSlider;
    readonly welcomeToUST: WelcomeToUST;
    readonly sidebar: Sidebar;
    readonly helpfulLinks: HelpfulLinks;
    readonly socialLinks: SocialLinks;
    readonly footer: Footer;

    constructor(page: Page) {
        this.page = page;

        // Initialize Component Objects
        this.header = new Header(page);
        this.navigationMenu = new NavigationMenu(page);
        this.heroSlider = new HeroSlider(page);
        this.welcomeToUST = new WelcomeToUST(page);
        this.sidebar = new Sidebar(page);
        this.helpfulLinks = new HelpfulLinks(page);
        this.socialLinks = new SocialLinks(page);
        this.footer = new Footer(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('');
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}
