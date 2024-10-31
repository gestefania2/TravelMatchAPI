import { API_KEY } from "./apiKey.js";
import { API_SECRET } from "./apiKey.js";

const AMADEUS_URL = 'https://test.api.amadeus.com/v1/';

export async function getToken() {
    const url = AMADEUS_URL + 'security/oauth2/token';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({

            grant_type: 'client_credentials',
            client_id: API_KEY,
            client_secret: API_SECRET

        })
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data.access_token;


}

export async function getRestaurants(lat, lng) {
    const token = await getToken();
    const url = new URL(AMADEUS_URL + 'reference-data/locations/pois')
    url.searchParams.append("radius", 20);
    url.searchParams.append("latitude", lat);
    url.searchParams.append("longitude", lng);
    url.searchParams.append("page[limit]",10);
    url.searchParams.append("page[offset]",0);
    url.searchParams.append("categories","RESTAURANT")
    const options = {
        headers: {
            'Authorization': 'Bearer '+token
        },
    }
    const result = await fetch(url.toString(), options);
    const data = await result.json();
    console.log (data);
}
