import { Page, Locator } from '@playwright/test';

export class SocialLinks {
    readonly page: Page;
    readonly facebookLink: Locator;
    readonly instagramLink: Locator;
    readonly youtubeLink: Locator;
    readonly edsbyLink: Locator;

    constructor(page: Page) {
        this.page = page;
        const footerContainer = page.locator('footer, #SITE_FOOTER').first();
        this.facebookLink = footerContainer.locator('a[href*="facebook.com"]').first();
        this.instagramLink = footerContainer.locator('a[href*="instagram.com"]').first();
        this.youtubeLink = footerContainer.locator('a[href*="youtube.com"]').first();
        this.edsbyLink = footerContainer.locator('a[href*="edsby.com"]').first();
    }

    getSocialLink(name: string): Locator {
        const lower = name.toLowerCase();
        if (lower.includes('facebook')) return this.facebookLink;
        if (lower.includes('instagram')) return this.instagramLink;
        if (lower.includes('youtube')) return this.youtubeLink;
        if (lower.includes('edsby')) return this.edsbyLink;
        return this.page.locator(`a[href*="${lower}"]`).first();
    }
}
