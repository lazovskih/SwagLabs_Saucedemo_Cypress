/// <reference types="cypress" />

import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import products from "../fixtures/products.json";

describe("Shopping cart flow", () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  beforeEach(() => {
    // Login with valid credentials from .env or Environment variables on CI/CD
    cy.loginUI("standard_user", "secret_sauce").then(() => {
      productsPage = new ProductsPage();
      cartPage = new CartPage();

      // Navigate directly to the products page using the pre-authenticated state
      productsPage.open();
    });
  });

  it("adds selected products to the cart and verifies cart contents", () => {
    cy.log("Adding products to cart: " + products[0]!!.Name + ", " + products[1]!!.Name);
    productsPage.addProductsToCart([products[0]!!.Name, products[1]!!.Name]);
    productsPage.getCartCount().then((count) => {
      expect(count).to.equal(2);
    });

    // View cart
    productsPage.viewCart();

    cartPage.getPageTitle().then((title) => {
      expect(title).to.equal(cartPage.pageTitle.text);
    });
    cartPage.getProductCount(products[0]!!.Name).then((count) => {
      expect(count).to.equal(1);
    });
    cartPage.getProductCount(products[1]!!.Name).then((count) => {
      expect(count).to.equal(1);
    });
    cy.get(cartPage.cartItems.locator).its("length").should("equal", 2);
  });

  it("button changes from 'Add to cart' to 'Remove' when clicked", () => {
    const productName = products[0]!!.Name;

    productsPage
      .getAddToCartButton(productName)
      .should("be.visible")
      .then((addToCartButton) => {
        cy.wrap(addToCartButton).click();
        productsPage.getAddToCartButton(productName).should("not.exist");
      });

    productsPage
      .getRemoveButton(productName)
      .should("be.visible")
      .then((removeButton) => {
        cy.wrap(removeButton).click();
        productsPage.getRemoveButton(productName).should("not.exist");
        productsPage.getAddToCartButton(productName).should("be.visible");
      });
  });

  it("button changes from 'Remove' to 'Add to cart' when clicked", () => {
    // Loop through all products
    for (const product of products) {
      productsPage
        .getAddToCartButton(product.Name)
        .should("be.visible")
        .then((addToCartButton) => {
          cy.wrap(addToCartButton).click();
        });

      productsPage
        .getRemoveButton(product.Name)
        .should("be.visible")
        .then((removeButton) => {
          cy.wrap(removeButton).click();
          productsPage.getRemoveButton(product.Name).should("not.exist");
          productsPage.getAddToCartButton(product.Name).should("be.visible");
        });
    }
  });

  it("cart badge updates quantity correctly when items are added and removed", () => {
    let expectedCount = 0;

    // Add all items and verify badge count increments
    for (const product of products) {
      productsPage
        .getAddToCartButton(product.Name)
        .should("be.visible")
        .then((addToCartButton) => {
          cy.wrap(addToCartButton).click();
          expectedCount++;
          console.log(`Added product to cart: ${product.Name}, expected count: ${expectedCount}`);
        });

      cy.get(productsPage.cartBadge.locator).should("be.visible");
      productsPage.getCartCount().then((count) => {
        expect(count).to.equal(expectedCount);
      });
    }

    // Remove all items and verify badge count decrements
    for (const product of products) {
      productsPage
        .getRemoveButton(product.Name)
        .should("be.visible")
        .then((removeButton) => {
          cy.wrap(removeButton).click();
          expectedCount--;
          console.log(`Removed product from cart: ${product.Name}, expected count: ${expectedCount}`);
        });

      productsPage.getCartCount().then((count) => {
        expect(count).to.equal(expectedCount);
      });
    }
  });

  it("remove button on products page should not be present for items removed from cart", () => {
    // Add 3 items
    const itemsToAdd = [products[0]!.Name, products[1]!.Name, products[2]!.Name];
    productsPage.addProductsToCart(itemsToAdd);

    // Verify cart count is 3
    productsPage.getCartCount().should("equal", 3);

    // Open Cart
    productsPage.viewCart();
    const cartPage = new CartPage();

    // Remove 2 items from the cart
    for (let i = 0; i < itemsToAdd.length; i++) {
      if (typeof itemsToAdd[i] == "string" && itemsToAdd[i]?.trim() != "") {
        cartPage.removeProduct(itemsToAdd[i]!);
      }
    }

    // Go back to products list
    cartPage.continueShopping();

    // Verify the "Remove" button is NOT present for those removed items
    for (let i = 0; i < itemsToAdd.length; i++) {
      if (typeof itemsToAdd[i] == "string" && itemsToAdd[i]?.trim() != "") {
        productsPage.getRemoveButton(itemsToAdd[0]!).should("not.exist");
      }
    }
  });
});
