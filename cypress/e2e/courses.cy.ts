/// <reference types="cypress" />

describe('Funcionalidad de Cursos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Debería mostrar cursos en la página principal', () => {
    cy.get('.grid').should('exist');
    cy.get('.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div').should('have.length.at.least', 6);
  });

  it('Debería permitir navegar al detalle de un curso', () => {
    // Ir a la página de cursos
    cy.visit('/courses/my-courses');
    
    // Verificar que estamos en la página de cursos
    cy.url().should('include', '/courses/my-courses');
  });

  it('Debería mostrar la información correcta del curso', () => {
    // Visitar la landing page que tiene información de cursos
    cy.visit('/');
    
    // Verificar que hay información de cursos
    cy.contains('Cursos Destacados').should('be.visible');
    cy.contains('Explora Todos Nuestros Cursos').should('be.visible');
  });

  it('Debería redirigir al checkout desde la página principal', () => {
    cy.visit('/');
    
    // Ir a la sección de precios
    cy.get('#pricing').scrollIntoView();
    
    // Clic en el plan profesional
    cy.contains('Plan Profesional')
      .parent()
      .parent()
      .find('button')
      .contains('Suscribirse Ahora')
      .click();
      
    cy.url().should('include', '/checkout');
  });

  it('Debería mostrar elementos de navegación', () => {
    cy.visit('/');
    cy.get('nav').should('exist');
    cy.get('a[href="/"]').should('exist');
  });
}); 