import { BasePage } from "./BasePage";

export class CheckoutStepTwoPage extends BasePage {
  pageUrl = "/checkout-step-two.html";

  // Page title element and text
  pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "Checkout: Overview" };

  // Checkout page elements - Step Two (overview)
  private readonly summaryInfo = { fieldName: "summary-info", locator: '[data-test="summary-info"]' };
  private readonly summarySubtotal = { fieldName: "subtotal-label", locator: '[data-test="subtotal-label"]' };
  private readonly summaryTax = { fieldName: "tax-label", locator: '[data-test="tax-label"]' };
  private readonly summaryTotal = { fieldName: "total-label", locator: '[data-test="total-label"]' };
  private readonly finishButton = { fieldName: "finish", locator: '[data-test="finish"]' };
  private readonly cancelLink = { fieldName: "cancel", locator: '[data-test="cancel"]' };

  // Checkout complete page elements
  private readonly completeHeader = { fieldName: "complete-header", locator: '[data-test="complete-header"]' };
  private readonly completeText = { fieldName: "complete-text", locator: '[data-test="complete-text"]' };
  private readonly backHomeButton = { fieldName: "back-home", locator: '[data-test="back-home"]' };
  readonly primaryHeader = { fieldName: "primary-header", locator: '[data-test="title"]' };

  constructor() {
    super();
  }
  // ===== Step Two: Overview =====

  /**
   * Get summary subtotal text
   */
  getSubtotal(): Cypress.Chainable<string> {
    let subtotalText;
    return cy.get(this.summarySubtotal.locator).then((el) => {
      subtotalText = el.text();
      // Extract numeric part from "Item total: $39.98" -> "39.98"
      const match = subtotalText?.match(/\$(\d+\.?\d*)/);
      return match ? match[1] : "";
    });
  }

  /**
   * Get summary tax text
   */
  getTax(): Cypress.Chainable<string> {
    let taxText;
    return cy.get(this.summaryTax.locator).then((el) => {
      taxText = el.text();
      // Extract numeric part from "Tax: $1.92" -> "1.92"
      const match = taxText?.match(/\$(\d+\.?\d*)/);
      return match ? match[1] : "";
    });
  }

  /**
   * Get summary total text
   */
  getTotal(): Cypress.Chainable<string> {
    let totalText;
    return cy.get(this.summaryTotal.locator).then((ele) => {
      totalText = ele.text();
      // Extract numeric part from "Total: $41.90" -> "41.90"
      const match = totalText?.match(/\$(\d+\.?\d*)/);
      return match ? match[1] : "";
    });
  }

  /**
   * Click finish button
   */
  clickFinish() {
    cy.get(this.finishButton.locator).click();
  }

  // ===== Step Three: Complete =====

  /**
   * Get complete header text
   */
  getCompleteHeader(): Cypress.Chainable<string> {
    return cy.get(this.completeHeader.locator).invoke("text");
  }

  /**
   * Get complete text
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
   * Check if checkout is complete
   */
  isCheckoutComplete() {
    return cy.get(this.completeHeader.locator).should("be.visible");
  }

  /**
   * Finish the order by clicking the finish button
   */
  async finishOrder() {
    cy.get(this.finishButton.locator).click();
  }

  /**
   * Get the complete header text after finishing the order
   */
  getCompleteHeaderText() {
    return cy.get(this.completeHeader.locator).invoke("text");
  }
}
