import 'dotenv/config';
import { defineConfig } from 'cypress';
import mochawesomeReporter from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'SauceDemo Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: process.env.CYPRESS_REPORT_DIR || 'cypress/reports/html',
  },
  e2e: {
    baseUrl: process.env.URL,
    setupNodeEvents(on, config) {
      mochawesomeReporter(on);
      return config;
    },
  },
  env: {
    baseUrl: process.env.URL,
    username: process.env.STANDARD_USER,
    password: process.env.DEMO_PASSWORD,
  },
});