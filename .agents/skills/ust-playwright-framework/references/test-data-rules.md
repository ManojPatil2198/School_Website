# Test Data & Hardcoding Rules

## Structure

```
test-data/
├── users/users.json
├── homepage/homepage-data.json
├── admissions/admissions-data.json
├── learning/learning-data.json
├── school-life/school-life-data.json
├── navigation/navigation-data.json
└── environments/dev.json, staging.json, production.json
```

Do not create this whole tree preemptively — add files based on actual
test requirements. No credentials committed; use env vars / approved
secret management. Keep test data separate from Page Objects/tests.
Static expected content (headings, section titles, nav labels, button
labels, expected descriptions, controlled form values) may live in JSON.

## Typed test data

All structured test data must have TypeScript contracts, e.g.:

```typescript
interface UserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
```

Avoid `const data: any = response;` — prefer explicit types or
`unknown` + safe narrowing. Use builders/factories once data becomes
complex, reusable, dynamic, or highly variable. Reuse `utils/test-data.ts`
for typed loading/contracts.

## Static vs dynamic — decision

```
Is the value intentionally controlled by the test?
  YES → Static Test Data (JSON / typed data)
  NO  → Is the value generated at runtime?
          YES → Generate/derive it at runtime
          NO  → Does the value come from API/CMS/DB?
                  YES → Retrieve expected value from that authoritative source
                  NO  → Determine correct environment/configuration source
```

**Static expected test data** — valid when verifying known, controlled
business content:

```json
{ "communitySection": { "title": "Close-Knit, Family-Oriented Atmosphere" } }
```

Moving a hardcoded value from a test into JSON does **not** by itself
make it correctly handled dynamic data.

**Dynamic application data** — never hardcode values meant to change at
runtime: current year/date, timestamps, generated IDs, order numbers,
cart counts, dynamic prices, API/DB-generated values, environment-specific
values, dynamic availability. Example:

```typescript
const currentYear = new Date().getFullYear();
await expect(copyrightText).toContainText(`© All Rights Reserved, UST ${currentYear}`);
```

Do NOT hardcode `"copyright": "© All Rights Reserved, UST 2025"` in JSON
if the app shows the current year automatically.

## API/CMS/DB-driven data

Determine whether the test validates (1) known expected business content
or (2) correct rendering of runtime data. For runtime data, source
expected values from the authoritative system:

```
API / CMS / Database → Expected Runtime Data → API Client / Fixture
  → Page Object → UI Assertion
```

Never do this:

```typescript
const actualText = await locator.textContent();
await expect(locator).toHaveText(actualText); // not meaningful validation
```

## Hardcoding rules

Allowed: stable technical values or intentionally controlled test data,
e.g. `{ width: 390, height: 844 }`, `{ "productName": "iMac" }`,
`await expect(page).toHaveURL(/\/home/);`.

Avoid hardcoding values expected to change independently of the test:
current year/date, generated IDs, random values, environment URLs,
dynamic API/DB data, dynamic prices/availability. Moving such a value
into JSON does not remove the problem — classify it correctly as
static test data / runtime-generated / environment config / API-CMS
data / DB-fixture data, and handle accordingly.
