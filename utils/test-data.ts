import homepageData from '../test-data/homepage-data.json';

export interface WhyChooseUstFeature {
    readonly heading: string;
    readonly description: string;
}

export interface QuickLink {
    readonly name: string;
    readonly url: string;
}

export interface HomePageData {
    readonly title: string;
    readonly path: string;
    readonly url: string;
    readonly whyChooseUstFeatures: readonly WhyChooseUstFeature[];
    readonly helpfulLinks: readonly string[];
    readonly quickLinks: readonly QuickLink[];
    readonly copyrightText: string;
}

export interface TestData {
    readonly homepage: HomePageData;
}

export const TEST_DATA: TestData = {
    homepage: homepageData,
} as const;
