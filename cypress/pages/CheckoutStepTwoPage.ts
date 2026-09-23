import { BasePage } from "./BasePage";
import { parseCurrencyToNumber } from "../utilities/formatters";

export class CheckoutStepTwoPage extends BasePage {
  pageUrl = "/checkout-step-two.html";

  // Page title element and text
  pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "Checkout: Overview" };

  // Checkout page elements - Step Two (Overview)
  private readonly summaryInfo = { fieldName: "summary-info", locator: '[data-test="summary-info"]' };
  private readonly summarySubtotal = { fieldName: "subtotal-label", locator: '[data-test="subtotal-label"]' };
  private readonly summaryTax = { fieldName: "tax-label", locator: '[data-test="tax-label"]' };
  private readonly summaryTotal = { fieldName: "total-label", locator: '[data-test="total-label"]' };
  private readonly finishButton = { fieldName: "finish", locator: '[data-test="finish"]' };
  private readonly cancelLink = { fieldName: "cancel", locator: '[data-test="cancel"]' };
  readonly primaryHeader = { fieldName: "primary-header", locator: '[data-test="title"]' };

  constructor() {
    super();
  }

  /**
   * Retrieves the Subtotal amount as a parsed number.
   * @returns total as number
   */
  public getSubtotal(): Cypress.Chainable<number> {
    return cy
      .get(this.summarySubtotal.locator)
      .invoke("text")
      .then((rawText) => parseCurrencyToNumber(rawText));
  }

  /**
   * Retrieves the Tax amount as a parsed number.
   * @returns total as number
   */
  public getTax(): Cypress.Chainable<number> {
    return cy
      .get(this.summaryTax.locator)
      .invoke("text")
      .then((rawText) => parseCurrencyToNumber(rawText));
  }

  /**
   * Retrieves the Total amount as a parsed number.
   * @returns total as number
   */
  public getTotal(): Cypress.Chainable<number> {
    return cy
      .get(this.summaryTotal.locator)
      .invoke("text")
      .then((rawText) => parseCurrencyToNumber(rawText));
  }

  /**
   * Click finish button
   */
  async clickFinish() {
    cy.get(this.finishButton.locator).click();
  }

  /**
   * Finish the order by clicking the finish button
   */
  async finishOrder() {
    cy.get(this.finishButton.locator).click();
  }
}
