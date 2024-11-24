describe('Weather App Tests', () => {
    it('should show the form when localStorage is empty', () => {
      // Limpiar localStorage antes de la prueba
      cy.clearLocalStorage();
      // Visitar la página
      cy.visit('index.html');
      // Verificar que el formulario es visible
      cy.get('#myForm').should('be.visible');
    });
  
    it('should show weather information for a valid city', () => {
      // Limpiar localStorage
      cy.clearLocalStorage();
      // Visitar la página
      cy.visit('index.html');
      // Ingresar una ciudad válida
      cy.get('input[name="city"]').type('Tucson');
      cy.get('form').submit();
      // Verificar que se muestre la información del clima
      cy.get('.weather-info').should('contain', 'Tucson');
    });
  });
  