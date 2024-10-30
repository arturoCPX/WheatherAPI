describe('Weather App Tests', () => {
  
    // Cargar la página de inicio
    beforeEach(() => {
      cy.visit('index.html'); // Asegúrate de que el servidor esté ejecutándose en tu entorno
    });
  
    it('Debe mostrar el formulario cuando localStorage esté vacío (Prueba de interfaz de usuario UI)', () => {
      cy.clearLocalStorage(); // Limpia el almacenamiento local
      cy.get('#myForm').should('be.visible'); // Verifica que el formulario esté visible
    });
  
    it('Debería ocultar el formulario cuando se guarda una ciudad en localStorage (Prueba de interfaz de usuario UI)', () => {
      localStorage.setItem('city', 'Tucson');
      cy.reload(); // Recarga la página para que se aplique el almacenamiento
      cy.get('#myForm').should('not.be.visible'); // Verifica que el formulario esté oculto
      cy.get('#show-form-container').should('contain', 'Clima de Tucson');
    });
  
    it('Debe mostrar información meteorológica para una ciudad válida', () => {
      cy.clearLocalStorage();
      cy.get('#city').type('Tucson'); // Ingresa la ciudad
      cy.get('#form').submit(); // Enviar el formulario
      cy.get('#show-form-container').should('contain', 'Clima de Tucson');
    });
  
    it('Debería mostrar una alerta para una ciudad no válida (Manejo de errores)', () => {
      cy.get('#city').type('InvalidCity'); // Ingresa una ciudad inválida
      cy.get('#form').submit();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Ciudad no válida, por favor intente con otra.');
      });
    });
  
});
  