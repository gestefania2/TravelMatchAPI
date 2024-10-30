import {API_KEY} from "./apiKey.js";


// Definir las categorías con sus términos específicos
const categoriasviajes = {
  cultura: 'museum',
  gastronomia: 'restaurant',
  relax: 'spa',
  aventura: 'hiking'
};

// Agregar listener para detectar el cambio de selección
document.getElementById('categoriasviajes').addEventListener('change', (event) => {
  const categoriaviaje = event.target.value; // Obtener la categoría seleccionada
  if (categoriaviaje) {
    buscarCategoria(categoriaviaje); // Ejecutar la búsqueda si se selecciona una categoría
  }
});

// Función para buscar según la categoría seleccionada
function buscarCategoria(categoriaviaje) {
  const terminoBusqueda = categoriasviajes[categoriaviaje]; // Obtiene el término según la categoría

  const url = `https://tripadvisor1.p.rapidapi.com/locations/search?query=${terminoBusqueda}&location_id=New York&limit=5`; // Cambia 'New York' por la ciudad deseada

  // Opciones de solicitud
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'tripadvisor1.p.rapidapi.com'
    }
  };

  // Realizar solicitud a la API
  fetch(url, options)
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return response.json();
    })
    .then(data => mostrarResultados(data))
    .catch(error => console.error('Error en la búsqueda:', error));
}

// Función para mostrar los resultados en la web
function mostrarResultados(data) {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = ''; // Limpia los resultados anteriores

  data.data.forEach(item => {
    // Crear un div para cada resultado
    const itemDiv = document.createElement('div');
    itemDiv.className = 'resultado';

    // Información que queremos mostrar
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Ubicación: ${item.location_string}</p>
      <p>Calificación: ${item.rating}</p>
    `;

    // Agregar el resultado al contenedor de resultados
    resultadosDiv.appendChild(itemDiv);
  });
}