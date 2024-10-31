import {apiKey} from "./apiKey.js";


document.getElementById('buscar-restaurantes').addEventListener('click', async () => {
    const ciudad = document.getElementById('ciudad').value; // Obtiene el valor de la ciudad seleccionada
    const url = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${ciudad}`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': "apiKey",
            'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Cambia a .json() para obtener el objeto JSON
        mostrarRestaurantes(result.data); // Llama a la función para mostrar los restaurantes
    } catch (error) {
        console.error(error);
    }
});

// Función para mostrar los restaurantes
function mostrarRestaurantes(restaurantes) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpiar resultados anteriores

    // Verifica si hay restaurantes
    if (!restaurantes || restaurantes.length === 0) {
        resultado.innerHTML = '<p>No se encontraron restaurantes.</p>';
        return;
    }

    // Muestra cada restaurante en la página
    restaurantes.forEach(restaurant => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>${restaurant.description || 'Descripción no disponible.'}</p>
            <p>Rating: ${restaurant.rating || 'No disponible'}</p>
            <hr>
        `;
        resultado.appendChild(div);
    });
}