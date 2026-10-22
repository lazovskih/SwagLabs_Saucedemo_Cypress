import { ProductsPage } from "../pages/ProductsPage";
import { Product } from "../support/types/product";
import productsList from "../fixtures/products.json";

const products: Product[] = productsList;

describe("4. Sorting products tests", () => {
  let productsPage: ProductsPage;

  beforeEach("4. Sorting products tests", () => {
    // Login with valid credentials from .env or Environment variables on CI/CD
    cy.loginUI("standard_user", "secret_sauce").then(() => {
      productsPage = new ProductsPage();

      // Navigate directly to the products page using the pre-authenticated state
      productsPage.open();
    });
  });

  it("4.1 Sort products by name (A - Z)", () => {
    cy.get(productsPage.sortSelector.locator).select("az");

    cy.get(productsPage.itemTitle.locator)
      .should("have.length", products.length)
      .then(($items) => {
        const actualNames = $items.toArray().map((item) => item.innerText.trim());
        const expectedNames = products.map(({ Name }) => Name).sort((first, second) => first.localeCompare(second));

        expect(actualNames).to.deep.equal(expectedNames);
      });
  });

  it("4.2 Sort products by name (Z - A)", () => {
    cy.get(productsPage.sortSelector.locator).select("za");

    cy.get(productsPage.itemTitle.locator)
      .should("have.length", products.length)
      .then(($items) => {
        const actualNames = $items.toArray().map((item) => item.innerText.trim());
        const expectedNames = products.map(({ Name }) => Name).sort((first, second) => second.localeCompare(first));

        expect(actualNames).to.deep.equal(expectedNames);
      });
  });

  it("4.3 Sort products by price (low to high)", () => {
    cy.get(productsPage.sortSelector.locator).select("lohi");
    const expectedProducts = [...products].sort(
      (first, second) => first.Price - second.Price || first.Name.localeCompare(second.Name),
    );

    cy.get(productsPage.itemPrice.locator)
      .should("have.length", products.length)
      .then(($prices) => {
        const actualPrices = $prices.toArray().map((price) => Number(price.innerText.replace("$", "")));
        const expectedPrices = expectedProducts.map(({ Price }) => Price);

        expect(actualPrices).to.deep.equal(expectedPrices);
      });

    cy.get(productsPage.itemTitle.locator).then(($items) => {
      const actualNames = $items.toArray().map((item) => item.innerText.trim());
      const expectedNames = expectedProducts.map(({ Name }) => Name);

      expect(actualNames).to.deep.equal(expectedNames);
    });
  });

  it("4.4 Sort products by price (high to low)", () => {
    cy.get(productsPage.sortSelector.locator).select("hilo");
    const expectedProducts = [...products].sort(
      (first, second) => second.Price - first.Price || first.Name.localeCompare(second.Name),
    );

    cy.get(productsPage.itemPrice.locator)
      .should("have.length", products.length)
      .then(($prices) => {
        const actualPrices = $prices.toArray().map((price) => Number(price.innerText.replace("$", "")));
        const expectedPrices = expectedProducts.map(({ Price }) => Price);

        expect(actualPrices).to.deep.equal(expectedPrices);
      });

    cy.get(productsPage.itemTitle.locator).then(($items) => {
      const actualNames = $items.toArray().map((item) => item.innerText.trim());
      const expectedNames = expectedProducts.map(({ Name }) => Name);

      expect(actualNames).to.deep.equal(expectedNames);
    });
  });
});
