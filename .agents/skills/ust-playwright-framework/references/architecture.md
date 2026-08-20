# Architecture Reference

## Layered flow

```
Test → Fixture → Page Object → Reusable Component → Locator
```

Supporting layers: Utilities, Constants, Test Data, Type Definitions,
API Clients, Configuration.

### Responsibilities

- **Tests** — describe business behavior, hold business-level assertions,
  use fixtures/Page Objects. No UI implementation details.
- **Page Objects** — represent a meaningful page/experience; own
  page-specific locators, actions, workflows; compose Components; may
  expose reusable page-state assertions.
- **Components** — encapsulate reusable UI (Header, Footer, Navigation,
  Hero Slider, Helpful Links, Social Links, Modal, Forms, Tables,
  Pagination, CTA). Use whenever the same UI behavior appears on
  multiple pages.
- **Fixtures** — provide Page Objects, Components, auth state, test data,
  API clients. Must be typed with a single clear responsibility. Must
  not become business-logic containers.
- **Utilities** — stay generic; never page-specific; never a second
  Page Object layer.

## Test vs Page Object — examples

Preferred:

```typescript
test('user can navigate to admissions', async ({ homePage }) => {
    await homePage.navigateToAdmissions();
    await expect(homePage.pageHeading).toHaveText('Admissions');
});
```

Prohibited:

```typescript
test('user can navigate to admissions', async ({ page }) => {
    await page.getByRole('link', { name: 'Admissions' }).click();
    await expect(page.getByRole('heading', { name: 'Admissions' })).toBeVisible();
});
```

### Page-level Playwright APIs are not automatically POM violations

Allowed directly in tests when they represent legitimate, test-specific
scenario state:

```typescript
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForLoadState('domcontentloaded');
await page.waitForURL(/home/);
await page.reload();
```

But locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`,
`getByTitle`, `getByTestId`, `locator`) and UI interactions (`click`,
`fill`, `check`, `selectOption`, `hover`, `press`) belong in Page
Objects/Components when they represent application UI behavior.

Navigation should normally be encapsulated:

```typescript
async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
}
```

then call `await homePage.navigate();` rather than `await page.goto('/');`.

## Page Object rules

May contain: locators, page actions/workflows, navigation, page-specific
sync, reusable page-state assertions, Component composition.

Must not become: containers for unrelated business workflows, global
utilities, or duplicated Component logic ("God Object"). If a Page Object
grows large due to reusable UI sections, extract those into Components.
Prefer composition over inheritance; don't build inheritance hierarchies
just to share simple locators.

## WordPress page & template rules

Before creating a new Page Object, determine whether the target page:

1. Has a unique layout.
2. Has unique behavior.
3. Uses an existing WordPress template.
4. Shares behavior with an existing Page Object.
5. Uses existing reusable Components.

**One URL does not necessarily equal one Page Object.** If `/about`,
`/learning`, `/school-life` share the same template/structure/behavior,
do not create `AboutPage.ts`, `LearningPage.ts`, `SchoolLifePage.ts` —
prefer a reusable Page Object or template-level abstraction. Create
separate Page Objects only when pages have materially different
behavior, layout, or workflows.

## WordPress Component rules

Current reusable Components (reuse before duplicating):

```
pages/components/
├── Header.ts        - logo, header controls, top-level interactions
├── NavigationMenu.ts - main nav, links, dropdowns, multi-level nav
├── HeroSlider.ts     - hero slides, next/prev controls, hero CTA
├── HelpfulLinks.ts   - helpful links section, link cards
├── SocialLinks.ts    - social media links, external nav
└── Footer.ts         - footer visibility, links, sections, copyright
```

Do not create `HomeHeader`, `AboutHeader`, `AdmissionsHeader`, etc. for
the same UI behavior — reuse `Header`. Create specialized Components only
when the underlying behavior is materially different.

**Component ownership:** each reusable UI behavior has exactly one
logical owner (e.g. the logo locator lives in `Header`, not duplicated
across `HomePage`, `AboutPage`, `AdmissionsPage`...). Page Objects
compose Components rather than duplicating their locators.

## Reuse Before Create

Before creating a new Page Object, Component, Fixture, Utility, Constant,
Data type, Helper, or API client:

```
Already exists?  → Reuse it
Can it be extended? → Extend
Can it be composed? → Compose
Only then → create new code
```

Do not create duplicates like `LoginPage2`, `BasePageNew`, `CommonUtils2`,
`HomeHeader`, `AboutHeader`, `AdmissionsHeader` unless behavior is
genuinely different.

## Avoid over-engineering

Do not create `BasePage`, `AbstractPage`, `GenericPage`, `UIHelper`,
`PageHelper`, `ComponentHelper`, `CommonHelper`, etc. unless there is a
concrete architectural/reuse requirement. Existing Page Objects alone are
not justification for a BasePage. Prefer the simplest design that
satisfies the framework rules; don't wrap simple Playwright APIs unless
the wrapper adds real framework behavior.

## Future Page Object decision tree

```
New Page/Test Requirement
  → Existing Page Object supports it?      YES → reuse it
  → Existing template/PO abstraction fits?  YES → reuse/extend it
  → Existing Component provides the UI?     YES → compose it
  → Is the behavior genuinely reusable?     YES → create Component
  → otherwise                                    → create focused Page Object logic
```

Never create a new Page Object simply because a new URL exists.

## Target final structure

```
school_webtesting/
├── .agents/
├── .husky/
├── fixtures/test-fixtures.ts
├── pages/
│   ├── HomePage.ts
│   ├── [OtherPageObjects].ts
│   └── components/
│       ├── Header.ts, NavigationMenu.ts, HeroSlider.ts,
│       ├── HelpfulLinks.ts, SocialLinks.ts, Footer.ts
│       └── [ReusableComponents].ts
├── test-data/[TypedJSONData].json
├── tests/home/ about/ learning/ school-life/ admissions/ [OtherSuites]/
├── utils/constants.ts, helpers.ts, test-data.ts
├── api/[APIClientsWhenRequired]/
├── eslint.config.ts, playwright.config.ts, tsconfig.json, package.json
└── README.md
```

Evolve incrementally — do not reorganize the entire framework unless
explicitly required.

## Mandatory layering (never reversed)

```
TEST        "What are we validating?"
FIXTURE     "What dependencies does the test need?"
PAGE OBJECT "How does this page behave?"
COMPONENT   "How does this reusable UI behave?"
LOCATOR     "How is the UI element identified?"
```

Tests must not become Page Objects. Page Objects must not become
Utilities. Utilities must not become Page Objects. Fixtures must not
become business-logic containers. Components must not become unrelated
page containers.
