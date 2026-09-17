import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  pageTitleText = "Products";
  pageUrl = "/inventory.html";

  // Page locators
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
   * @param productName
   * @returns Promise<Locator>
   */
  async clickAddToCartButton(productName: string) {
    cy.get(`[data-test="add-to-cart-${this.getProductId(productName)}"]`).click();
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
  getAddToCartButton(productName: string) {
    return cy.get(`[data-test="add-to-cart-${this.getProductId(productName)}"]`);
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
   * Add product to cart
   * @param productName
   */
  async addProductToCart(productName: string) {
    this.clickAddToCartButton(productName).then(() => {
      console.log(`addProductToCart: Product added to cart: ${productName}`);
    });
  }

  /**
   * Remove product from cart
   * @param productName
   */
  async removeProductFromCart(productName: string) {
    this.clickRemoveButton(productName).then(() => {
      console.log(`removeProductFromCart: Product removed from cart: ${productName}`);
    });
  }

  /**
   * Add multiple products to cart
   * @param productNames
   */
  async addProductsToCart(productNames: string[]) {
    for (const productName of productNames) {
      console.log(`Adding product to cart: ${productName}`);
      await this.addProductToCart(productName);
    }
  }

  /**
   * Remove multiple products from cart
   * @param productNames
   */
  async removeProductsFromCart(productNames: string[]) {
    for (const productName of productNames) {
      console.log(`Removing product from cart: ${productName}`);
      await this.removeProductFromCart(productName);
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
