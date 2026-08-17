import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: [
            'node_modules/**',
            'playwright-report/**',
            'test-results/**',
            'coverage/**',
            'dist/**',
            'scratch_inspect.spec.ts',
            'scratch/**',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    playwright.configs['flat/recommended'],
    eslintConfigPrettier,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-floating-promises': 'error',
            'playwright/no-focused-test': 'error',
            'playwright/no-skipped-test': 'error',
            'playwright/valid-expect': 'error',
            'playwright/no-wait-for-timeout': 'error',
            'playwright/expect-expect': 'off',
        },
    },
);
