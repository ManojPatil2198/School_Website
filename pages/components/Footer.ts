import { Page, Locator, expect } from '@playwright/test';

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
    readonly quickLinksHeading: Locator;
    readonly facebookLink: Locator;
    readonly instagramLink: Locator;
    readonly youtubeLink: Locator;
    readonly edsbyLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footerContainer = page.locator('footer, #SITE_FOOTER').first();
        this.esCampusHeading = page.getByText('ES Campus');
        this.esCampusAddressLink = this.footerContainer.locator('a[href*="Bcvjh8K9ajJgyMVV9"]');
        this.esCampusPhoneLink = this.footerContainer.locator('a[href="tel:(+81)357909405"]');
        this.esCampusEmailLink = this.footerContainer
            .filter({ hasText: 'ES Campus' })
            .getByRole('link', { name: 'info@united-school.jp' });

        this.msCampusHeading = page.getByText('MS Campus');
        this.msCampusAddressLink = this.footerContainer.locator('a[href*="UgyM69bVGdmWjrNb9"]');
        this.msCampusPhoneLink = this.footerContainer.locator('a[href="tel:(+81)357388850"]');
        this.msCampusEmailLink = this.footerContainer
            .filter({ hasText: 'MS Campus' })
            .getByRole('link', { name: 'info@united-school.jp' });

        this.copyrightText = page.getByText(/All Rights.*Reserved|UST 2025/i).first();
        this.quickLinksHeading = page.getByText('Quick Links', { exact: false }).first();
        this.facebookLink = page.locator('a[href*="facebook.com"]').first();
        this.instagramLink = page.locator('a[href*="instagram.com"]').first();
        this.youtubeLink = page.locator('a[href*="youtube.com"]').first();
        this.edsbyLink = page.locator('a[href*="edsby.com"]').first();
    }

    async scrollToFooter(): Promise<void> {
        await this.footerContainer.scrollIntoViewIfNeeded();
    }

    async verifyFooterDisplayed(): Promise<void> {
        await expect(this.footerContainer).toBeVisible();
    }

    async verifyFooterSectionsVisible(): Promise<void> {
        await expect(this.footerContainer).toBeVisible();

        const box = await this.footerContainer.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);

        await expect(this.copyrightText).toBeVisible();
    }

    async verifyMobileFooterLayout(): Promise<void> {
        await expect(this.footerContainer).toBeVisible();

        const footerBox = await this.footerContainer.boundingBox();
        expect(footerBox).not.toBeNull();
        expect(footerBox!.width).toBeGreaterThan(0);
        expect(footerBox!.height).toBeGreaterThan(0);

        await expect(this.esCampusHeading.first()).toBeVisible();
        await expect(this.msCampusHeading.first()).toBeVisible();
        await expect(this.copyrightText).toBeVisible();
        await expect(this.facebookLink).toBeVisible();
        await expect(this.instagramLink).toBeVisible();
        await expect(this.youtubeLink).toBeVisible();
        await expect(this.edsbyLink).toBeVisible();
    }

    async verifyCopyrightInformationDisplayed(expectedText?: string): Promise<void> {
        const copyrightLoc = this.footerContainer.getByText('All Rights', { exact: false }).first();
        await expect(copyrightLoc).toBeVisible();

        const fullFooterText = await this.footerContainer.innerText();
        const normalizedText = fullFooterText.replace(/\s+/g, ' ');

        if (expectedText) {
            const normalizedExpected = expectedText.replace(/\s+/g, ' ');
            expect(normalizedText).toContain(normalizedExpected);
        } else {
            expect(normalizedText).toContain('All Rights Reserved');
            expect(normalizedText).toContain('UST 2025');
        }

        const box = await copyrightLoc.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);
    }

    async verifyESCampusInformationDisplayed(): Promise<void> {
        await expect(this.esCampusHeading.first()).toBeVisible();
        const addressLoc = this.page.getByText(/Tomigaya 2 −21−10/i).first();
        await expect(addressLoc).toBeVisible();
    }

    async verifyESCampusContactDetails(): Promise<void> {
        const phoneLoc = this.page.getByText('(+81)3-5790-9405', { exact: false }).first();
        await expect(phoneLoc).toBeVisible();

        const emailLoc = this.page.getByRole('link', { name: 'info@united-school.jp' }).first();
        await expect(emailLoc).toBeVisible();
    }

    async verifyMSCampusInformationDisplayed(): Promise<void> {
        await expect(this.msCampusHeading.first()).toBeVisible();
        const addressLoc = this.page.getByText(/Tomigaya 2 −19−10/i).first();
        await expect(addressLoc).toBeVisible();
    }

    async verifyMSCampusContactDetails(): Promise<void> {
        const phoneLoc = this.page.getByText('(+81)3-5738-8850', { exact: false }).first();
        await expect(phoneLoc).toBeVisible();

        const emailLoc = this.page.getByRole('link', { name: 'info@united-school.jp' }).last();
        await expect(emailLoc).toBeVisible();
    }

    getQuickLinkLocator(name: string): Locator {
        const lower = name.toLowerCase();
        if (lower.includes('facebook')) return this.facebookLink;
        if (lower.includes('instagram')) return this.instagramLink;
        if (lower.includes('youtube')) return this.youtubeLink;
        if (lower.includes('edsby')) return this.edsbyLink;
        return this.page.getByRole('link', { name: new RegExp(name, 'i') });
    }

    async verifyQuickLinksSectionDisplayed(): Promise<void> {
        await expect(this.quickLinksHeading).toBeVisible();
        await expect(this.facebookLink).toBeVisible();
        await expect(this.instagramLink).toBeVisible();
        await expect(this.youtubeLink).toBeVisible();
        await expect(this.edsbyLink).toBeVisible();
    }

    async verifyQuickLinksNavigation(
        links: readonly { name: string; url: string }[] | readonly string[],
    ): Promise<void> {
        await this.quickLinksHeading.scrollIntoViewIfNeeded();

        for (const linkItem of links) {
            const name = typeof linkItem === 'string' ? linkItem : linkItem.name;
            const expectedUrl = typeof linkItem === 'string' ? undefined : linkItem.url;

            const linkLoc = this.getQuickLinkLocator(name);
            await expect(linkLoc).toBeVisible();

            if (expectedUrl) {
                const href = await linkLoc.getAttribute('href');
                expect(href).toContain(expectedUrl);
            }

            const [newPage] = await Promise.all([
                this.page
                    .context()
                    .waitForEvent('page', { timeout: 5000 })
                    .catch(() => null),
                linkLoc.click(),
            ]);

            if (newPage) {
                await newPage.waitForLoadState('domcontentloaded');
                expect(newPage.url()).not.toContain('about:blank');
                await newPage.close();
            }
        }
    }
}
