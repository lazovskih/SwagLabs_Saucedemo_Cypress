import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  pageTitleText = "Your Cart";
  pageUrl = "/cart.html";

  // Page locators
  readonly cartItems = { fieldName: "cart-item", locator: ".cart_item" };
  readonly checkoutButton = { fieldName: "checkout-button", locator: '[data-test="checkout"]' };
  readonly continueShoppingButton = { fieldName: "continue-shopping-button", locator: '[data-test="continue-shopping"]' };
  readonly primaryHeader = { fieldName: "primary-header", locator: '[data-test="title"]' };

  constructor() {
    super();
  }

  /**
   * Get product count
   * @param productName
   * @returns Promise<number>
   */
  getProductCount(productName: string): Cypress.Chainable<number> {
    return cy.get(this.cartItems.locator).filter(`:contains("${productName}")`).its("length");
  }

  /**
   * Get item count
   * @returns Promise<number>
   */
  getItemCount(): Cypress.Chainable<number> {
    return cy.get(this.cartItems.locator).its("length");
  }

  /**
   * Start checkout
   */
  async startCheckout() {
    cy.get(this.checkoutButton.locator).click();
  }

  /**
   * Click remove button
   * @param productName
   * @returns Promise<Locator>
   */
  async clickRemoveButton(productName: string) {
    cy.get(`[data-test="remove-${this.getProductId(productName)}"]`).click();
  }

  /**
   * Get remove button
   * @param productName
   * @returns Promise<Locator>
   */
  getRemoveButton(productName: string) {
    return cy.get(`[data-test="remove-${this.getProductId(productName)}"]`);
  }

  /**
   * Remove product from cart
   * @param productName
   */
  async removeProduct(productName: string) {
    this.clickRemoveButton(productName).then(() => {
      console.log(`removeProductFromCart: Product removed from cart: ${productName}`);
    });
  }

  /**
   * Remove multiple products from cart
   * @param productNames
   */
  async removeProductsFromCart(productNames: string[]) {
    for (const productName of productNames) {
      console.log(`Removing product from cart: ${productName}`);
      await this.removeProduct(productName);
    }
  }

  // /**
  //  * Remove product
  //  * @param productName
  //  */
  // async removeProduct(productName: string) {
  //   const productId = productName.toLowerCase().replace(/\s+/g, "-");
  //   cy.get(`[data-test="remove-${productId}"]`).click();
  // }
  // /**
  //  * Click remove button
  //  * @param productName
  //  * @returns Promise<Locator>
  //  */
  // async clickRemoveButton(productName: string) {
  //   cy.get(`[data-test="remove-${this.getProductId(productName)}"]`).click();
  // }
  // /**
  //  * Remove product from cart
  //  * @param productName
  //  */
  // async removeProductFromCart(productName: string) {
  //   this.clickRemoveButton(productName).then(() => {
  //     console.log(`removeProductFromCart: Product removed from cart: ${productName}`);
  //   });
  // }
  /**
   * Continue shopping
   */
  async continueShopping() {
    cy.get(this.continueShoppingButton.locator).click();
  }
}
