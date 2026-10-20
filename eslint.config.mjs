// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import cypressPlugin from 'eslint-plugin-cypress';

export default tseslint.config(
  // 1. Global JS recommendation
  js.configs.recommended,

  // 2. Cypress & TypeScript test specs
  {
    files: ['cypress/**/*.ts', '**/*.cy.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      cypress: cypressPlugin,
    },
   rules: {
      // 1. Prevent using async/await inside Cypress tests
      'cypress/no-async-tests': 'error',

      // 2. Prevent chaining after actions (Cypress best practice)
      'cypress/no-unnecessary-waiting': 'error', // Flags cy.wait(4000) hardcoded sleeps

      // 3. Prevent assigning cy commands to variables (const x = cy.get(...))
      'cypress/no-assigning-return-values': 'error',

      // 4. Ensure assertions are properly chained
      'cypress/assertion-before-screenshot': 'warn',

      // 5. Turn off no-undef for TypeScript files, as tsc handles type definitions
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  // 3. Ignored directories
  {
    ignores: ['cypress/videos/**', 'cypress/screenshots/**', 'node_modules/**'],
  }
);