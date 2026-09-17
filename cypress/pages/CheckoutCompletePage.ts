import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
  pageUrl = "/checkout-complete.html";

  // Page title element and text
  pageTitle = { fieldName: "page-title", locator: '[data-test="title"]', text: "Checkout: Complete!" };

  // Checkout Complete page elements
  readonly primaryHeader = { fieldName: "primary-header", locator: "div.login_logo" };
  private readonly thankYouMessage = { fieldName: "Thank You Message", locator: '[data-test="complete-header"]' };
  private readonly orderDispatchMessage = { fieldName: "Order Dispatch Message", locator: '[data-test="complete-text"]' };
  private readonly backToProductsButton = { fieldName: "back to products button", locator: '[data-test="back-to-products"]' };

  constructor() {
    super();
  }
}
