import { Product } from "../support/types/product";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  pageTitleText = "Products";
  pageUrl = "/inventory.html";

  // Page elements
  readonly inventoryItems = { fieldName: "inventory-item", locator: '[data-test="inventory-item"]' };
  readonly cardBageHolder = { fieldName: "shopping-cart-badge", locator: '[data-test="shopping-cart-link"]' };
  readonly cartBadge = { fieldName: "shopping-cart-badge", locator: '[data-test="shopping-cart-badge"]' };
  readonly shoppingCartLink = { fieldName: "shopping-cart-link", locator: '[data-test="shopping-cart-link"]' };
  readonly primaryHeader = { fieldName: "title", locator: '[data-test="title"]' };

  constructor() {
    super();
  }

  /**
   * Click add to cart button
   * @param product object
   * @returns Promise<Locator>
   */
  async clickAddToCartButton(product: Product) {
    cy.get(`[data-test="add-to-cart-${this.getProductId(product)}"]`).click();
  }

  /**
   * Click remove button
   * @param product object
   * @returns Promise<Locator>
   */
  async clickRemoveButton(product: Product) {
    cy.get(`[data-test="remove-${this.getProductId(product)}"]`).click();
  }

  /**
   * Get remove button
   * @param product object
   * @returns Promise<Locator>
   */
  getAddToCartButton(product: Product) {
    return cy.get(`[data-test="add-to-cart-${this.getProductId(product)}"]`);
  }

  /**
   * Get remove button
   * @param product object
   * @returns Promise<Locator>
   */
  getRemoveButton(product: Product) {
    return cy.get(`[data-test="remove-${this.getProductId(product)}"]`);
  }

  /**
   * Add product to cart
   * @param product product object
   */
  addProductToCart(product: Product) {
    this.clickAddToCartButton(product);
  }

  /**
   * Remove product from cart
   * @param product product object
   */
  async removeProductFromCart(product: Product) {
    this.clickRemoveButton(product);
  }

  /**
   * Add multiple products to cart
   * @param product product objects array
   */
  addProductsToCart(products: Product[]) {
    for (const product of products) {
      this.addProductToCart(product);
    }
  }

  /**
   * Remove multiple products from cart
   * @param product product objects array
   */
  async removeProductsFromCart(products: Product[]) {
    for (const product of products) {
      await this.removeProductFromCart(product);
    }
  }

  /**
   * Get cart count
   * @returns Promise<number>
   */
  getCartCount(): Cypress.Chainable<number> {
    return cy
      .get(this.cardBageHolder.locator)
      .invoke("text")
      .then((text) => {
        return text ? Number(text.trim()) : 0;
      });
  }

  /**
   * View cart
   */
  async viewCart() {
    cy.get(this.shoppingCartLink.locator).click();
  }
}
