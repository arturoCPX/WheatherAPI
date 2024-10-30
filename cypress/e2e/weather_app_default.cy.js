describe('Weather App Tests', () => {
    beforeEach(() => {
        cy.visit('index2.html'); // Cambia esto por la URL correcta de tu aplicación
    });

    it('should load initial cities and display their temperatures', () => {
        const cities = ['tucson', 'nogales', 'phoenix', 'dublin', 'chicago'];
        
        // Verifica que cada ciudad inicial esté presente en el contenedor `showForm`
        cities.forEach(city => {
            cy.get('#showForm').contains(`Clima de ${city}`);
        });
    });

    it('should add a new valid city to the list and localStorage', () => {
        const newCity = 'paris';

        // Ingresa el nombre de la ciudad en el formulario y presiona el botón de agregar
        cy.get('#city').type(newCity);
        cy.get('#addCity').click();

        // Verifica que la nueva ciudad esté presente en el contenedor `showForm`
        cy.get('#showForm').contains(`Clima de ${newCity}`);

        // Verifica que la nueva ciudad se haya agregado al localStorage
        cy.window().then(win => {
            const citiesArray = JSON.parse(win.localStorage.getItem('cities'));
            expect(citiesArray).to.include(newCity);
        });
    });

    

    it('should not add an invalid city and should show an error message', () => {
        const invalidCity = 'invalidcity123';

        // Ingresa una ciudad inválida en el formulario y presiona el botón de agregar
        cy.get('#city').type(invalidCity);
        cy.get('#addCity').click();

        // Verifica que el error de ciudad no válida sea mostrado
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Ciudad no válida');
        });

        // Verifica que la ciudad inválida no se haya agregado al contenedor `showForm`
        cy.get('#showForm').should('not.contain', `Clima de ${invalidCity}`);
    });
});
