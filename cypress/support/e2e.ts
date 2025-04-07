// Import commands.ts using ES2015 syntax:
import './commands';

// Import Cypress-mochawesome-reporter for better reporting
import 'cypress-mochawesome-reporter/register';

// Prevent uncaught exception errors from failing tests
Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
}); 