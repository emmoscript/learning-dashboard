/// <reference types="cypress" />

describe('Flujo de Checkout', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Debería redirigir al checkout desde el plan básico', () => {
    cy.get('#pricing').scrollIntoView();
    cy.contains('Plan Básico')
      .parent()
      .parent()
      .find('button')
      .contains('Comenzar Gratis')
      .click();
    
    cy.url().should('include', '/checkout');
    cy.url().should('include', 'plan=basic');
    cy.contains('Resumen de tu pedido').should('be.visible');
  });

  it('Debería redirigir al checkout desde el plan profesional', () => {
    cy.get('#pricing').scrollIntoView();
    cy.contains('Plan Profesional')
      .parent()
      .parent()
      .find('button')
      .contains('Suscribirse Ahora')
      .click();
    
    cy.url().should('include', '/checkout');
    cy.url().should('include', 'plan=premium');
    cy.contains('Resumen de tu pedido').should('be.visible');
  });

  it('Debería redirigir al checkout desde el plan familiar', () => {
    cy.get('#pricing').scrollIntoView();
    cy.contains('Plan Familiar')
      .parent()
      .parent()
      .find('button')
      .contains('Obtener Plan Familiar')
      .click();
    
    cy.url().should('include', '/checkout');
    cy.url().should('include', 'plan=premium');
    cy.contains('Resumen de tu pedido').should('be.visible');
  });

  it('Debería completar el proceso de checkout', () => {
    // Navegar al checkout directamente con plan premium
    cy.visit('/checkout?plan=premium');
    
    // Verificar elementos del checkout
    cy.contains('Resumen de tu pedido').should('be.visible');
    
    // Completar formulario de información personal
    cy.get('input[name="name"]').type('Usuario Prueba');
    cy.get('input[name="email"]').type('usuario.prueba@example.com');
    cy.contains('Continuar al Pago').click();
    
    // Verificar que estamos en la página de pago
    cy.contains('Información de Pago').should('be.visible');
    
    // Completar formulario de pago
    cy.get('input[name="cardNumber"]').type('4242424242424242');
    cy.get('input[name="expDate"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');
    cy.contains('Completar Pago').click();
    
    // Verificar mensaje de confirmación
    cy.contains('¡Suscripción Exitosa!', { timeout: 10000 }).should('be.visible');
    
    // Verificar botones de navegación post-compra
    cy.contains('Ver mis cursos').should('be.visible');
    cy.contains('Volver al inicio').should('be.visible');
  });

  it('Debería poder volver al inicio desde el checkout', () => {
    cy.visit('/checkout?plan=basic');
    cy.contains('Volver al inicio').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
}); 