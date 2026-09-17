require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    BASEURL: process.env.URL || "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      return config;
    },
  },
  env: {
    BASEURL: process.env.URL || "https://www.saucedemo.com",
    USERNAME: process.env.STANDARD_USER,
    PASSWORD: process.env.DEMO_PASSWORD,
  },
});
