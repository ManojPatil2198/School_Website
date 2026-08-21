import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './',

    // Explicitly tell Playwright where test files are
    testMatch: 'tests/**/*.spec.ts',

    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : 1,

    expect: {
        timeout: 10000,
    },

    reporter: process.env.CI
        ? [['github'], ['html', { open: 'never' }]]
        : [['html', { open: 'never' }]],

    use: {
        baseURL:
            process.env.BASE_URL ||
            'https://united-school-tokyo.wixsite.com/united-school-of-tok/home',
        actionTimeout: 10000,
        navigationTimeout: 30000,
        trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
        // {
        //     name: 'mobile',
        //     use: {
        //         ...devices['iPhone 13'],
        //     },
        // },

        // {
        //     name: 'tablet',
        //     use: {
        //         ...devices['iPad (gen 7)'],
        //     },
        // },
    ],
});
