import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
  pageUrl = "/checkout-complete.html";

  // Page title element and text
  pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "Checkout: Complete!" };

  // Checkout Complete page elements
  readonly primaryHeader = {
    fieldName: "primary-header",
    locator: "div.login_logo",
  };
  readonly completeHeader = {
    fieldName: "Thank You Message",
    locator: '[data-test="complete-header"]',
    text: "Thank you for your order!",
  };
  readonly orderDispatchMessage = {
    fieldName: "Order Dispatch Message",
    locator: '[data-test="complete-text"]',
    text: "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  };
  readonly backToProductsButton = {
    fieldName: "back to products button",
    locator: '[data-test="back-to-products"]',
    text: "Back Home",
  };

  readonly generatePDForderButton = {
    elementName: "Generate PDF order button",
    locator: '[data-test="generate-pdf-order"]',
    text: "Generate PDF order",
  };

  private readonly completeText = { fieldName: "complete-text", locator: '[data-test="complete-text"]' };
  private readonly backHomeButton = { fieldName: "back-home", locator: '[data-test="back-home"]' };

  constructor() {
    super();
  }

  /**
   * Get complete text
   * @returns string
   */
  getCompleteText(): Cypress.Chainable<string> {
    return cy.get(this.completeText.locator).invoke("text");
  }

  /**
   * Click back home button
   */
  clickBackHome() {
    cy.get(this.backHomeButton.locator).click();
  }

  /**
   * Get the complete header text after finishing the order
   * @returns string
   */
  getCompleteHeaderText() {
    return cy.get(this.completeHeader.locator).invoke("text");
  }
}
