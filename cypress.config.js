require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "pttokf",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "SauceDemo Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    BASEURL: process.env.URL,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
  env: {
    BASEURL: process.env.URL,
    USERNAME: process.env.STANDARD_USER,
    PASSWORD: process.env.DEMO_PASSWORD,
  },
});
