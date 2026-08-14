# United School of Tokyo - Playwright Test Automation Framework

## 📌 Executive Overview

The **School_webTesting** project is an automated end-to-end (E2E) UI testing framework built with **Playwright**, **TypeScript**, and **Node.js**. It implements a **Hybrid Page Object Model (POM)** and **Component Object Model (COM)** design pattern to test the **United School of Tokyo** website ([https://united-school-tokyo.wixsite.com/united-school-of-tok/home](https://united-school-tokyo.wixsite.com/united-school-of-tok/home)).

---

## 📁 Project Directory Structure

```text
School_webTesting/
│
├── fixtures/
│   └── test-fixtures.ts            # Custom Playwright test fixture extending base test with POM instances
│
├── pages/                          # Page Object Models
│   ├── HomePage.ts                 # Parent Page Object aggregating header, navigation, slider, links, footer
│   └── components/                 # Reusable UI component models
│       ├── Header.ts               # Header container & brand logo verification
│       ├── NavigationMenu.ts       # Navigation bar, main menu items, and dropdown submenus
│       ├── HeroSlider.ts           # Hero carousel slider buttons, indicators, and text elements
│       ├── HelpfulLinks.ts         # Quick Links section locator mappings
│       ├── SocialLinks.ts          # Social media links (Facebook, Instagram, YouTube, Edsby)
│       └── Footer.ts               # Footer addresses, contacts, and copyright text
│
├── test-data/
│   └── homepage-data.json          # External JSON data containing expected URLs, titles, and paths
│
├── tests/                          # Test Suites
│   ├── smoke.spec.ts               # Basic smoke test for home page availability
│   └── homepage/
│       ├── TC_HOME_002.spec.ts     # Single test case verifying home page URL accuracy
│       ├── homepage.spec.ts        # Modular spec utilizing custom test fixtures
│       └── homepage-navigation.spec.ts # Comprehensive test suite for Header and Navigation Menu
│
├── utils/                          # Utility & Helper modules
│   ├── constants.ts                # Application-wide timeout constants
│   ├── helpers.ts                  # Common page load and navigation helper functions
│   ├── test-data.ts                # TypeScript wrapper loading JSON test data
│   └── urls.ts                     # Centralized URL definitions
│
├── .gitignore                      # Git ignore file for node_modules, reports, and environment artifacts
├── package.json                    # Project metadata, dependencies (@playwright/test, typescript)
├── package-lock.json               # Locked dependency versions
├── playwright.config.ts            # Main Playwright test configuration file
├── tsconfig.json                   # TypeScript compiler settings
└── README.md                       # High-level setup and execution readme
```

---

## 🏗️ Architecture & Key Concepts

### 1. Hybrid Page Object Model (POM) & Component Object Model (COM)
- **Top-Level Page Objects**: High-level page representations (e.g., `HomePage.ts`) encapsulate full pages and aggregate individual UI components.
- **Reusable Component Objects**: Modular visual units (e.g., `Header`, `NavigationMenu`, `Footer`, `HeroSlider`, `HelpfulLinks`, `SocialLinks`) isolate specific UI regions to maximize reusability and simplify maintenance when DOM structures change.

### 2. Custom Fixtures (`test-fixtures.ts`)
Instead of manually instantiating `new HomePage(page)` in every test, tests import custom fixture methods from `fixtures/test-fixtures.ts`:
```typescript
import { test, expect } from '../../fixtures/test-fixtures';

test('example test', async ({ homePage }) => {
  await homePage.navigate();
});
```

### 3. Centralized Test Data & Constants
- `test-data/homepage-data.json` decouples hardcoded strings from test scripts.
- `utils/urls.ts` stores base and page URLs.
- `utils/constants.ts` defines consistent timeout thresholds (`SHORT`: 5000ms, `MEDIUM`: 10000ms, `LONG`: 30000ms).

---

## 🛠️ File Specifications & Details

### 1. Configuration Files

#### `playwright.config.ts`
- **Base URL**: `https://united-school-tokyo.wixsite.com/united-school-of-tok/home`
- **Workers**: `1` (sequential execution to avoid concurrency conflicts)
- **Timeouts**: Action timeout `10,000ms`, Navigation timeout `30,000ms`, Expect timeout `10,000ms`
- **Artifacts on Failure**:
  - `trace`: `'retain-on-failure'`
  - `screenshot`: `'only-on-failure'`
  - `video`: `'retain-on-failure'`
- **Reporter**: HTML Reporter (`open: 'never'`)
- **Browser Projects**: `chromium` configured by default (Firefox and WebKit available as commented options).

#### `tsconfig.json`
- **Target**: `ES2022`
- **Module System**: `CommonJS` / `NodeNext`
- **Strict Mode**: Enabled (`strict: true`) for robust type safety.

#### `package.json`
- **Name**: `school_webtesting`
- **DevDependencies**:
  - `@playwright/test`: `^1.62.1`
  - `typescript`: `^7.0.2`
  - `@types/node`: `^26.2.0`

---

### 2. Page Objects & Component Models (`/pages`)

| File Name | Scope & Responsibilities | Key Methods / Locators |
| :--- | :--- | :--- |
| `HomePage.ts` | Main entrance page for the United School of Tokyo site. | `navigate()`, `getTitle()`, embeds all 6 UI components |
| `components/Header.ts` | Encapsulates header bar & branding. | `verifyHeaderVisible()`, `verifyLogoVisible()`, `clickLogo()` |
| `components/NavigationMenu.ts` | Handles header navigation bar, hover states, and dropdown items. | `getMenuItem()`, `openMenu()`, `verifyNavigationVisible()`, `verifyMenuItemVisible()`, `verifySubMenuVisible()` |
| `components/HeroSlider.ts` | Handles the top banner carousel slider and controls. | Locators for `Previous`, `Next`, slide indicators, main hero headings |
| `components/HelpfulLinks.ts` | Represents the Quick Links section. | Locators for overview, early years, elementary, middle school, tour, apply, tuition, and calendar links |
| `components/SocialLinks.ts` | Handles social media links in the footer region. | Locators for Facebook, Instagram, YouTube, and Edsby links |
| `components/Footer.ts` | Handles footer contact details for ES & MS campuses. | Locators for ES/MS campus headings, phone numbers, email links, and copyright text |

---

### 3. Test Suites (`/tests`)

| Spec File | Suite Name | Description & Coverage |
| :--- | :--- | :--- |
| `tests/smoke.spec.ts` | `Smoke Test Suite` | Verifies that the homepage opens and matches the target URL pattern. |
| `tests/homepage/homepage.spec.ts` | `Homepage Spec Suite` | Uses custom `homePage` fixture to test navigation and landing page URL validation. |
| `tests/homepage/homepage-navigation.spec.ts` | `Homepage Header & Navigation Test Suite` | - Verifies header & logo visibility<br>- Verifies main navigation container<br>- Iterates through main menu items (`About UST`, `Learning`, `School Life`, `Admissions`, `Summer School`, `Employment`) to assert visibility<br>- Opens `About UST` menu and checks `UST Overview` submenu visibility |
| `tests/homepage/TC_HOME_002.spec.ts` | `TC_HOME_002` | Verifies exact URL match against `URLS.HOMEPAGE`. |

---

### 4. Utilities & Data (`/utils` & `/test-data`)

- `utils/urls.ts`: Central registry for `BASE_URL` and `HOMEPAGE`.
- `utils/constants.ts`: `TIMEOUTS` dictionary with `SHORT`, `MEDIUM`, and `LONG` values.
- `utils/helpers.ts`: `waitForPageLoad(page)` helper for DOM load verification.
- `utils/test-data.ts`: Imports `homepage-data.json` for typed data access.
- `test-data/homepage-data.json`: Standardized JSON payload:
  ```json
  {
    "title": "United School of Tokyo",
    "path": "/united-school-of-tok/home",
    "url": "https://united-school-tokyo.wixsite.com/united-school-of-tok/home"
  }
  ```

---

## 🚀 Execution Guide

### 1. Run All Automated Tests
```bash
npx playwright test
```

### 2. Run Tests in Headed (UI Visible) Mode
```bash
npx playwright test --headed
```

### 3. Run Specific Test Suite
```bash
npx playwright test tests/homepage/homepage-navigation.spec.ts
```

### 4. Run Tests for Specific Browser Project
```bash
npx playwright test --project=chromium
```

### 5. View Test Execution HTML Report
```bash
npx playwright show-report
```

---

## 📊 Summary Table of Test Files

| Category | File | Description |
| :--- | :--- | :--- |
| **Config** | `playwright.config.ts` | Test runner settings, timeouts, reporters, trace/screenshot rules |
| **Config** | `tsconfig.json` | TypeScript compilation targets & strict checks |
| **Config** | `package.json` | NPM dependencies and project definition |
| **Fixtures** | `fixtures/test-fixtures.ts` | Custom test runner extending base `test` with `homePage` fixture |
| **Pages** | `pages/HomePage.ts` | Parent Page Object combining all homepage sub-components |
| **Components** | `pages/components/Header.ts` | Header component locator & action methods |
| **Components** | `pages/components/NavigationMenu.ts` | Navigation bar & menu item locators |
| **Components** | `pages/components/HeroSlider.ts` | Main hero carousel slider component |
| **Components** | `pages/components/HelpfulLinks.ts` | Quick links section components |
| **Components** | `pages/components/SocialLinks.ts` | Social media footer links |
| **Components** | `pages/components/Footer.ts` | Campus contact information & copyright details |
| **Tests** | `tests/smoke.spec.ts` | Basic smoke test suite |
| **Tests** | `tests/homepage/homepage.spec.ts` | Modular homepage test suite using custom fixtures |
| **Tests** | `tests/homepage/homepage-navigation.spec.ts` | Detailed navigation bar and header test suite |
| **Tests** | `tests/homepage/TC_HOME_002.spec.ts` | Home page URL verification test case |
| **Utils** | `utils/urls.ts` | Endpoint URLs mapping |
| **Utils** | `utils/constants.ts` | Timeout constants |
| **Utils** | `utils/helpers.ts` | Helper utilities for page loading |
| **Utils** | `utils/test-data.ts` | Type-safe wrapper for external test data |
| **Data** | `test-data/homepage-data.json` | JSON test data source |
