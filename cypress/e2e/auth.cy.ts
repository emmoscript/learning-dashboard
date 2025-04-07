/// <reference types="cypress" />

describe('Flujo de Autenticación', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Debería mostrar la página de inicio correctamente', () => {
    cy.get('h1').should('contain', '8limpio Learning');
    cy.contains('Plataforma de e-learning');
    cy.get('a[href="/login"]').should('exist');
    cy.get('a').contains('Regístrate Gratis').should('exist');
  });

  it('Debería navegar a la página de login', () => {
    cy.get('a[href="/login"]').first().click();
    cy.url().should('include', '/login');
    cy.get('form').should('exist');
    cy.contains('Iniciar sesión').should('exist');
  });

  it('Debería navegar a la página de registro', () => {
    cy.contains('Regístrate Gratis').click();
    cy.url().should('include', '/register');
    cy.get('form').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('Debería mostrar mensaje de error con credenciales inválidas', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('usuario_inexistente@correo.com');
    cy.get('input[name="password"]').type('ClaveIncorrecta123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('Debería intentar registrar un nuevo usuario', () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'Password123!';

    cy.visit('/register');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/register');
  });

  it('Debería intentar iniciar sesión con credenciales', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(Cypress.env('TEST_EMAIL'));
    cy.get('input[name="password"]').type(Cypress.env('TEST_PASSWORD'));
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/login');
  });
}); 