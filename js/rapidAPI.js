const url = 'https://ai-trip-planner.p.rapidapi.com/?';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '171fda59b7mshe4eec90ec52121bp159b9fjsnd0b30821c8c2',
		'x-rapidapi-host': 'ai-trip-planner.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// Definir parámetros de búsqueda
const params = new URLSearchParams({
    query: 'restaurante',  // Término de búsqueda
    location_id: 'New York' // Ubicación específica
  }).toString();
  
// Realizar solicitud
  fetch(`${url}?${params}`, options)
    .then(response => {
      if (!response.ok) throw new Error(`Error ${response.status}`);
      return response.json();
    })
    .then(data => {
      data.data.forEach(location => {
        console.log(`Nombre: ${location.name}`);
        console.log(`Ubicación: ${location.location_string}`);
        console.log(`Calificación: ${location.rating}`);
        console.log('---');
      });
    })
    .catch(error => {
      console.error('Error:', error.message);
    });