/// <reference types="cypress" />

declare namespace Cypress {
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