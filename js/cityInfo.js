class cityInfo {
    constructor(continent,country,city){
    this.continent = continent;
    this.country = country;
    this.city = city;
    //this.imageCity = imageCity;
}



render() {
    const section = document.createElement("section");
    //const imageCity = document.createElement("img");
    const cityName = document.createElement('h1');
    const countryName = document.createElement("h2");
    const continentName = document.createElement ("p");
  
    

    section.classList.add("city-card");
    //imageCity.src = this.imageCity
    cityName.innerText = this.country, this.continent;

    section.append(image, continentName, countryName, cityName);
    return section;
}

}