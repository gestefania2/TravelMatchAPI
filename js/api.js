
// Ejemplo básico de cómo hacer una llamada a REST Countries
async function getCountryData(country) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await response.json();
    return data;
}

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