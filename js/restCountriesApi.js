//para obtner la lista de todos los paises
const BASE_URL = 'https://restcountries.com/v3.1/all';


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const countries = await fetchCountries();
        const continents = getContinents(countries);
        populateContinentSelect(continents);
        setupCountryFilter(countries);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});

// Función para obtener la lista de países desde la API
async function fetchCountries() {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('No se pudo obtener la lista de países');
    return await response.json();
}

// Función para obtener una lista de continentes únicos
function getContinents(countries) {
    const continents = new Set(countries.map(country => country.region));
    return Array.from(continents).filter(Boolean); // Elimina valores vacíos
}

/* Función para llenar el selector de continentes*/
function populateContinentSelect(continents) {
    const continentSelect = document.getElementById('continent');
    continentSelect.innerHTML = '<option value="">Selecciona un continente</option>'; // Opción por defecto

    continents.forEach(continent => {
        const option = document.createElement('option');
        option.value = continent;
        
        // Traducir el nombre del continente directamente aquí
        switch (continent) {
            case "Africa":
                option.textContent = "África";
                break;
            case "Antarctic":
                option.textContent = "Antártida";
                break;
            case "Americas":
                option.textContent = "América";
                break;
            case "Asia":
                option.textContent = "Asia";
                break;
            case "Europe":
                option.textContent = "Europa";
                break;
            case "Oceania":
                option.textContent = "Oceanía";
                break;
            default:
                option.textContent = continent; // Si no hay traducción, usar el nombre original
                break;
        }

        continentSelect.appendChild(option);
    });
}

// Configurar el filtro de países por continente
function setupCountryFilter(countries) {
    const continentSelect = document.getElementById('continent');
    const countrySelect = document.getElementById('country');

    continentSelect.addEventListener('change', () => {
        const selectedContinent = continentSelect.value;
        // Filtrar países por continente seleccionado
        const filteredCountries = countries.filter(country => country.region === selectedContinent);
        populateCountrySelect(filteredCountries);
    });
}

// Función para llenar el selector de países en español
function populateCountrySelect(countries) {
    const countrySelect = document.getElementById('country');
    countrySelect.innerHTML = '<option value="">Selecciona un país</option>'; // Limpiar y agregar opción por defecto

    countries.forEach(country => {
        const option = document.createElement('option');
        const countryName = country.translations?.spa?.common || country.name.common; // Nombre en español o común
        option.value = countryName;
        option.textContent = countryName;
        countrySelect.appendChild(option);
    });
}

// Función para obtener recomendaciones cuando se hace clic en el botón
function getRecommendations() {
    const form = document.getElementById('travelForm');
    const selectedContinent = form.continent.value;
    const selectedCountry = form.country.value;
    const selectedEconomy = form.economy.value;
    const selectedTravelType = form.travelType.value;

    // Aquí puedes agregar la lógica para mostrar recomendaciones según las selecciones
    console.log(`Continente seleccionado: ${selectedContinent}`);
    console.log(`País seleccionado: ${selectedCountry}`);
    console.log(`Economía seleccionada: ${selectedEconomy}`);
    console.log(`Tipo de viaje seleccionado: ${selectedTravelType}`);

    // Ejemplo de cómo podrías mostrar recomendaciones
    alert(`Recomendaciones: \nContinente: ${selectedContinent} \nPaís: ${selectedCountry} \nEconomía: ${selectedEconomy} \nTipo de viaje: ${selectedTravelType}`);
}



/* Función para llenar el selector de países
function populateCountrySelect(countries) {
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        const countryName = country.translations?.spa?.common || country.name.common;
        option.value = countryName || country.name.common; // Nombre común del país
        option.textContent = countryName || country.name.common;
        countrySelect.appendChild(option);
    });
}

 // Agregar un evento para detectar el cambio de selección de país
 countrySelect.addEventListener('change', async () => {
    const selectedCountry = countrySelect.value;
    if (selectedCountry) {
        await showCountryInfo(selectedCountry);
    }
});


// Función para construir la URL de búsqueda en REST Countries
function getCountrySearchUrl(countryName) {
    const baseUrl = 'https://restcountries.com/v3.1/name/';
    const encodedCountryName = encodeURIComponent(countryName.trim());
    return `${baseUrl}${encodedCountryName}`;
}

// Función para mostrar la información del país seleccionado
async function showCountryInfo(countryName) {
    const url = getCountrySearchUrl(countryName);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener datos del país');
        const countryData = await response.json();
        displayCountryInfo(countryData[0]); // El primer resultado es el país
    } catch (error) {
        console.error('Error al mostrar la información del país:', error);
    }
}

// Función para mostrar los datos del país en la página
function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'No disponible'}</p>
        <p><strong>Región:</strong> ${country.region}</p>
        <p><strong>Subregión:</strong> ${country.subregion}</p>
        <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Idioma(s):</strong> ${Object.values(country.languages || {}).join(', ')}</p>
        <p><strong>Moneda:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : 'No disponible'}</p>
        <p><strong>Bandera:</strong> <img src="${country.flags.png}" alt="Bandera de ${country.name.common}" width="50"></p> 
    `;
}*/