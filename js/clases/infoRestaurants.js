class infoRestaurants {
    constructor(continent, country, restaurant, phone) {
        this.continent = continent;
        this.country = country;
        this.restaurant = restaurant;
        this.phone = phone;
    }

    render() {
        // Crear elementos HTML
        const section = document.createElement("section");
        const countryName = document.createElement("h2");
        const continentName = document.createElement("p");
        const restaurantName = docuemnt.createElement ("p");
        const phoneNumber = document.createElement("p");

        // Agregar clase al contenedor principal
        section.classList.add("restaurant-card");

        // Asignar texto a los elementos
        continentName.innerText = `Continent: ${this.continent}`;
        countryName.innerText = `País:${this.country}`;
        restaurantName.innerText = `Restaurante: ${this.restaurant}`;
        phoneNumber.innerText = `Contacto: ${this.phone}`;

        // Agregar elementos a la sección
        section.append(countryName, continentName, restaurantName, phoneNumber);
        
        return section; // Retornar el elemento <section> con toda la información
    }
}
// Crear instancia
const restaurant = new infoRestaurants("Continente", "País", "Restauarante", "Contacto");

// Agregar al DOM
document.body.appendChild(restaurant.render());




// Función para crear y agregar múltiples tarjetas al DOM
function displayRestaurants(restaurantsData) {
    // Seleccionar el contenedor donde se agregarán las tarjetas
    const container = document.getElementById("restaurants-container");

    // Iterar sobre cada objeto de datos de restaurante
    restaurantsData.forEach(data => {
        // Crear instancia de infoRestaurants
        const restaurant = new infoRestaurants(data.continent, data.country, data.phone);
        
        // Generar la tarjeta y agregarla al contenedor
        container.appendChild(restaurant.render());
    });
}

displayRestaurants ();