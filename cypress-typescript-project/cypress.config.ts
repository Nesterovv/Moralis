import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://admin.moralis.io/",  // Set your base URL here
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1920, // Set the default viewport width
    viewportHeight: 1080,
  },
  env: {
    email: process.env.CYPRESS_EMAIL,
    password: process.env.CYPRESS_PASSWORD,
    token: process.env.CYPRESS_TOKEN,
    apiUrl: process.env.CYPRESS_API_URL,
  }
});
