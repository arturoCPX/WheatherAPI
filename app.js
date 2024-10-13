document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const myform = document.getElementById('myForm');
    const showFormContainer = document.getElementById('show-form-container');
    const clearCity = document.getElementById('clearCity');

    // Obtener ciudad de localStorage
    const defaultLocalStorage = localStorage.getItem('city');

    // Si existe una ciudad en localStorage(para mostrar o no el formulario)
    if (defaultLocalStorage) {
        console.log(`El valor default de LS es ${defaultLocalStorage}`);
        getCity(defaultLocalStorage); 
        myform.style.display = 'none';
    } else {
        console.log('Local Storage Vacio...');
        myform.style.display = 'block';
    }

    // Evento para agregar ciudad
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const city = document.getElementById('city').value.trim(); 
        if (city) {
            getCity(city);  // Validar primero si la ciudad existe(vacio)

        } else {
            alert('Ingrese una Ciudad');
        }
        
    });

    // Evento para borrar ciudad
    clearCity.addEventListener('click', function() {
        localStorage.removeItem('city');
        console.log('Local Storage borrado');
        showFormContainer.innerHTML = '';
        myform.style.display = 'block';
    });

    // Función para obtener el clima de la ciudad usando la API
    async function getCity(city) {
        const apiKEY = '0d1a44f21e6d22f838ecae58fc6cb342';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=metric&lang=es`;

        try {
            const respuesta = await fetch(apiUrl);
            if (!respuesta.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const datos = await respuesta.json();
            const temp = datos.main.temp;
            localStorage.setItem('city', city);  // Guardar solo si la ciudad es válida(nuestra validacion)
            console.log(`El valor de local storage es ${city}`);
            showCity(temp, city);
            myform.style.display = 'none';
        } catch (error) {
            alert('Ciudad no válida, por favor intente con otra.');
            console.error(error.message);
        }
    }

    // Función para mostrar el clima y la ciudad
    function showCity(temp, city) {
        showFormContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4 class="text-center">Clima de ${city}</h4>
                <p class="text-center">${temp}°C</p>
            </div>
        </div>
        `;
    }
});
