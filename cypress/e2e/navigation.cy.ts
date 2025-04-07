/// <reference types="cypress" />

describe('Navegación en la Plataforma', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.screenshot('homepage');
  });

  it('Debería mostrar la barra de navegación correctamente', () => {
    cy.get('nav').should('be.visible');
    cy.get('nav').find('a[href="/"]').should('exist');
    cy.get('nav').find('a[href="/courses/my-courses"]').should('exist');
    cy.get('nav').find('a[href="/#pricing"]').should('exist');
    cy.get('nav').find('a[href="/labs/1"]').should('exist');
  });

  it('Debería navegar a la sección de cursos', () => {
    cy.get('a[href="/courses/my-courses"]').first().click();
    cy.url().should('include', '/courses/my-courses');
    cy.contains(/mis cursos/i).should('exist');
  });

  it('Debería navegar a la sección de precios', () => {
    cy.get('a[href="/#pricing"]').first().click();
    cy.hash().should('eq', '#pricing');
    cy.get('h2').contains('Planes de Precios').should('be.visible');
  });

  it('Debería navegar a la sección de laboratorios', () => {
    cy.get('a[href="/labs/1"]').first().click();
    cy.url().should('include', '/labs/1');
  });

  it('Debería mostrar todos los cursos en la página de inicio', () => {
    cy.get('.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3').should('exist');
    cy.get('.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div').should('have.length.at.least', 6);
  });

  it('Debería mostrar los testimonios de estudiantes', () => {
    cy.contains('Lo que dicen nuestros estudiantes').scrollIntoView();
    cy.get('section:contains("Lo que dicen nuestros estudiantes") .grid > div')
      .should('have.length', 3);
    cy.screenshot('testimonials-section');
  });

  it('Debería mostrar la sección de empresas asociadas', () => {
    cy.contains('Empresas que confían en nosotros').scrollIntoView();
    cy.get('.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-6 > div').should('have.length', 6);
  });

  it('Debería mostrar los planes de precios', () => {
    cy.get('#pricing').scrollIntoView();
    cy.contains('Planes de Precios').should('be.visible');
    cy.get('#pricing .grid-cols-1.md\\:grid-cols-3 > div').should('have.length', 3);
    
    cy.contains('Plan Básico').should('be.visible');
    cy.contains('Plan Profesional').should('be.visible');
    cy.contains('Plan Familiar').should('be.visible');
  });

  it('Debería redirigir al checkout al hacer clic en un plan de suscripción', () => {
    cy.get('#pricing').scrollIntoView();
    
    // Clic en el botón de Plan Profesional
    cy.contains('Plan Profesional')
      .parent()
      .parent()
      .find('button')
      .contains('Suscribirse Ahora')
      .click();
      
    cy.url().should('include', '/checkout?plan=premium');
    cy.contains('Resumen de tu pedido').should('be.visible');
  });

  it('should navigate to the home page', () => {
    cy.contains('8limpio Learning').should('exist');
    cy.screenshot('home-header-visible');
  });

  it('should navigate to the about page', () => {
    cy.contains('¿Por qué elegirnos?').should('exist');
    cy.screenshot('about-section-visible');
  });

  it('should navigate to login page', () => {
    cy.contains('Iniciar Sesión').click();
    cy.url().should('include', '/login');
    cy.screenshot('login-page');
  });

  it('should navigate to pricing section', () => {
    cy.contains('Planes de Precios').scrollIntoView();
    cy.contains('Planes de Precios').should('be.visible');
    cy.screenshot('pricing-section');
  });
}); 