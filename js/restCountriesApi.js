import { getRestaurants } from "./amadeusApi.js";

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
    // Excluye la Antártida de la lista de continentes
    const continents = new Set(countries
        .map(country => country.region)
        .filter(region => region && region !== 'Antarctic')
    );
    return Array.from(continents);
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
        const filteredCountries = countries
            .filter(country => country.region === selectedContinent && country.region !== 'Antarctic');
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
        const latlng = country.capitalInfo.latlng || country.latlng;
        option.value = countryName +","+ latlng.toString();
        option.textContent = countryName;
        countrySelect.appendChild(option);
        
    });
}

const form = document.getElementById('travelForm');
form.addEventListener("submit",(evento) => {
    evento.preventDefault()
  const valorpaislatlng =  evento.target.country.value
  const arrayPaisLatLng = valorpaislatlng.split(",");
  const country = arrayPaisLatLng[0];
  const lat = arrayPaisLatLng[1];
  const lng = arrayPaisLatLng[2];
  console.log (`país: ${country}, latitud: ${lat}, longitud: ${lng}`);
  getRestaurants (lat, lng);
  

} )







/*"capitalInfo": {
    "latlng": [
        42.5,
        1.52*/



/* Inicializar datos al cargar (para que no salga ninguna búsqueda seleccionada)
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const countries = await fetchCountries();
        const continents = getContinents(countries);
        populateContinentSelect(continents);
        setupCountryFilter(countries);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}); */

/* Función para obtener recomendaciones cuando se hace clic en el botón
function getRecommendations() {
    const form = document.getElementById('travelForm');
    const selectedContinent = form.continent.value;
    const selectedCountry = form.country.value;
    

    // Aquí puedes agregar la lógica para mostrar recomendaciones según las selecciones
    console.log(`Continente seleccionado: ${selectedContinent}`);
    console.log(`País seleccionado: ${selectedCountry}`);
*/
