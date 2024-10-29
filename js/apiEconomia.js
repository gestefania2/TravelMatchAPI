// Ejemplo de consulta económica con Travelpayouts
async function getTravelCost(country) {
    const apiKey = 'YOUR_TRAVELPAYOUTS_API_KEY';
    const response = await fetch(`https://api.travelpayouts.com/data/price_matrix?country=${country}&currency=USD&token=${apiKey}`);
    const data = await response.json();
    return data;
}

// Llamada para actividades con Yelp Fusion
async function getYelpActivities(city, type) {
    const apiKey = 'YOUR_YELP_API_KEY';
    const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=${city}&categories=${type}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });
    const data = await response.json();
    return data;
}