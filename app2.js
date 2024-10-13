document.addEventListener('DOMContentLoaded', function() {
    let cities = ['tucson', 'nogales', 'phoenix', 'dublin', 'chicago'];
    console.log(cities);
    //localStorage.setItem('cities', JSON.stringify(cities));
 
    
    // Recuperamos las ciudades del LocalStorage o usamos las iniciales
    const defaultArray = JSON.parse(localStorage.getItem('cities')) || cities;
    defaultArray.sort();
    console.log(`El valor del LS es: ${defaultArray}`);

    const showForm = document.getElementById('showForm');
    const addCity = document.getElementById('addCity');

    let maxTemp = -Infinity; // Variable para almacenar la temperatura máxima
    let hottestCity = ''; // Ciudad con la temperatura más alta

    // Evento para agregar ciudad
    addCity.addEventListener('click', function() {
        const city = document.getElementById('city').value.trim();
        if (city) { // Aseguramos que no se agregue una ciudad vacía
            getCity(city, true);  // Llamamos a la función de validación para verificar antes de agregar
        }
        document.getElementById('city').value = ''; 
    });

    // Recorre todas las ciudades iniciales y obtiene el clima
    for (let i = 0; i < defaultArray.length; i++) {
        let value = defaultArray[i];
        getCity(value, false);  // Llamamos a la función sin agregar al localStorage
    }

    // Función para obtener el clima de la ciudad usando la API y validar si debe agregarse al LocalStorage
    async function getCity(city, shouldAddToLocalStorage) {
        const apiKEY = '0d1a44f21e6d22f838ecae58fc6cb342';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=metric&lang=es`;

        try {
            const respuesta = await fetch(apiUrl);
            if (!respuesta.ok) {
                throw new Error('Ciudad no encontrada');
            }

            const datos = await respuesta.json();
            const temp = datos.main.temp;

            // Verificamos si es la temperatura más alta
            if (temp > maxTemp) {
                maxTemp = temp;
                hottestCity = city;
                console.log(`La ciudad más caliente hasta ahora es ${hottestCity} con ${maxTemp}°C`);
            }

            // Si la validación es correcta y no existe en el localStorage, la agregamos
            if (shouldAddToLocalStorage && !defaultArray.includes(city)) {
                defaultArray.push(city);
                defaultArray.sort();
                localStorage.setItem('cities', JSON.stringify(defaultArray));
                console.log(`El valor del LS es: ${defaultArray}`);
            }

            // Mostramos la ciudad y su clima
            showCity(temp, city);

        } catch (error) {
            alert('Ciudad no válida, por favor intente con otra.');
            console.error(error.message);
        }
    }

    // Función para mostrar el clima y la ciudad
    function showCity(temp, city) {
        // Generamos una clase CSS especial si es la ciudad más caliente
        let hotClass = (city === hottestCity) ? 'hottest' : '';
        showForm.innerHTML += `
        <div class="card ${hotClass}">
            <div class="card-body">
                <h4 class="text-center">Clima de ${city}</h4>
                <p class="text-center">${temp}°C</p>
            </div>
        </div>
        `;

        // Actualizamos las tarjetas después de cada renderizado para marcar la ciudad más caliente
        markHottestCity();
    }

    // Función para marcar la ciudad más caliente con estilo
    function markHottestCity() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (card.querySelector('h4').textContent.includes(hottestCity)) {
                card.classList.add('hottest'); // Agrega una clase especial a la ciudad más caliente
            } else {
                card.classList.remove('hottest'); // Remueve la clase de las demás
            }
        });
    }
});
