const Forecast = require("../models/forecast");

exports.insertForecast = async (city, forecastData) => {
  const forecastEntry = {
    city_id: city.city_id,
    dt: new Date(forecastData.dt * 1000),
    temp: forecastData.main.temp,
    temp_min: forecastData.main.temp_min,
    temp_max: forecastData.main.temp_max,
    humidity: forecastData.main.humidity,
  };

  try {
    await Forecast.create(forecastEntry);
    console.log("Forecast data inserted successfully.");
  } catch (error) {
    console.error("Error inserting forecast data - +");
    // console.error("Error inserting forecast data:", error);
  }
};
