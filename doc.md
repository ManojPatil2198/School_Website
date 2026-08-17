# Project Documentation: United School of Tokyo Automation Framework

## 1. Executive Summary & Overview

This repository contains an enterprise-grade end-to-end (E2E) web automation testing framework built for the **United School of Tokyo** web application. Designed for scalability, maintainability, and high reliability, the framework leverages **Playwright** with **TypeScript** and adheres to a **Hybrid Page Object Model (POM)** architecture.

The project incorporates strict static code analysis, code formatting standards, and automated pre-commit quality enforcement to maintain a clean codebase.

---

## 2. Technical Stack & Dependencies

| Category             | Technology / Library                         | Description                                                                        |
| :------------------- | :------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Core Framework**   | Playwright (`@playwright/test` `^1.62.1`)    | Cross-browser web automation and assertion library                                 |
| **Language**         | TypeScript (`^5.9.3`)                        | Strictly typed JavaScript with ES2022 targets and path aliasing                    |
| **Linter**           | ESLint (`^10.8.1` Flat Config)               | Modern flat-config linting using `@typescript-eslint` & `eslint-plugin-playwright` |
| **Formatter**        | Prettier (`^3.9.6`)                          | Automated code formatting engine                                                   |
| **Git Hooks**        | Husky (`^9.1.7`) & `lint-staged` (`^17.3.0`) | Automated quality checks on staged files prior to commit                           |
| **Execution Helper** | Jiti (`^2.7.0`)                              | Runtime TypeScript compilation loader                                              |

---

## 3. Framework Architecture & Design Principles

The automation framework is architected around four core pillars:

```text
┌─────────────────────────────────────────────────────────┐
│                       Test Layer                        │
│             (Playwright Spec Files & Fixtures)           │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Page Object Model (POM)                │
│                 (Main Page Controllers)                 │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│               Modular Component Layer                   │
│   (Header, NavigationMenu, HeroSlider, Links, Footer)   │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│             Core Utilities & Data Layer                 │
│      (Constants, Helpers, Test Data JSON Specs)         │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

- **Hybrid Page Object Model**: Top-level page classes (e.g., `HomePage`) act as orchestrators, composing reusable and independent component objects.
- **Modular Component Isolation**: Complex page regions (Navigation, Hero Banner, Helpful Links, Social Icons, Footer) are separated into dedicated component classes under `pages/components/`.
- **Custom Fixtures Injection**: Extended Playwright test fixtures (`fixtures/test-fixtures.ts`) automatically initialize and expose page objects to test instances, eliminating repetitive setup code.
- **Strict Typing & Path Aliasing**: Uses TypeScript path aliases (`@pages/*`, `@tests/*`) for clean module imports and full compile-time safety.

---

## 4. Directory Structure & Component Roles

```text
school_webtesting/
├── .agents/               # Skill definitions and agent configuration
├── .husky/                # Git pre-commit hooks for quality checks
├── fixtures/              # Custom Playwright test fixtures & dependency injection
│   └── test-fixtures.ts   # Fixture setup injecting Page Objects into test contexts
├── pages/                 # Page Object Model abstraction layer
│   ├── HomePage.ts        # Main orchestrator page object for the application home page
│   └── components/        # Isolated, reusable web UI components
│       ├── Header.ts          # Brand header and top bar controls
│       ├── NavigationMenu.ts  # Main site navigation bar and multi-level dropdowns
│       ├── HeroSlider.ts      # Homepage hero banner, slide controls, and CTA elements
│       ├── HelpfulLinks.ts    # Links section and contextual navigation cards
│       ├── SocialLinks.ts     # Social media integrations and external links
│       └── Footer.ts          # Footer section containing copyright and secondary links
├── test-data/             # Centralized JSON test data files
│   └── homepage-data.json # Environment and application test datasets
├── tests/                 # Categorized test execution suites
├── utils/                 # General helpers, assertion utilities, and global constants
│   ├── constants.ts       # Application URLs, timeout constants, and configuration flags
│   ├── helpers.ts         # Common DOM/browser interaction utilities
│   └── test-data.ts       # Test data loader and typed data contracts
├── .gitignore             # Git ignore patterns
├── .prettierignore        # Prettier exclusion list
├── .prettierrc.json       # Prettier formatting rule definitions
├── eslint.config.ts       # ESLint v10 flat configuration file
├── package.json           # Project manifest, scripts, and dependency tree
├── playwright.config.ts   # Global Playwright runner configuration
├── tsconfig.json          # TypeScript compiler configuration & path aliases
└── README.md              # Quick start guide
```

---

## 5. Configuration Deep-Dive

### Playwright Configuration (`playwright.config.ts`)

- **Base URL**: `https://united-school-tokyo.wixsite.com/united-school-of-tok/home`
- **Default Action Timeout**: `10,000 ms`
- **Navigation Timeout**: `30,000 ms`
- **Assertion Timeout**: `10,000 ms`
- **Artifact Strategy**:
    - `trace`: Captured on failure (`retain-on-failure`)
    - `screenshot`: Captured on failure (`only-on-failure`)
    - `video`: Retained on failure (`retain-on-failure`)
- **Reporter**: Embedded HTML reporter (`open: 'never'`)

### TypeScript Configuration (`tsconfig.json`)

- **Target**: `ES2022`
- **Module Resolution**: Node CommonJS
- **Strict Mode**: Enabled (`strict: true`, `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`)
- **Path Mapping**:
    - `@pages/*` -> `pages/*`
    - `@tests/*` -> `tests/*`

### ESLint & Prettier Setup (`eslint.config.ts`)

- Configured using **ESLint v10 Flat Config format**.
- Enforces strict rules:
    - Disallows `any` types (`@typescript-eslint/no-explicit-any`: `error`).
    - Disallows unhandled promises (`@typescript-eslint/no-floating-promises`: `error`).
    - Prohibits focused (`test.only`) and skipped (`test.skip`) tests in version control.
    - Mandates valid expectations and prohibits arbitrary hardcoded timeouts (`playwright/no-wait-for-timeout`).

---

## 6. Developer Workflow & Quality Scripts

The repository includes a comprehensive suit of npm package scripts to validate code formatting, static types, and code quality.

### Quality & Governance Commands

| Command                | Purpose                                                            |
| :--------------------- | :----------------------------------------------------------------- |
| `npm run lint`         | Runs ESLint static analysis across the entire project              |
| `npm run lint:fix`     | Automatically fixes auto-fixable ESLint errors                     |
| `npm run format`       | Formats all supported files using Prettier                         |
| `npm run format:check` | Verifies that all files conform to Prettier formatting rules       |
| `npm run typecheck`    | Executes TypeScript type verification without emitting outputs     |
| `npm run quality`      | Runs complete quality gate (`lint` + `format:check` + `typecheck`) |
| `npm run test`         | Executes Playwright test runner                                    |

### Git Hooks Integration

- **Husky** manages Git pre-commit triggers.
- **lint-staged** automatically runs `eslint --fix` and `prettier --write` on modified `.ts`/`.json`/`.md` files before committing, guaranteeing zero lint violations in version control.

---

## 7. Framework Maintenance & Best Practices

1. **Component Reusability**: When extending page coverage, encapsulate reusable UI sections into `pages/components/` rather than adding large selector blocks to main page objects.
2. **Strict Typing**: Always define explicit types for parameters, methods, and return types. Do not use `any`.
3. **Data Abstraction**: Keep environment parameters and test datasets in `test-data/` or `utils/constants.ts` rather than hardcoding string literals in components.
4. **Clean Commits**: Always run `npm run quality` prior to pushing code to ensure type compliance and formatting consistency across the repository.
