/// <reference types="cypress" />
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

describe("Login page tests", () => {
  /**
   * Login Test Scenarios for SauceDemo
   */
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  beforeEach("Login page", () => {
    loginPage = new LoginPage();
    productsPage = new ProductsPage();

    // Navigate to login page
    loginPage.open();
  });

  /**
   * Scenario 1: Login as standard user with valid password - successful
   * Verify "Products" page opened
   */
  it("Login with valid credentials - successful", () => {
    // Login with valid credentials
    cy.env(["USERNAME", "PASSWORD"]).then((env) => {
      const { USERNAME, PASSWORD } = env;
      if (typeof USERNAME !== "string" || typeof PASSWORD !== "string") {
        throw new Error("The Cypress username and PASSWORD environment variables must be configured.");
      }
      loginPage.login(USERNAME, PASSWORD);

      // Verify Products page is displayed
      productsPage.getCurrentUrl().should("contain", productsPage.pageUrl);
      productsPage.getPageTitle().should("equal", productsPage.pageTitleText);
    });
  });

  /**
   * Scenario 2: Login as standard user with invalid password - unsuccessful
   * Verify error message displayed
   */
  it("Login with invalid password - unsuccessful", () => {
    // Login with invalid password
    cy.env(["USERNAME", "PASSWORD"]).then((env) => {
      const { USERNAME, PASSWORD } = env;
      if (typeof USERNAME !== "string") {
        throw new Error("The Cypress USERNAME environment variable must be configured.");
      }

      cy.get(loginPage.usernameField.locator).clear().type(USERNAME);
      cy.get(loginPage.passwordField.locator).clear().type("invalid_password");
      cy.get(loginPage.loginButton.locator).click();

      // Verify error message is displayed
      cy.get(loginPage.errorMessage.locator).should("be.visible");
      loginPage.getErrorMessageText().should("equal", loginPage.errorMessageText);

      // Verify still on login page
      productsPage.getCurrentUrl().should("match", /.*\/$/);
    });
  });

  /**
   * Scenario 3: Login as standard user, logout, verify Products page not accessible
   */
  it("Login, logout, verify Products page not accessible", () => {
    cy.env(["USERNAME", "PASSWORD", "BASEURL"]).then(({ USERNAME, PASSWORD, BASEURL }) => {
      if (typeof USERNAME !== "string" || typeof PASSWORD !== "string") {
        throw new Error("The Cypress USERNAME and PASSWORD environment variables must be configured.");
      }
      // Login with valid credentials
      loginPage.login(USERNAME, PASSWORD);

      // Verify Products page is displayed
      productsPage.getCurrentUrl().should("match", /.*inventory.html/);

      // Click logout
      productsPage.clickLogoutMenu();

      // Verify redirected to login page
      productsPage.getCurrentUrl().should("match", /.*\/$/);

      // Try to navigate directly to Products page
      if (typeof BASEURL !== "string") {
        throw new Error("The Cypress BASEURL environment variable must be configured.");
      }
      cy.visit(BASEURL + productsPage.pageUrl, { failOnStatusCode: false });

      // Verify redirected back to login page (not accessible)
      productsPage.getCurrentUrl().should("match", /.*\/$/);
    });
  });
});
