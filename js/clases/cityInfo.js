class countryInfo {
    constructor(continent,country,capital){
    this.continent = continent;
    this.country = country;
    this.capital = capital;
    //this.imageCountry = imageCountry;
}


render() {
    const section = document.createElement("section");
    //const imageCountry = document.createElement("img");
    const capitalName = document.createElement('h1');
    const countryName = document.createElement("h2");
    const continentName = document.createElement ("p");
  
    

    section.classList.add("city-card");
    //imageCountry.src = this.imageCountry
    cityName.innerText = this.country, this.continent;
    section.append(image, continentName, countryName, capitalName);
    return section;
}

}