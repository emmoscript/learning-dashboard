/// <reference types="cypress" />

// ***********************************************
// This file implements custom commands for Cypress
// https://on.cypress.io/custom-commands
// ***********************************************

// Extends the Cypress namespace to include the custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para realizar login con el usuario de prueba
       */
      loginTestUser(): Chainable<Element>;
      
      /**
       * Comando personalizado para navegar a la página de un curso específico por ID
       */
      visitCourse(courseId: number): Chainable<Element>;
      
      /**
       * Comando personalizado para comprobar el formato de un precio en USD
       */
      verifyPriceFormat(selector: string): Chainable<Element>;
      
      /**
       * Comando personalizado para realizar acciones después de la redirección al éxito del pago
       */
      assertRedirectToPaymentSuccess(): Chainable<Element>;
      
      /**
       * Comando personalizado para verificar que un curso específico está en la lista de cursos del usuario
       */
      courseIsInUserCourses(courseId: number): Chainable<boolean>;
    }
  }
}

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