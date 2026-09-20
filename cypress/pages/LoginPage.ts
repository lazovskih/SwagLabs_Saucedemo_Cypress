/// <reference types="cypress" />
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly pageUrl = "/";

  // Page title element and text
  pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "Swag Labs" };

  // Page elements
  readonly usernameField = { fieldName: "Username", locator: '[data-test="username"]' };
  readonly passwordField = { fieldName: "password", locator: '[data-test="password"]' };
  readonly loginButton = { fieldName: "login-button", locator: '[data-test="login-button"]' };
  readonly errorMessage = { fieldName: "error", locator: '[data-test="error"]' };
  readonly primaryHeader = { fieldName: "primary-header", locator: "div.login_logo" };

  readonly errorMessageText = "Epic sadface: Username and password do not match any user in this service";
  readonly noAccessMessageText = "Epic sadface: You can only access '/inventory.html' when you are logged in.";

  constructor() {
    super();
  }

  /**
   * Wait for a page to open and verify that it is ready.
   * @returns
   */
  open() {
    cy.env(["BASEURL"]).then((env): undefined => {
      if (typeof env.BASEURL !== "string" || env.BASEURL.length === 0) {
        throw new Error("The Cypress BASEURL environment variable must be configured.");
      }
      cy.visit(env.BASEURL + this.pageUrl);
    });
  }

  /**
   * Login with username and password.
   */
  login(username: string, password: string) {
    this.open();
    cy.get(this.usernameField.locator).clear().type(username);
    cy.get(this.passwordField.locator).clear().type(password);
    cy.get(this.loginButton.locator).click();
    cy.get('[data-test="inventory-item"]').first().should("be.visible");
  }

  /**
   * Login as locked out user.
   */
  loginAsLockedOutUser() {
    return cy.env(["STANDARD_USER", "DEMO_PASSWORD"]).then(({ username, PASSWORD }) => {
      if (typeof username !== "string" || typeof PASSWORD !== "string") {
        throw new Error("The Cypress username and PASSWORD environment variables must be configured.");
      }

      return this.login(username, PASSWORD);
    });
  }

  /**
   * Check if the error message is visible.
   */
  isErrorMessageVisible(): Cypress.Chainable<boolean> {
    return cy.get(this.errorMessage.locator).then(($element) => $element.is(":visible"));
  }

  /**
   * Gets the error message text.
   * @returns error message text string.
   */
  getErrorMessageText(): Cypress.Chainable<string> {
    return cy.get(this.errorMessage.locator).invoke("text");
  }

  /**
   * Clear the username field.
   */
  clearUsername(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.usernameField.locator).clear();
  }

  /**
   * Clear the password field.
   */
  clearPassword(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.passwordField.locator).clear();
  }
}
