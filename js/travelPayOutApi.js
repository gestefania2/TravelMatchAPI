
// Función principal para obtener las recomendaciones
async function getRecommendations() {
    const country = document.getElementById('country').value;
    const economy = document.getElementById('economy').value;
    const travelType = document.getElementById('travelType').value;

    // Obtén opciones económicas desde Travelpayouts
    const travelCost = await getTravelCost(country);

    // Obtén actividades desde Yelp según el tipo de viaje
    const activities = await getYelpActivities(country, travelType);

    // Mostrar resultados
    displayResults(travelCost, activities);
}


// Función para obtener datos económicos desde Travelpayouts
async function getTravelCost(country) {
    const apiKey = 'YOUR_TRAVELPAYOUTS_API_KEY';
    try {
        const response = await fetch(`https://api.travelpayouts.com/v1/prices/cheap?origin=${country}&currency=USD&token=${apiKey}`);
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo costos de viaje:', error);
    }
}

// Función para obtener actividades desde Yelp según el tipo de viaje
async function getYelpActivities(city, travelType) {
    const apiKey = 'YOUR_YELP_API_KEY';
    const categories = {
        relax: 'spas',
        culture: 'museums',
        adventure: 'hiking',
        gastronomy: 'restaurants'
    };
    const category = categories[travelType];
    try {
        const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=${city}&categories=${category}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo actividades:', error);
    }
}

// Mostrar los resultados en la página
function displayResults (travelCost, activities) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores


    // Mostrar costos de viaje
    if (travelCost) {
        resultsDiv.innerHTML += `<h3>Costo aproximado</h3>`;
        resultsDiv.innerHTML += `<p>Precio de vuelos: $${travelCost.data}</p>`;
    }

    // Mostrar actividades
    if (activities) {
        resultsDiv.innerHTML += `<h3>Actividades sugeridas</h3>`;
        activities.businesses.forEach(activity => {
            resultsDiv.innerHTML += `<p>${activity.name} - ${activity.location.address1}</p>`;
        });
    }
}