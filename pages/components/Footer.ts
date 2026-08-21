import { Page, Locator } from '@playwright/test';
import { SocialLinks } from './SocialLinks';

export class Footer {
    readonly page: Page;
    readonly socialLinks: SocialLinks;
    readonly footerContainer: Locator;

    readonly esCampusHeading: Locator;
    readonly esCampusAddressText: Locator;
    readonly esCampusAddressLink: Locator;
    readonly esCampusPhoneText: Locator;
    readonly esCampusPhoneLink: Locator;
    readonly esCampusEmailLink: Locator;

    readonly msCampusHeading: Locator;
    readonly msCampusAddressText: Locator;
    readonly msCampusAddressLink: Locator;
    readonly msCampusPhoneText: Locator;
    readonly msCampusPhoneLink: Locator;
    readonly msCampusEmailLink: Locator;

    readonly copyrightText: Locator;
    readonly quickLinksHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.socialLinks = new SocialLinks(page);
        this.footerContainer = page.locator('footer');

        this.esCampusHeading = page.getByText('ES Campus');
        this.esCampusAddressText = page.getByText(/Tomigaya 2 −21−10/i);
        this.esCampusAddressLink = page.locator('a[href*="maps"]').first();
        this.esCampusPhoneText = page.getByText('(+81)3-5790-9405');
        this.esCampusPhoneLink = page.locator('a[href*="tel:(+81)357909405"]');
        this.esCampusEmailLink = page.getByRole('link', { name: 'info@united-school.jp' }).first();

        this.msCampusHeading = page.getByText('MS Campus');
        this.msCampusAddressText = page.getByText(/Tomigaya 2 −19−10/i);
        this.msCampusAddressLink = page.locator('a[href*="maps"]').last();
        this.msCampusPhoneText = page.getByText('(+81)3-5738-8850');
        this.msCampusPhoneLink = page.locator('a[href*="tel:(+81)357388850"]');
        this.msCampusEmailLink = page.getByRole('link', { name: 'info@united-school.jp' }).last();

        this.quickLinksHeading = page.getByText('Quick Links');
        this.copyrightText = page.getByText(/©|All Rights Reserved/i);
    }

    get facebookLink(): Locator {
        return this.socialLinks.facebookLink;
    }

    get instagramLink(): Locator {
        return this.socialLinks.instagramLink;
    }

    get youtubeLink(): Locator {
        return this.socialLinks.youtubeLink;
    }

    get edsbyLink(): Locator {
        return this.socialLinks.edsbyLink;
    }

    getQuickLinkLocator(name: string): Locator {
        return this.socialLinks.getSocialLink(name);
    }

    async scrollToFooter(): Promise<void> {
        await this.footerContainer.scrollIntoViewIfNeeded();
    }

    async getFooterBoundingBox() {
        return await this.footerContainer.boundingBox();
    }

    async getCopyrightBoundingBox() {
        return await this.copyrightText.first().boundingBox();
    }

    async getFullFooterText(): Promise<string> {
        return await this.footerContainer.innerText();
    }

    async openQuickLink(name: string): Promise<Page | null> {
        const linkLoc = this.getQuickLinkLocator(name);
        const [newPage] = await Promise.all([
            this.page
                .context()
                .waitForEvent('page', { timeout: 5000 })
                .catch(() => null),
            linkLoc.click(),
        ]);
        if (newPage) {
            await newPage.waitForLoadState('domcontentloaded');
        }
        return newPage;
    }
}
