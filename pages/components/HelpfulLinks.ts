import { Page, Locator } from '@playwright/test';

export class HelpfulLinks {
    readonly page: Page;
    readonly quickLinksHeading: Locator;
    readonly ustOverviewLink: Locator;
    readonly earlyYearsLink: Locator;
    readonly elementarySchoolLink: Locator;
    readonly middleSchoolLink: Locator;
    readonly requestTourLink: Locator;
    readonly applyLink: Locator;
    readonly feesAndTuitionLink: Locator;
    readonly schoolCalendarLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quickLinksHeading = page.getByText('Quick Links');
        this.ustOverviewLink = page.getByRole('link', { name: 'UST Overview' });
        this.earlyYearsLink = page.getByRole('link', { name: 'Early Years Program' });
        // Note: Locators reflect exact text present in rendered DOM
        this.elementarySchoolLink = page.getByRole('link', { name: 'Elemantary School' });
        this.middleSchoolLink = page.getByRole('link', { name: 'MIddle School' });
        this.requestTourLink = page.getByRole('link', { name: 'Request a Tour' });
        this.applyLink = page.getByRole('link', { name: 'Apply' });
        this.feesAndTuitionLink = page.getByRole('link', { name: 'Fees&Tuition' });
        this.schoolCalendarLink = page.getByRole('link', { name: 'School Calendar' });
    }
}
