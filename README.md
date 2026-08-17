# United School of Tokyo - Playwright Automation Framework

A scalable, maintainable Playwright + TypeScript automation testing framework built using a Hybrid Page Object Model (POM) architecture.

## 📁 Directory Structure

```text
school_webtesting/
│
├── tests/
│   ├── smoke.spec.ts
│   └── homepage/
│       └── homepage.spec.ts
│
├── pages/
│   ├── HomePage.ts
│   └── components/
│       ├── Header.ts
│       ├── NavigationMenu.ts
│       ├── HeroSlider.ts
│       ├── HelpfulLinks.ts
│       ├── SocialLinks.ts
│       └── Footer.ts
│
├── fixtures/
│   └── test-fixtures.ts
│
├── utils/
│   ├── constants.ts
│   ├── test-data.ts
│   └── helpers.ts
│
├── test-data/
│   └── homepage-data.json
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🏗️ Architecture

```text
Test Suite
    ↓
HomePage (POM)
    ↓
Reusable Components (Header, Nav, Hero, Links, Footer)
    ↓
Utilities & Fixtures
```

## 🚀 Execution Commands

Run all tests headlessly:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests on a specific project (Chromium):

```bash
npx playwright test --project=chromium
```

View HTML Test Report:

```bash
npx playwright show-report
```
