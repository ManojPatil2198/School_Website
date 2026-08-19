import { Page } from '@playwright/test';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { HeroSlider } from './components/HeroSlider';
import { WelcomeToUST } from './components/WelcomeToUST';
import { Sidebar } from './components/Sidebar';
import { HelpfulLinks } from './components/HelpfulLinks';
import { SocialLinks } from './components/SocialLinks';
import { Footer } from './components/Footer';
import { WhyUST } from './components/WhyUST';

export class HomePage {
    readonly page: Page;

    // Components
    readonly header: Header;
    readonly navigationMenu: NavigationMenu;
    readonly heroSlider: HeroSlider;
    readonly welcomeToUST: WelcomeToUST;
    readonly sidebar: Sidebar;
    readonly helpfulLinks: HelpfulLinks;
    readonly footer: Footer;
    readonly socialLinks: SocialLinks;
    readonly whyUST: WhyUST;

    constructor(page: Page) {
        this.page = page;

        // Initialize Component Objects
        this.header = new Header(page);
        this.navigationMenu = new NavigationMenu(page);
        this.heroSlider = new HeroSlider(page);
        this.welcomeToUST = new WelcomeToUST(page);
        this.sidebar = new Sidebar(page);
        this.helpfulLinks = new HelpfulLinks(page);
        this.footer = new Footer(page);
        this.socialLinks = this.footer.socialLinks;
        this.whyUST = new WhyUST(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('');
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}
