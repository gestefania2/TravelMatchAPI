document.addEventListener('DOMContentLoaded', displayFavorites);

function displayFavorites() {
    const favoritesDiv = document.getElementById('favorites');
    const favorites = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');

    if (favorites.length === 0) {
        favoritesDiv.innerHTML = `
            <div class="no-favorites">
                <p>No tienes restaurantes favoritos guardados.</p>
            </div>`;
        return;
    }

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('restaurants-grid');

    favorites.forEach(restaurant => {
        const tags = restaurant.tags || {};
        
        const card = document.createElement('div');
        card.classList.add('restaurant-card');

        card.innerHTML = `
            <div class="restaurant-header">
                <h3>${tags.name || 'Restaurante sin nombre'}</h3>
                <button class="favorite-btn active" data-id="${restaurant.id}">★</button>
            </div>
            <div class="restaurant-info">
                <p><strong>Tipo de cocina:</strong> ${tags.cuisine || 'No especificada'}</p>
                <p><strong>Dirección:</strong> ${tags['addr:street'] || 'No disponible'} ${tags['addr:housenumber'] || ''}</p>
                ${tags.opening_hours ? `<p><strong>Horario:</strong> ${tags.opening_hours}</p>` : ''}
                ${tags.phone ? `<p><strong>Teléfono:</strong> ${tags.phone}</p>` : ''}
                ${tags.website ? `<p><strong>Sitio web:</strong> <a href="${tags.website}" target="_blank" rel="noopener noreferrer">Visitar</a></p>` : ''}
            </div>
        `;

        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            removeFavorite(restaurant.id);
            card.remove();
            if (document.querySelectorAll('.restaurant-card').length === 0) {
                displayFavorites();
            }
        });

        gridContainer.appendChild(card);
    });

    favoritesDiv.innerHTML = '';
    favoritesDiv.appendChild(gridContainer);
}

function removeFavorite(restaurantId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteRestaurants') || '[]');
    favorites = favorites.filter(fav => fav.id !== restaurantId);
    localStorage.setItem('favoriteRestaurants', JSON.stringify(favorites));
}
