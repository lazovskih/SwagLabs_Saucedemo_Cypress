/// <reference types="cypress" />

import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import products from "../fixtures/products.json";
import shippingInfo from "../fixtures/shipping.json";

describe("Checkout flow", () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  beforeEach(() => {
    // Login with valid credentials from .env or Environment variables on CI/CD
    cy.loginUI("standard_user", "secret_sauce").then(() => {
      productsPage = new ProductsPage();
      cartPage = new CartPage();

      checkoutStepOnePage = new CheckoutStepOnePage();
      checkoutStepTwoPage = new CheckoutStepTwoPage();
      checkoutCompletePage = new CheckoutCompletePage();

      // Navigate directly to the products page using the pre-authenticated state
      productsPage.open();
    });
  });

  it("Completes checkout for a selected product", () => {
    // Add products to cart
    cy.log("Adding products to cart: " + products[0]!!.Name + ", " + products[1]!!.Name);

    productsPage.addProductsToCart([products[0]!.Name, products[1]!.Name]);
    productsPage.getCartCount().then((count) => {
      expect(count).to.equal(2);
    });

    // View cart
    productsPage.viewCart();

    cartPage.getPageTitle().then((title) => {
      expect(title).to.equal(cartPage.pageTitle.text);

      // Start checkout
      cartPage.startCheckout();

      // Fill shipping information ("Checkout: Your Information"))
      checkoutStepOnePage.getPageTitle().then((title) => {
        expect(title, "Checkout step one page title").to.equal(checkoutStepOnePage.pageTitle.text);
      });

      // Fill shipping information and continue to overview page
      checkoutStepOnePage.fillShippingInformation(shippingInfo[0]!);
      checkoutStepTwoPage.getPageTitle().then((title) => {
        expect(title, "Checkout page two page title").to.equal(checkoutStepTwoPage.pageTitle.text);
      });

      // Finish order
      checkoutStepTwoPage.finishOrder();
      checkoutCompletePage.getPageTitle().then((title) => {
        expect(title, "Checkout complete page title").equal(checkoutCompletePage.pageTitle.text);

        cy.get(checkoutCompletePage.completeHeader.locator)
          .should("be.visible")
          .and("have.text", checkoutCompletePage.completeHeader.text);

        cy.get(checkoutCompletePage.orderDispatchMessage.locator)
          .should("be.visible")
          .and("have.text", checkoutCompletePage.orderDispatchMessage.text);

        cy.get(checkoutCompletePage.backToProductsButton.locator)
          .should("be.visible")
          .and("have.text", checkoutCompletePage.backToProductsButton.text);

        cy.get(checkoutCompletePage.generatePDForderButton.locator)
          .should("be.visible")
          .and("have.text", checkoutCompletePage.generatePDForderButton.text);
      });
    });
  });

  it("Completes checkout and verifies totals for multiple selected products", () => {
    let expectedSubtotal: string;
    let expectedTotal: string;

    // Add multiple products to cart
    productsPage.addProductsToCart([products[1]!.Name, products[2]!.Name]);
    productsPage.getCartCount().then((count) => {
      expect(count, "Items count on cart badge").to.equal(2);

      // View cart
      productsPage.viewCart();

      // Verify cart page title, then start checkout
      cartPage.getPageTitle().then((title) => {
        expect(title, "Cart page title").equal(cartPage.pageTitle.text);

        cartPage.startCheckout();

        // Verify checkout step one page title
        checkoutStepOnePage.getPageTitle().then((title) => {
          expect(title, "Checkout step one page title").equal(checkoutStepOnePage.pageTitle.text);

          // Fill shipping information and continue to overview page
          checkoutStepOnePage.fillShippingInformation(shippingInfo[0]!);

          // Verify checkout step two page title
          checkoutStepTwoPage.getPageTitle().then((title) => {
            expect(title, "Checkout step two page title").to.equal(checkoutStepTwoPage.pageTitle.text);
          });

          // Verify subtotal, tax, and total amounts
          checkoutStepTwoPage.getSubtotal().then((actualSubtotal) => {
            expectedSubtotal = (products[1]!.Price + products[2]!.Price).toFixed(2);
            expect(actualSubtotal.toString(), "Verify subtotal is correct").equal(expectedSubtotal);
          });

          // Calculate expected total based on subtotal and tax, then verify total
          checkoutStepTwoPage.getTax().then((actualTax) => {
            expectedTotal = (parseFloat(expectedSubtotal) + actualTax).toFixed(2);
          });

          // Verify total amount
          checkoutStepTwoPage.getTotal().then((actualTotal) => {
            expect(actualTotal.toString(), "Verify total is correct").equal(expectedTotal);
          });
        });
      });
    });
  });
});
