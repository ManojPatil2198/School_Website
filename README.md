# United School of Tokyo - Playwright Automation Framework

A scalable, maintainable Playwright + TypeScript automation testing framework built using a Hybrid Page Object Model (POM) architecture.

## 📁 Directory Structure

```text
school_webtesting/
│
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI/CD Pipeline
├── tests/
│   ├── smoke.spec.ts
│   ├── homepage/
│   └── Header_Nav/
├── pages/
│   ├── HomePage.ts
│   └── components/
│       ├── Header.ts
│       ├── NavigationMenu.ts
│       ├── HeroSlider.ts
│       ├── HelpfulLinks.ts
│       ├── SocialLinks.ts
│       └── Footer.ts
├── fixtures/
│   └── test-fixtures.ts
├── utils/
│   ├── constants.ts
│   ├── test-data.ts
│   └── helpers.ts
├── test-data/
│   └── homepage-data.json
├── .env.example
├── eslint.config.ts
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

## 🚀 Local Execution Commands

### Run all Playwright tests headlessly:

```bash
npm test
# or: npx playwright test
```

### Run tests in headed mode:

```bash
npx playwright test --headed
```

### Run tests on a specific project (Chromium):

```bash
npx playwright test --project=chromium
```

### View HTML Test Report:

```bash
npx playwright show-report
```

## 🛡️ Running Quality Checks Locally (Same as CI)

To execute the same quality gate checks locally before opening a Pull Request:

```bash
# Run ESLint, Prettier formatting check, and TypeScript type check
npm run quality

# Run individual checks:
npm run lint         # Check ESLint rules
npm run typecheck    # Check TypeScript types
npm run format:check # Verify code formatting
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The CI/CD pipeline is implemented using GitHub Actions in `.github/workflows/playwright.yml`.

### How CI/CD Works

1. **Triggers**: Pipeline automatically runs on:
    - Every `push` to `main` or `develop`
    - Every `pull_request` targeting `main` or `develop`
2. **Quality Gates & Step Execution**:
    - **Environment Setup**: Provisions Node.js 20 environment with cached `npm` dependencies.
    - **Dependency Installation**: Runs `npm ci` for exact dependency resolution.
    - **Browser Installation**: Downloads required Playwright Chromium browser binaries and OS dependencies.
    - **Static Analysis & Type Checking**: Runs ESLint (`npm run lint`) and TypeScript type check (`npm run typecheck`).
    - **Test Execution**: Runs the Playwright suite headlessly in CI mode (`CI=true`).
    - **Artifact Generation**:
        - HTML Report is attached as a build artifact on every run (`always()`).
        - Screenshots, videos, and trace files are attached as build artifacts whenever tests fail (`if: failure()`).

### 🔐 Required GitHub Secrets

Configure the following secrets under **Settings > Secrets and variables > Actions > Repository secrets**:

| Secret Name | Required | Description                                                                         | Example / Default                                                   |
| ----------- | -------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `BASE_URL`  | Optional | Target application environment URL. If omitted, defaults to the production Wix URL. | `https://united-school-tokyo.wixsite.com/united-school-of-tok/home` |

_(Note: Sensitive test account credentials should be added to GitHub Secrets if user authentication tests are implemented in the future)._

### 📊 Viewing & Downloading Playwright Reports from CI

1. Open the repository on GitHub and navigate to the **Actions** tab.
2. Select the relevant workflow run (e.g., `Playwright Tests`).
3. Scroll down to the **Artifacts** section at the bottom of the run summary page.
4. Download `playwright-report` (HTML report) or `test-results` (failure screenshots, videos, and traces).
5. Extract the downloaded ZIP file and view the report locally:
    ```bash
    npx playwright show-report path/to/extracted-report
    ```

---

## 🌿 Git Branch & Pull Request Workflow

We follow a GitFlow-inspired branching strategy to ensure stability and quality:

```text
feature/your-feature-name
       ↓
  Pull Request
       ↓ (Triggers GitHub Actions CI validation)
  Code Review
       ↓
    develop
       ↓
    Release
       ↓
     main
```

### Workflow Steps:

1. Create a feature branch from `develop`:
    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feature/TC-001-navigation-check
    ```
2. Commit changes and push to GitHub:
    ```bash
    git add .
    git commit -m "feat: add nav menu automation test"
    git push -u origin feature/TC-001-navigation-check
    ```
3. Open a Pull Request targeting `develop` (or `main`).
4. Ensure all CI quality gate checks pass (**ESLint**, **TypeScript**, **Playwright tests**).
5. Obtain approval from a reviewer and merge into `develop`.

---

## 🔒 Recommended GitHub Branch Protection Rules

To protect critical branches (`main` and `develop`), configure the following settings under **Settings > Branches > Branch protection rules**:

1. **Target Branches**: Add rules for `main` and `develop`.
2. **Require a pull request before merging**:
    - Check **Require approvals** (Minimum 1 approval).
    - Check **Dismiss stale pull request approvals when new commits are pushed**.
3. **Require status checks to pass before merging**:
    - Check **Require branches to be up to date before merging**.
    - Select status checks: `Quality Checks & E2E Tests`.
4. **Require linear history**: Keep the Git commit graph clean.
5. **Do not allow bypassing the above settings**: Apply protections to administrators as well.

---

## 🛠️ Troubleshooting Common CI Failures

| Issue / Failure                 | Cause                                              | Solution                                                                                              |
| ------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **ESLint errors**               | Unused variables, explicit `any`, missing promises | Run `npm run lint:fix` locally and clean up code errors before pushing.                               |
| **TypeScript errors**           | Type mismatch or missing interface properties      | Run `npm run typecheck` locally to fix compiler errors.                                               |
| **Missing Playwright Browsers** | Browser binaries not pre-installed in runner       | Workflow handles this with `npx playwright install --with-deps chromium`.                             |
| **Flaky / Timed out tests**     | Slow application load or hardcoded wait issues     | Check test trace artifacts. Avoid fixed `page.waitForTimeout()`; use Playwright web-first assertions. |
| **Base URL mismatch**           | Environment URL changed or unreachable             | Check `BASE_URL` secret value in GitHub repository settings.                                          |

---

## 📊 Test Coverage Tracker

The test coverage tracker is available at:

docs/Test_Coverage_Tracker.xlsx
