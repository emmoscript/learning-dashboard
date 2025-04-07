/// <reference types="cypress" />

// ***********************************************
// This file implements custom commands for Cypress
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando para hacer login con el usuario de prueba
Cypress.Commands.add('loginTestUser', () => {
  cy.session('test-user', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(Cypress.env('TEST_EMAIL'));
    cy.get('input[name="password"]').type(Cypress.env('TEST_PASSWORD'), { log: false });
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/courses/my-courses');
  });
});

// Comando para visitar un curso específico
Cypress.Commands.add('visitCourse', (courseId) => {
  cy.visit(`/courses/${courseId}`);
  cy.url().should('include', `/courses/${courseId}`);
});

// Comando para verificar el formato de precio en USD
Cypress.Commands.add('verifyPriceFormat', (selector) => {
  cy.get(selector).should('contain', '$');
  cy.get(selector).invoke('text').should('match', /\$\d+(\.\d{2})? USD/);
});

// Comando para verificar la redirección exitosa después del pago
Cypress.Commands.add('assertRedirectToPaymentSuccess', () => {
  cy.url().should('include', '/checkout/success');
  cy.contains('¡Pago Exitoso!').should('be.visible');
  cy.contains('Tu pago ha sido procesado correctamente').should('be.visible');
});

// Comando para verificar si un curso está en la lista de cursos del usuario
Cypress.Commands.add('courseIsInUserCourses', (courseId) => {
  cy.visit('/courses/my-courses');
  return cy.get('.grid').then($grid => {
    return $grid.find(`[data-course-id="${courseId}"]`).length > 0;
  });
}); 