// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
/// <reference types="cypress" />

import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
Cypress.Commands.add("loginUI", (username?: string, password?: string): void => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();

  // 1. Resolve credentials with fallbacks from typed Cypress.env
  const resolvedUsername = username ?? Cypress.env("USERNAME");
  const resolvedPassword = password ?? Cypress.env("PASSWORD");

  if (!resolvedUsername || !resolvedPassword) {
    throw new Error(
      "[AUTH_CONFIG_ERROR]: Credentials must be provided explicitly as arguments " +
        "or defined as 'USERNAME' and 'PASSWORD' in Cypress environment variables.",
    );
  }

  // 2. Configure Session with explicit options matching Cypress.SessionOptions
  const sessionOptions: Cypress.SessionOptions = {
    validate(): void {
      // Assert token/cookie viability on session restoration
      cy.getCookie("session-username").should("exist");
    },
  };

  cy.session(
    ["loginUI", resolvedUsername],
    (): void => {
      // Setup block runs ONLY when cache misses
      loginPage.open();
      loginPage.login(resolvedUsername, resolvedPassword);

      // Verify that authentication completed successfully
      productsPage.getCurrentUrl().should("include", productsPage.pageUrl);
    },
    sessionOptions,
  );

  // 3. Re-hydrate the DOM: cy.session() intentionally clears the DOM upon setup/restoration
  productsPage.open();
  productsPage.getPageTitle().should("equal", productsPage.pageTitleText);
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
