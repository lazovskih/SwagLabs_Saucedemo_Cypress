import { Product } from "../support/types/product";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  pageUrl = "/cart.html";

  // Page title element and text
  pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "Your Cart" };

  // Page elements
  readonly cartItems = { fieldName: "cart-item", locator: ".cart_item" };
  readonly checkoutButton = { fieldName: "checkout-button", locator: '[data-test="checkout"]' };
  readonly continueShoppingButton = { fieldName: "continue-shopping-button", locator: '[data-test="continue-shopping"]' };
  readonly primaryHeader = { fieldName: "primary-header", locator: '[data-test="title"]' };

  constructor() {
    super();
  }

  /**
   * Get product count
   * @param product object
   * @returns Promise<number>
   */
  getProductCount(product: Product): Cypress.Chainable<number> {
    return cy.get(this.cartItems.locator).filter(`:contains("${product.Name}")`).its("length");
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
   * @param product product object
   * @returns Promise<Locator>
   */
  async clickRemoveButton(product: Product) {
    cy.get(`[data-test="remove-${this.getProductId(product)}"]`).click();
  }

  /**
   * Get remove button
   * @param product product object
   * @returns Promise<Locator>
   */
  getRemoveButton(product: Product) {
    return cy.get(`[data-test="remove-${this.getProductId(product)}"]`);
  }

  /**
   * Remove product from cart
   * @param product product object
   */
  async removeProduct(product: Product) {
    this.clickRemoveButton(product);
  }

  /**
   * Remove multiple products from cart
   * @param product product objects array
   */
  async removeProductsFromCart(products: Product[]) {
    for (const product of products) {
      await this.removeProduct(product);
    }
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    cy.get(this.continueShoppingButton.locator).click();
  }
}
