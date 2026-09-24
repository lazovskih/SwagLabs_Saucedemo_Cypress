# 🛒 SauceDemo – Cypress Automation Demo Project

A demo end-to-end test automation project for the [SauceDemo](https://www.saucedemo.com) website — a simple e-commerce application designed specifically for testing practice. The project is built with [Cypress](https://cypress.io/) and TypeScript.

---

## 📹 Video Recording

> 🎬 **Watch the test execution demo on YouTube:** [https://youtu.be/wmittVoNeg8](https://youtu.be/wmittVoNeg8)

---

## 📋 About the Project

This project demonstrates automated E2E testing of key user flows on the [www.saucedemo.com](https://www.saucedemo.com) website, including:

- 🔐 User authentication (login / logout)
- 🛍️ Adding and removing items from the shopping cart
- 💳 Checkout flow (customer details → order summary → order confirmation)

The tests are written using the **Page Object Model (POM)** pattern for maintainability and clarity.

### Tech Stack

| Tool                           | Version |
| ------------------------------ | ------- |
| [Cypress](https://cypress.io/) | ^16.1.0 |
| TypeScript                     | ^7.0.2  |
| Node.js                        | LTS     |
| dotenv                         | ^17.2.2 |

### CI/CD

Tests are automatically executed on every push and pull request to the `main` / `master` branch via **GitHub Actions**. Test credentials are stored securely as GitHub Secrets in the `TEST` environment.

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- A SauceDemo account — use the standard credentials provided at [www.saucedemo.com](https://www.saucedemo.com)

---

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/lazovskih/SwagLabs_Saucedemo_Cypress.git
cd SwagLabs_Saucedemo_Cypress
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env   # if an example file is available, otherwise create manually
```

Add your credentials to `.env`:

```env
STANDARD_USER=standard_user
DEMO_PASSWORD=secret_sauce
URL=https://www.saucedemo.com
CYPRESS_RECORD_KEY=your_cypress_record_key
CYPRESS_PROJECT_ID=your_cypress_project_id
GIT_TOKEN=your_github_token
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.
> `CYPRESS_RECORD_KEY`, `CYPRESS_PROJECT_ID`, and `GIT_TOKEN` are required only for CI or Cypress Cloud recording. Store them as GitHub Actions secrets in the `TEST` environment.

---

## ▶️ Running Tests

### Run all tests (headless)

```bash
npm run cy:run
```

### Run tests in headed mode (browser visible)

```bash
npm run cy:open:chrome
## or
npm run cy:open:firefox
## or
npm run cy:open:edge
```

### Run tests with the interactive Cypress UI

```bash
npx cypress open
```

### Run a specific test file

```bash
npx cypress run --spec "cypress/e2e/checkout.cy.ts"
npx cypress run --spec "cypress/e2e/cart.cy.ts"
```

### Run tests on a specific browser

```bash
npm run cy:run:chrome
npm run cy:run:firefox
npx cypress run --browser edge
```

---

## 📁 Project Structure

```
SwagLabs_Saucedemo_Cypress/
├── .github/
│   └── workflows/
│       └── cypress.yml                    # GitHub Actions workflow
├── .auth/
│   └── user.json                          # Cypress session state
├── cypress/
│   ├── e2e/
│   │   ├── 1_LoginPage.cy.ts              # Login and logout tests
│   │   ├── 2_ShoppingCartBehavior.cy.ts   # Shopping cart tests
│   │   └── 3_CheckoutFlow.cy.ts           # Checkout tests
│   ├── fixtures/
│   │   ├── products.json                  # Product test data
│   │   └── shipping.json                  # Shipping test data
│   ├── pages/                             # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutCompletePage.ts
│   │   ├── CheckoutStepOnePage.ts
│   │   ├── CheckoutStepTwoPage.ts
│   │   ├── LoginPage.ts
│   │   └── ProductsPage.ts
│   ├── support/
│   │   ├── commands.ts                    # Custom Cypress commands
│   │   ├── e2e.ts                         # E2E support entry point
│   │   ├── index.d.ts                     # Cypress global declarations
│   │   └── types/
│   │       ├── commands.d.ts              # Custom command types
│   │       ├── env.d.ts                   # Cypress environment types
│   │       ├── ShippingData               # Shippind data interface
│   │       └── product.d.ts               # Product interface
│   └── utilities/
│       └── formatters.ts                  # Currency parsing utilities
├── .env.example                           # Environment variable template
├── .gitignore                             # Ignored local and generated files
├── cypress.config.js                      # Cypress configuration
├── package.json                           # Scripts and dependencies
├── package-lock.json                      # Locked dependency versions
├── tsconfig.json                          # TypeScript compiler settings
├── LICENSE                                # MIT license
└── README.md                              # Project documentation
```

---

## 🌐 Target Application

- **URL:** [https://www.saucedemo.com](https://www.saucedemo.com)
- **Type:** Demo e-commerce web application
- **Purpose:** QA automation practice

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
