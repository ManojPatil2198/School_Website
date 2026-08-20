# TypeScript, Naming, Utilities, Config, API Testing, Security

## TypeScript standards

Strict mode mandatory; the framework should enable:

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "strictBindCallApply": true,
        "strictPropertyInitialization": true,
        "noImplicitThis": true,
        "useUnknownInCatchVariables": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true
    }
}
```

Avoid `any`; prefer explicit types for public contracts; use `unknown`
for genuinely unknown values; avoid unnecessary type assertions; use
type-only imports where appropriate; never weaken strictness just to
make code compile.

## Naming & imports

```
Classes    → PascalCase   (HomePage, LoginPage)
Methods    → camelCase    (searchForProduct(), login())
Variables  → camelCase
Types      → PascalCase   (UserData)
Constants  → UPPER_SNAKE_CASE where appropriate (DEFAULT_TIMEOUT)
```

Follow existing repo conventions if they differ consistently. Imports:
clean, explicit, project-ordered, no unused imports.

## Utilities (`utils/`)

- `constants.ts` — stable app constants, routes, env-independent
  constants, approved timeouts, config flags. No page-specific
  locators/workflows here.
- `helpers.ts` — only genuinely generic reusable logic. No page-specific
  methods.
- `test-data.ts` — typed test-data contracts, loading, generic access.
  No application UI actions here.

Reuse these before creating new utility files.

## API testing

Keep API clients separate from UI Page Objects:

```
API Client → API Fixture → Test
```

Type request/response models. When API data validates UI rendering:

```
API Client → Typed API Response → Test/Fixture → Page Object → UI Assertion
```

Don't duplicate API-generated values as static JSON when the test's
purpose is validating runtime API-to-UI sync.

## Error handling

Don't silently swallow errors:

```typescript
try {
    await someAction();
} catch {} // avoid
```

Use try/catch only when the error can be handled meaningfully or
enriched with context. Avoid stray `console.log()` in committed code —
use Playwright traces/screenshots/videos/reports for debugging instead.

## Playwright configuration

Centralize global config in `playwright.config.ts` (base URL, projects,
browsers, retries, workers, timeouts, reporter, trace, screenshot,
video, storage state, web server, device configs). Don't duplicate
global config inside individual tests. Don't inflate timeouts to hide
failures.

Prefer projects/device config for viewports/devices shared across many
tests:

```typescript
projects: [{ name: 'mobile', use: { ...devices['iPhone 13'] } }];
```

Manual `setViewportSize` calls are fine when the exact viewport is part
of one specific test scenario.

## ESLint & Prettier

Follow existing `eslint.config.ts` / `.prettierrc.json` /
`.prettierignore`. Fix violations, format changed files, avoid global
disables (`/* eslint-disable */`) — use the smallest possible exception
only when genuinely necessary. Prettier is the formatting authority.

## Git hooks

Preserve `.husky/` hooks and `lint-staged` config. Don't bypass hooks to
force a change through; don't remove/weaken pre-commit checks without
explicit requirement.

## Security

Never commit passwords, API keys, access tokens, private keys, client
secrets, or session tokens. If secrets are discovered in the repo, don't
copy them into new files — use env vars or the project's approved
secret-management method. Test-data files must not contain real
credentials.
