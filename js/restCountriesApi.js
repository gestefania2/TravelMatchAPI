// URL base para obtener la lista de todos los países
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
    if (!response.ok) throw new Error('No se puede obtener la lista de países');
    return await response.json();
}

// Función para obtener una lista de continentes únicos
function getContinents(countries) {
    const continents = new Set(
        countries.map(country => country.region).filter(region => region && region !== 'Antarctic')
    );
    return Array.from(continents);
}

// Función para llenar el selector de continentes
function populateContinentSelect(continents) {
    const continentSelect = document.getElementById('continent');
    continentSelect.innerHTML = '<option value="">Selecciona un continente</option>'; // Opción por defecto

    continents.forEach(continent => {
        const option = document.createElement('option');
        option.value = continent;
        switch (continent) {
            case "Africa": option.textContent = "África"; break;
            case "Americas": option.textContent = "América"; break;
            case "Asia": option.textContent = "Asia"; break;
            case "Europe": option.textContent = "Europa"; break;
            case "Oceania": option.textContent = "Oceanía"; break;
            default: option.textContent = continent; break;
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
        const filteredCountries = countries
            .filter(country => country.region === selectedContinent && country.region !== 'Antarctic');
        populateCountrySelect(filteredCountries);
    });
}

// Función para llenar el selector de países
function populateCountrySelect(countries) {
    const countrySelect = document.getElementById('country');
    countrySelect.innerHTML = '<option value="">Selecciona un país</option>';

    countries.forEach(country => {
        const option = document.createElement('option');
        const countryName = country.translations?.spa?.common || country.name.common;
        const latlng = country.capitalInfo.latlng || country.latlng;
        option.value = `${countryName},${latlng}`;
        option.textContent = countryName;
        countrySelect.appendChild(option);
    });
}

// Manejo del formulario para obtener el país seleccionado y buscar restaurantes
const form = document.getElementById('travelForm');
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const valorpaislatlng = evento.target.country.value;
    const arrayPaisLatLng = valorpaislatlng.split(",");
    const country = arrayPaisLatLng[0];
    const lat = arrayPaisLatLng[1];
    const lng = arrayPaisLatLng[2];
    console.log(`país: ${country}, latitud: ${lat}, longitud: ${lng}`);
    getRestaurants(lat, lng);
});

// Función para buscar restaurantes usando Overpass API
async function getRestaurants(lat, lng) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p class="loading">Buscando restaurantes...</p>';

    try {
        const query = `
            [out:json];
            (
                node["amenity"="restaurant"](around:5000,${lat},${lng});
            );
            out body;
            >;
        `;
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        if (!response.ok) {
            throw new Error('Error al buscar restaurantes');
        }

        const data = await response.json();
        displayRestaurants(data.elements);
    } catch (error) {
        resultsDiv.innerHTML = `
            <div class="error-message">
                <p>Error al buscar restaurantes. Por favor, inténtalo de nuevo más tarde.</p>
            </div>`;
        console.error('Error:', error);
    }
}

function displayRestaurants(restaurants) {
    const resultsDiv = document.getElementById('results');

    if (!restaurants || restaurants.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <p>No se encontraron restaurantes en esta zona.</p>
            </div>`;
        return;
    }

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('restaurants-grid');

    restaurants.forEach(restaurant => {
        const tags = restaurant.tags || {};
        
        const card = document.createElement('div');
        card.classList.add('restaurant-card', 'bordered');

        // Verificar si el restaurante ya está en favoritos
        const favorites = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');
        const isFavorite = favorites.some(fav => fav.id === restaurant.id);

        card.innerHTML = `
            <div class="restaurant-header">
                <h3>${tags.name || 'Restaurante sin nombre'}</h3>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${restaurant.id}">
                    ${isFavorite ? '★' : '☆'}
                </button>
            </div>
            <div class="restaurant-info">
                <p><strong>Tipo de cocina:</strong> ${tags.cuisine || 'No especificada'}</p>
                <p><strong>Dirección:</strong> ${tags['addr:street'] || 'No disponible'} ${tags['addr:housenumber'] || ''}</p>
                ${tags.opening_hours ? `<p><strong>Horario:</strong> ${tags.opening_hours}</p>` : ''}
                ${tags.phone ? `<p><strong>Teléfono:</strong> ${tags.phone}</p>` : ''}
                ${tags.website ? `<p><strong>Sitio web:</strong> <a href="${tags.website}" target="_blank" rel="noopener noreferrer">Visitar</a></p>` : ''}
            </div>
        `;

        // Añadir event listener para el botón de favoritos
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => toggleFavorite(restaurant));

        gridContainer.appendChild(card);
    });

    resultsDiv.innerHTML = '';
    resultsDiv.appendChild(gridContainer);
}

// Añadir esta nueva función después de displayRestaurants
function toggleFavorite(restaurant) {
    let favorites = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');
    const index = favorites.findIndex(fav => fav.id === restaurant.id);

    if (index === -1) {
        // Añadir a favoritos
        favorites.push({
            id: restaurant.id,
            tags: restaurant.tags,
            lat: restaurant.lat,
            lon: restaurant.lon
        });
    } else {
        // Eliminar de favoritos
        favorites.splice(index, 1);
    }

    localStorage.setItem('favoriteRestaurants', JSON.stringify(favorites));

    // Actualizar el botón
    const btn = document.querySelector(`.favorite-btn[data-id="${restaurant.id}"]`);
    if (btn) {
        btn.classList.toggle('active');
        btn.textContent = btn.classList.contains('active') ? '★' : '☆';
    }
}

