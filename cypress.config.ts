import { defineConfig } from 'cypress';
// Importamos el plugin de manera compatible con ESM
import cypressMochawesomeReporterPlugin from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'E-Learning Platform - Cypress Test Results',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      // Cargamos el plugin de informes
      cypressMochawesomeReporterPlugin(on);
      
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000
  },
  env: {
    TEST_EMAIL: 'test@example.com',
    TEST_PASSWORD: 'Password123!'
  }
}); 