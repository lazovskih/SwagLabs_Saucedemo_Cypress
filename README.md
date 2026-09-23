# 🛒 SauceDemo – Cypress Automation Demo Project

A demo end-to-end test automation project for the [SauceDemo](https://www.saucedemo.com) website — a simple e-commerce application designed specifically for testing practice. The project is built with [Cypress](https://cypress.io/) and TypeScript.

---

## 📹 Video Recording

> 🎬 **Watch the test execution demo on YouTube:** [https://youtu.be/xxxxxx](https://youtu.be/xxxxx)

---

## 📋 About the Project

This project demonstrates automated E2E testing of key user flows on the [www.saucedemo.com](https://www.saucedemo.com) website, including:

- 🔐 User authentication (login / logout)
- 🛍️ Adding and removing items from the shopping cart
- 💳 Checkout flow (customer details → order summary → order confirmation)

The tests are written using the **Page Object Model (POM)** pattern for maintainability and clarity.

### Tech Stack

| Tool                           | Version           |
| ------------------------------ | ----------------- |
| [Cypress](https://cypress.io/) | ^16.1.0           |
| TypeScript                     | via `@types/node` |
| Node.js                        | LTS               |
| dotenv                         | ^17.2.2           |

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
STANDARD_USER=set_username
DEMO_PASSWORD=set_password
URL=https://www.saucedemo.com
CYPRESS_PROJECT_ID=cypress_project_id
CYPRESS_CLOUD_KEY=cypress_cloud_key
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## ▶️ Running Tests

### Run all tests (headless)

```bash
npx cypress run
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

# Run in Chrome

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

---

## 📁 Project Structure

```
sauselabsdemo/
├── .github/
│   └── workflows/
│       └── cypress.yml         # GitHub Actions CI workflow
├── e2e/
│   │   ├── cart.cy.ts          # Cart tests
│   │   └── checkout.cy.ts      # Checkout flow tests
│   └─── pages/                 # Page Object Model classes
│       ├── BasePage.ts
│       ├── CartPage.ts
│       ├── CheckoutPage.ts
│       ├── LoginPage.ts
│       └── ProductsPage.ts
├── cypress.config.ts           # Configuration
├── package.json
├── .env                        # Local environment variables (not committed)
├── .env.example                # Environment variables template
└── README.md                   # This file
```

---

## 🌐 Target Application

- **URL:** [https://www.saucedemo.com](https://www.saucedemo.com)
- **Type:** Demo e-commerce web application
- **Purpose:** QA automation practice

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
