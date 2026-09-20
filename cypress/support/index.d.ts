import { CustomCypressEnv } from "./types/env";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Authenticates a user via UI within a cached `cy.session()`, then navigates
       * directly to the Products Page.
       *
       * @param username - Optional username. Falls back to Cypress.env('USERNAME').
       * @param password - Optional password. Falls back to Cypress.env('PASSWORD').
       *
       * @example
       * cy.loginUI();
       * cy.loginUI('standard_user', 'secret_sauce');
       */
      loginUI(username?: string, password?: string): Chainable<void>;
    }

    interface Cypress {
      env<T extends keyof CustomCypressEnv>(key: T): CustomCypressEnv[T];
      env(): CustomCypressEnv;
    }
  }
}

export {};
