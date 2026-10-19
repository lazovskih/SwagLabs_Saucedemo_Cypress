import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { Product } from "../support/types/product";
import productsList from "../fixtures/products.json";

const products: Product[] = productsList;

describe("2. Shopping cart behavior tests", () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  beforeEach("2. Shopping cart behavior tests", () => {
    // Login with valid credentials from .env or Environment variables on CI/CD
    cy.loginUI("standard_user", "secret_sauce").then(() => {
      productsPage = new ProductsPage();
      cartPage = new CartPage();

      // Navigate directly to the products page using the pre-authenticated state
      productsPage.open();
    });
  });

  it("2.1 Adds selected products to the cart and verifies cart contents", () => {
    // Add multiple products to cart
    const selectedProducts: Product[] = [products[1]!, products[3]!];

    productsPage.addProductsToCart(selectedProducts);
    productsPage.getCartCount().then((count) => {
      expect(count).to.equal(2);
    });

    // View cart
    productsPage.viewCart();

    cartPage.getPageTitle().then((title) => {
      expect(title).to.equal(cartPage.pageTitle.text);
    });
    cartPage.getProductCount(selectedProducts[0]!).then((count) => {
      expect(count).to.equal(1);
    });
    cartPage.getProductCount(selectedProducts[1]!).then((count) => {
      expect(count).to.equal(1);
    });
    cy.get(cartPage.cartItems.locator).its("length").should("equal", 2);
  });

  it("2.2 Button changes from 'Add to cart' to 'Remove' when clicked", () => {
    const product = products[0];

    productsPage
      .getAddToCartButton(product!)
      .should("be.visible")
      .then((addToCartButton) => {
        cy.wrap(addToCartButton).click();
        productsPage.getAddToCartButton(product!).should("not.exist");
      });

    productsPage
      .getRemoveButton(product!)
      .should("be.visible")
      .then((removeButton) => {
        cy.wrap(removeButton).click();
        productsPage.getRemoveButton(product!).should("not.exist");
        productsPage.getAddToCartButton(product!).should("be.visible");
      });
  });

  it("2.3 Button changes from 'Remove' to 'Add to cart' when clicked", () => {
    // Loop through all products
    for (const product of products) {
      productsPage
        .getAddToCartButton(product)
        .should("be.visible")
        .then((addToCartButton) => {
          cy.wrap(addToCartButton).click();
        });

      productsPage
        .getRemoveButton(product)
        .should("be.visible")
        .then((removeButton) => {
          cy.wrap(removeButton).click();
          productsPage.getRemoveButton(product).should("not.exist");
          productsPage.getAddToCartButton(product).should("be.visible");
        });
    }
  });

  it("2.4 Cart badge updates quantity correctly when items are added and removed", () => {
    let expectedCount = 0;

    // Add all items and verify badge count increments
    for (const product of products) {
      productsPage
        .getAddToCartButton(product)
        .should("be.visible")
        .then((addToCartButton) => {
          cy.wrap(addToCartButton).click();
          expectedCount++;
        });

      cy.get(productsPage.cartBadge.locator).should("be.visible");
      productsPage.getCartCount().then((count) => {
        expect(count).to.equal(expectedCount);
      });
    }

    // Remove all items and verify badge count decrements
    for (const product of products) {
      productsPage
        .getRemoveButton(product)
        .should("be.visible")
        .then((removeButton) => {
          cy.wrap(removeButton).click();
          expectedCount--;
        });

      productsPage.getCartCount().then((count) => {
        expect(count).to.equal(expectedCount);
      });
    }
  });

  it("2.5 Remove button on products page should not be present for items removed from cart", () => {
    // Add multiple items
    const selectedProducts: Product[] = [products[1]!, products[3]!];
    productsPage.addProductsToCart(selectedProducts);

    // Verify cart count 
    productsPage.getCartCount().should("equal", selectedProducts.length);

    // Open Cart
    productsPage.viewCart();
    const cartPage = new CartPage();

    // Remove added items from the cart
    for (let i = 0; i < selectedProducts.length; i++) {
      if (typeof selectedProducts[i]?.Name == "string" && selectedProducts[i]?.Name.trim() != "") {
        cartPage.removeProduct(selectedProducts[i]!);
      }
    }

    // Go back to products list
    cartPage.continueShopping();

    // Verify the "Remove" button is NOT present for those removed items
    for (let i = 0; i < selectedProducts.length; i++) {
      if (typeof selectedProducts[i]?.Name == "string" && selectedProducts[i]?.Name.trim() != "") {
        productsPage.getRemoveButton(selectedProducts[i]!).should("not.exist");
      }
    }
  });
});
