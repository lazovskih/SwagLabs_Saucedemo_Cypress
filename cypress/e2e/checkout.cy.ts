/// <reference types="cypress" />

import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { ProductData, ShippingData } from "../utilities/dataTypes";
import products from "../fixtures/products.json";
import shippingInfo from "../fixtures/shipping.json";

describe("Checkout flow", () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;
  let products: ProductData[];
  let shippingInfo: ShippingData[];
  let loginPage: LoginPage;

  before(() => {
    // Login with valid credentials
    loginPage = new LoginPage();
    productsPage = new ProductsPage();

    cy.env(["USERNAME", "PASSWORD"]).then((env) => {
      const { USERNAME, PASSWORD } = env;
      if (typeof USERNAME !== "string" || typeof PASSWORD !== "string") {
        throw new Error("The Cypress username and PASSWORD environment variables must be configured.");
      }
      // cy.log(`Logging in with username: ${USERNAME} and password: ${PASSWORD}`); // REMOVE
      loginPage.login(USERNAME, PASSWORD);

      // Verify Products page is displayed
      productsPage.getCurrentUrl().should("contain", productsPage.pageUrl);
      productsPage.getPageTitle().should("equal", productsPage.pageTitleText);
    });

    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkoutStepOnePage = new CheckoutStepOnePage();
    checkoutStepTwoPage = new CheckoutStepTwoPage();
    checkoutCompletePage = new CheckoutCompletePage();
    // products = loadTestData<ProductData>("products");
    // shippingInfo = loadTestData<ShippingData>("shipping");

    // Navigate directly to the products page using the pre-authenticated state
    productsPage.open();
  });

  it("Completes checkout for a selected product", () => {
    // Add products to cart
    cy.fixture("products.json").then((products) => {
      cy.fixture("shipping.json").then((shippingInfo) => {
        cy.log("Adding products to cart: " + products[0].Name + ", " + products[1].Name);

        productsPage.addProductsToCart([products[0].Name, products[1].Name]).then(() => {
          productsPage.getCartCount().then((count) => {
            expect(count).to.equal(2);
          });

          // View cart
          productsPage.viewCart();

          cartPage.getPageTitle().then((title) => {
            expect(title).to.equal(cartPage.pageTitleText);
          });

          // Start checkout
          cartPage.startCheckout();

          // Fill shipping information ("Checkout: Your Information"))
          checkoutStepOnePage.getPageTitle().then((title) => {
            expect(title, "Checkout step one page title").to.equal(checkoutStepOnePage.pageTitle.text);
          });

          // Fill shipping information and continue to overview page
          checkoutStepOnePage.fillShippingInformation(shippingInfo[0]).then(() => {
            checkoutStepTwoPage.getPageTitle().then((title) => {
              //"Checkout: Overview"
              expect(title, "Checkout step two page title").to.equal(checkoutStepTwoPage.pageTitle.text);
            });
          });

          // Finish order
          checkoutStepTwoPage.finishOrder().then(() => {
            checkoutCompletePage.getPageTitle().then((title) => {
              expect(title).to.equal(checkoutCompletePage.pageTitle.text);
              //"Thank you for your order!"
              // expect(title).to.equal("Thank you for your order!");
            });
          });
        });
      });
    });
  });

  it("Completes checkout and verifies totals for multiple selected products", () => {
    let expectedSubtotal: String;
    let expectedTotal: String;
    cy.fixture("products.json").then((products) => {
      cy.fixture("shipping.json").then((shippingInfo) => {
        // Add multiple products to cart
        productsPage.addProductsToCart([products[1].Name, products[2].Name]).then(() => {
          productsPage.getCartCount().then((count) => {
            expect(count).to.equal(2);
          });
        });

        // View cart
        productsPage.viewCart();

        // Verify cart page title, then start checkout
        cartPage.getPageTitle().then((title) => {
          expect(title, "Page title").equal(cartPage.pageTitle.text);
        });

        cartPage.startCheckout();

        // Verify checkout step one page title
        // expect(checkoutStepOnePage.getPageTitle()).equal(checkoutStepOnePage.pageTitle.text);

        // Fill shipping information and continue to overview page
        checkoutStepOnePage.fillShippingInformation(shippingInfo[0]).then(() => {
          // Verify checkout step two page title
          expect(checkoutStepTwoPage.getPageTitle()).equal(checkoutStepTwoPage.pageTitle.text);

          // Verify subtotal, tax, and total amounts
          checkoutStepTwoPage.getSubtotal().then((actualSubtotal) => {
            expectedSubtotal = (products[1].Price + products[2].Price).toFixed(2);
            expect(actualSubtotal, "Verify subtotal is correct").equal(expectedSubtotal);
          });
        });

        // Calculate expected total based on subtotal and tax, then verify total
        checkoutStepTwoPage.getTax().then((actualTax) => {
          expectedTotal = parseFloat(expectedSubtotal + actualTax).toFixed(2);
          checkoutStepTwoPage.getTotal().then((actualTotal) => {
            expect(actualTotal, "Verify total is correct").equal(expectedTotal);
          });
        });
      });
    });
  });
});
