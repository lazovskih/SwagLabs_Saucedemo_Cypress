import { BasePage } from "./BasePage";
import { ShippingData } from "../utilities/dataTypes";

export class CheckoutStepOnePage extends BasePage {
  pageUrl = "/checkout-step-one.html";

  // Page locators
  pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "Checkout: Your Information" };
  readonly firstNameField = { fieldName: "first-name", locator: '[data-test="firstName"]' };
  readonly lastNameField = { fieldName: "last-name", locator: '[data-test="lastName"]' };
  readonly postalCodeField = { fieldName: "postal-code", locator: '[data-test="postalCode"]' };
  readonly continueButton = { fieldName: "continue-button", locator: '[data-test="continue"]' };
  readonly finishButton = { fieldName: "finish-button", locator: '[data-test="finish"]' };
  readonly completeHeader = { fieldName: "complete-header", locator: '[data-test="complete-header"]' };
  readonly primaryHeader = { fieldName: "primary-header", locator: '[data-test="title"]' };

  constructor() {
    super();
  }

  /**
   * Fill shipping information
   * @param firstName
   * @param lastName
   * @param postalCode
   */
  async fillShippingInformation(shippingData: ShippingData) {
    cy.get(this.firstNameField.locator).type(shippingData.FirstName);
    cy.get(this.lastNameField.locator).type(shippingData.LastName);
    cy.get(this.postalCodeField.locator).type(shippingData.PostalCode);
    cy.get(this.continueButton.locator).click();
  }

  /**
   * Finish order
   */
  finishOrder() {
    cy.get(this.finishButton.locator).click();
  }

  /**
   * Get complete header text
   * @returns Promise<string | null>
   */
  getCompleteHeaderText(): Cypress.Chainable<string | null> {
    return cy.get(this.completeHeader.locator).invoke("text");
  }

  async clickContinue() {
    cy.get(this.continueButton.locator).click();
  }
}
