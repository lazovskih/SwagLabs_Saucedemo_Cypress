export abstract class BasePage {
  abstract pageUrl: string;
  readonly pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "" };

  private readonly mainMenuButton = { fieldName: "main-menu-button", locator: "#react-burger-menu-btn" };
  private readonly sideMenu = { fieldName: "side-menu", locator: ".bm-menu" };

  private readonly allItemsMenu = { fieldName: "all-items-menu", locator: '[data-test="inventory-sidebar-link"]' };
  private readonly AboutMenu = { fieldName: "about-menu", locator: '[data-test="about-sidebar-link"]' };
  private readonly logoutMenu = { fieldName: "logout-menu", locator: "#logout_sidebar_link" };

  abstract primaryHeader: { fieldName: string; locator: string };

  constructor() {}

  /**
   * Wait for a page to open and verify that it is ready.
   * @returns
   */
  open() {
    cy.env(["BASEURL"]).then((env): undefined => {
      if (typeof env.BASEURL !== "string" || env.BASEURL.length === 0) {
        throw new Error("The Cypress BASEURL environment variable must be configured.");
      }
      cy.visit(env.BASEURL + this.pageUrl, { failOnStatusCode: false });

      this.isLoaded();
    });
  }

  /**
   * Wait for a page to load
   * @returns
   */
  isLoaded(): Cypress.Chainable<boolean> {
    return cy
      .get(this.pageTitle.locator)
      .should("be.visible")
      .then(() => {
        return true;
      });
  }

  /**
   * Get page title text
   * @returns Promise<string | null>
   */
  getPageTitle(): Cypress.Chainable<string> {
    return cy.get(this.pageTitle.locator).invoke("text");
  }

  /**
   * Get current URL
   * @returns Promise<string>
   */
  getCurrentUrl(): Cypress.Chainable<string> {
    return cy.url();
  }

  /**
   * Click on menu button
   */
  async clickMenuButton(): Promise<void> {
    cy.get(this.mainMenuButton.locator).click();
    cy.get(this.sideMenu.locator).should("be.visible");
  }

  /**
   * Click on "Logout" menu link
   */
  async clickLogoutMenu(): Promise<void> {
    this.clickMenuButton();
    cy.get(this.logoutMenu.locator).click();
  }

  /**
   * Get product ID
   * @param productName
   * @returns Promise<string>
   */
  getProductId(productName: string) {
    return productName.toLowerCase().replace(/\s+/g, "-");
  }
}
