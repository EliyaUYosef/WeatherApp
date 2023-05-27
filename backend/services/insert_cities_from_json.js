const axios = require("axios");
const db = require("../config/mongo"); // Assuming mongo.js is in the same directory

// const MOST_INTRESTING_CITIES = ["New York", "London", "Tokyo"]; // Replace with your array of city names

async function fetchCityData(cityName, city_id) {
  try {
    const existingCity = await db
      .collection("city")
      .findOne({ city_name: cityName });

    if (existingCity) {
      console.log(`${city_id}. Data already exists for ${cityName}`);
      return true;
    }

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          q: cityName,
          limit: 1,
        },
      }
    );

    if (response.data.length > 0) {
      const city = response.data[0];
      const { lat, lon } = city;

      // Insert the city data into the collection
      await db.collection("city").insertOne({
        city_name: cityName,
        city_id: city_id,
        city_latitude: parseFloat(lat),
        city_longitude: parseFloat(lon),
      });

      console.log(`Data inserted for ${cityName}`);
    } else {
      console.log(`No data found for ${cityName}`);
    }
  } catch (error) {
    console.error(`Error fetching data for ${cityName}:`, error.message);
  }
  return false;
}

async function insertCitiesData() {
  let city_id = 1;
  for (const cityName of MOST_INTRESTING_CITIES) {
    console.log(cityName);
    let res = await fetchCityData(cityName, city_id);
    console.log(res);
    city_id++;
  }
}

insertCitiesData();
