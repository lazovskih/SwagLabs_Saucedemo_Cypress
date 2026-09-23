require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "pttokf",
  e2e: {
    BASEURL: process.env.URL,
    setupNodeEvents(on, config) {
      return config;
    },
  },
  env: {
    BASEURL: process.env.URL,
    USERNAME: process.env.STANDARD_USER,
    PASSWORD: process.env.DEMO_PASSWORD,
  },
});
