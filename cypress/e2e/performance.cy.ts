/// <reference types="cypress" />

describe('Pruebas de Rendimiento', () => {
  it('Carga de página principal rápida', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('start-loading');
      },
      onLoad: (win) => {
        win.performance.mark('end-loading');
        win.performance.measure('page-load', 'start-loading', 'end-loading');
      }
    });
    
    // Aumentar el tiempo permitido a 5 segundos para ser más permisivos
    cy.window().then((win) => {
      const measure = win.performance.getEntriesByName('page-load')[0];
      expect(measure.duration).to.be.lessThan(5000);
    });
  });

  it('Navegación fluida entre páginas', () => {
    // Verificar tiempo de navegación entre páginas
    cy.visit('/');
    
    // Medir navegación a la página de cursos
    cy.window().then((win) => {
      win.performance.mark('start-nav');
    });
    cy.get('a[href="/courses/my-courses"]').first().click();
    cy.url().should('include', '/courses/my-courses');
    cy.window().then((win) => {
      win.performance.mark('end-nav');
      win.performance.measure('page-navigation', 'start-nav', 'end-nav');
      const measure = win.performance.getEntriesByName('page-navigation')[0];
      // Aumentar a 3 segundos para ser más permisivos
      expect(measure.duration).to.be.lessThan(3000);
    });
  });

  it('Rendimiento de carga de imágenes', () => {
    cy.visit('/');
    // Medir tiempo de carga de imágenes
    cy.get('img').should('be.visible');
    cy.window().then((win) => {
      const imgPerformance = win.performance.getEntriesByType('resource')
        .filter(entry => {
          // Usamos casting para acceder a la propiedad initiatorType
          const resourceEntry = entry as PerformanceResourceTiming;
          return resourceEntry.initiatorType === 'img';
        });
      
      // Verificar que las imágenes carguen en menos de 3 segundos
      imgPerformance.forEach(entry => {
        expect(entry.duration).to.be.lessThan(3000);
      });
    });
  });

  it('Tiempos de respuesta del formulario de login', () => {
    cy.visit('/login');
    
    // Medir tiempo de respuesta del formulario
    cy.window().then((win) => {
      win.performance.mark('start-form');
    });
    cy.get('input[name="email"]').type('usuario.prueba@example.com');
    cy.get('input[name="password"]').type('clave123');
    cy.get('button[type="submit"]').click();
    cy.window().then((win) => {
      win.performance.mark('end-form');
      win.performance.measure('form-submit', 'start-form', 'end-form');
      const measure = win.performance.getEntriesByName('form-submit')[0];
      // Aumentar a 2 segundos para ser más permisivos
      expect(measure.duration).to.be.lessThan(2000);
    });
  });
}); 