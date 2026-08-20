# Quality Gate, Debugging, Refactoring, Execution Rules

## Quality gate (check before considering any change complete)

```
✓ Code follows framework architecture
✓ Tests contain business behavior only
✓ Page Objects contain UI implementation
✓ Components are reused appropriately
✓ WordPress templates are reused where appropriate
✓ Shared locators are not duplicated
✓ Locators are stable and semantic
✓ Assertions follow correct ownership
✓ No arbitrary waits
✓ Tests are independent
✓ Test data is typed
✓ Static expected content is externalized where appropriate
✓ Dynamic data is generated or retrieved correctly
✓ No unnecessary any
✓ No secrets
✓ Existing utilities are reused where appropriate
✓ Existing Components are reused where appropriate
✓ ESLint passes
✓ Prettier passes
✓ TypeScript type checking passes
✓ Relevant Playwright tests pass
```

Use the project's existing npm scripts (check `package.json` first —
don't invent validation commands).

## Agent execution rules

Before modifying the framework, inspect: repo structure, existing
tests, Page Objects, Components, fixtures, test data, utilities, API
clients (if any), `package.json`, Playwright config, TS config, ESLint
config, Prettier config, Git hooks. Preserve existing conventions.

Must NOT:

- Rewrite unrelated files, add unnecessary dependencies.
- Disable quality rules, weaken TypeScript strictness.
- Introduce another test framework.
- Duplicate existing framework logic.
- Add arbitrary waits, or put selectors directly into tests.
- Commit secrets, or hide failures with retries/delays.
- Create duplicate Page Objects for identical WordPress templates.
- Duplicate shared Components.
- Copy dynamic runtime values into static JSON without justification.
- Read a UI value and use that same value as its own expected value.
- Create a new utility when existing functionality can be reused.
- Create abstractions only for theoretical future reuse.
- Create a BasePage without a concrete project requirement.

## Debugging & flaky tests

Investigate failures in this order: error message → locator → page
state → URL → synchronization → application behavior → test data →
fixture state → authentication → browser-specific behavior.

For flakiness, determine the cause: unstable locator, race condition,
missing synchronization, shared test data, auth state, network
dependency, application defect, incorrect dynamic-data expectation,
WordPress/CMS content change, or browser-specific behavior. Fix the
underlying issue — never solve flakiness by blindly adding waits or
increasing timeouts.

## Refactoring rules

General: preserve existing behavior, reduce duplication, improve
maintainability/locator stability/type safety/Component reuse/Page
Object boundaries, keep changes focused, avoid unrelated changes, run
relevant tests afterward.

Refactoring WordPress pages:

1. Determine unique vs template-based.
2. Identify existing reusable Components.
3. Reuse existing Page Objects where appropriate.
4. Extract duplicated UI behavior into Components.
5. Don't create duplicate abstractions.
6. Preserve existing test behavior.

Refactoring hardcoded data:

1. Determine static vs dynamic.
2. If static, externalize into typed test data.
3. If dynamic, derive/retrieve from the correct runtime source.
4. Don't merely relocate the hardcoded value into JSON.

Do not perform large architectural refactors while implementing an
unrelated single test or bug fix.

## Final definition of done

1. Correct framework layer used.
2. Tests remain business-readable.
3. Page Objects encapsulate UI implementation.
4. Components reused appropriately.
5. WordPress shared templates reused where appropriate.
6. Shared locators not duplicated.
7. Locators follow the required hierarchy.
8. Assertions follow correct ownership rules.
9. Tests independent and deterministic.
10. Test data properly typed.
11. Static expected data externalized where appropriate.
12. Dynamic data generated/retrieved correctly.
13. No arbitrary waits introduced.
14. No unnecessary `any` introduced.
15. No secrets introduced.
16. Existing project conventions preserved.
17. Existing utilities reused where appropriate.
18. Existing Components reused where appropriate.
19. No unnecessary abstractions introduced.
20. No duplicate Page Objects introduced.
21. ESLint passes.
22. Formatting passes.
23. TypeScript type checking passes.
24. Relevant Playwright tests pass.
25. No unrelated changes included.
