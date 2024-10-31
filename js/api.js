//Llamada a REST Countries
async function getCountryData(country) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await response.json();
    return data;
}


