const axios = require("axios");
const City = require("../models/city"); // Update the path to your City model
const db = require("../config/mongo"); // Update the path to your City model

async function fetchAndUpdateField() {
  try {
    const cities = await City.find();
    let i = 0;
    for (const city of cities) {
      // Get city coordinates
      const { city_latitude, city_longitude } = city;

      // Build the OpenWeatherMap API URL
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city_latitude}&lon=${city_longitude}&appid=${process.env.API_KEY}`;

      // Make a request to OpenWeatherMap API
      const response = await axios.get(apiUrl);
      const { name } = response.data;
      //   console.log(city, name);

      const result = await City.findOneAndUpdate(
        { _id: city._id },
        { $set: { city_subtitle: name } }
      );

      if (result.modifiedCount > 0) {
        console.log(city.name + " is updated just now");
      }
    }

    console.log("Done !");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the function
fetchAndUpdateField();
