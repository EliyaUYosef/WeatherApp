const City = require("./models/city");
const mongoose = require("mongoose");

const axios = require("axios");
const db = require("./config/mongo");
const Forecast = require("./models/forecast");

exports.getCurrentDetailsForCity = async (req, res, next) => {
  const { cityId } = req.params;

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    const apiKey = process.env.API_KEY; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.city_latitude}&lon=${city.city_longitude}&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    const full_city = response.data;
    res.json(full_city);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching cities" });
  }
};

exports.fetchWeatherData = async (city) => {
  const city_name = city.city_name.replace(/-/g, "%20");
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const city_list = response.data.list;

    let my_response = city_list.map((city_details) => {
      const city_humidity_obj = {
        city_name: city.city_name,
        humidity_time: city_details.dt_txt,
        humidity_time_dt: city_details.dt,
        city_id: city.city_id,
        city_mongo_id: city._id,
        temp: city_details.main.temp,
        temp_min: city_details.main.temp_min,
        temp_max: city_details.main.temp_max,
        temp_max: city_details.main.humidity,
      };

      return city_humidity_obj;
    });

    if (false && CODE_DEBUG_MODE) {
      console.log(YELLOW + LINE);
      console.log(`Weather data for ${city.city_name}`);
      console.log(YELLOW + " ---------------------------------");
      console.log(response.data.list[0].dt_txt);
      console.log(city.city_id);
      console.log(city._id);
      console.log(response.data.list[0].main.temp);
      console.log(response.data.list[0].main.temp_min);
      console.log(response.data.list[0].main.temp_max);
      console.log(response.data.list[0].main.humidity);
      console.log(weather_time);
      console.log(YELLOW + LINE + RESET);
    }

    // Process the weather data response as needed
    return my_response;
  } catch (error) {
    console.error(
      RED +
        LINE +
        `Error fetching weather data for ${city.city_name}` +
        LINE +
        RESET,
      error
    );
  }
};

exports.getAllCitiesWithParams = async (req, res) => {
  const { search, limit, orderBy } = req.query;

  try {
    const regex = new RegExp(search, "i"); // Create case-insensitive regular expression

    // Create the search query
    const query = {
      city_name: { $regex: regex }, // Case-insensitive search for city name
    };
    // Fetch cities from the collection
    const cities = await db
      .collection("city")
      .find(query)
      .sort({ name: orderBy === "ASC" ? 1 : -1 })
      .limit(parseInt(limit, 10))
      .toArray();

    // add temp
    const currentTimestamp = new Date().getTime() / 1000;
    for (const city of cities) {
      const ob = await db
        .collection("forecast")
        .aggregate([
          {
            $match: {
              city_mongo_id: city._id,
            },
          },
          {
            $addFields: {
              timeDifference: {
                $abs: { $subtract: ["$humidity_time_dt", currentTimestamp] },
              },
            },
          },
          {
            $sort: { timeDifference: 1 },
          },
          {
            $limit: 1,
          },
        ])
        .toArray();
      city.temp = ob[0].temp;
    }

    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "An error occurred while fetching cities" });
  }
};

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find().limit(17);
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching cities" });
  }
};

exports.getWeatherData = async (req, res) => {
  const { cityId } = req.params;

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    const forecasts = await Forecast.find({ city_name: city.city_name }).sort({
      humidity_time_dt: 1,
    }); // Sort by humidity_time_dt in ascending order

    const response = {
      city: city,
      forecasts: forecasts,
      avg_temps_by_days: await parseAvgTempsByDays(forecasts),
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data" });
  }
};
const parseAvgTempsByDays = async (forecasts) => {
  let temp_date = "";
  let avg_temp_min = 0;
  let avg_temp_max = 0;
  let avg_temp = 0;
  let count = 0;
  let temp_by_date = [];
  let index = 0;

  for (const forecast of forecasts) {
    const date = new Date(forecast.humidity_time_dt * 1000).toLocaleDateString(
      "default"
    );

    if (date === temp_date) {
      count++;
      avg_temp_min += forecast.temp_min;
      avg_temp_max += forecast.temp_max;
      avg_temp += forecast.temp;
    } else {
      if (temp_date) {
        const average_temp_min = (avg_temp_min / count).toFixed(2);
        const average_temp_max = (avg_temp_max / count).toFixed(2);
        const average_temp = (avg_temp / count).toFixed(2);
        temp_by_date.push({
          id: index++,
          temp_min: parseFloat(average_temp_min),
          temp_max: parseFloat(average_temp_max),
          temp: parseFloat(average_temp),
          date: temp_date,
        });
      }

      avg_temp_min = forecast.temp_min;
      avg_temp_max = forecast.temp_max;
      avg_temp = forecast.temp;
      count = 1;
      temp_date = date;
    }
  }

  if (temp_date) {
    const average_temp_min = (avg_temp_min / count).toFixed(2);
    const average_temp_max = (avg_temp_max / count).toFixed(2);
    const average_temp = (avg_temp / count).toFixed(2);
    temp_by_date.push({
      id: index++,
      temp_min: parseFloat(average_temp_min),
      temp_max: parseFloat(average_temp_max),
      temp: parseFloat(average_temp),
      date: temp_date,
    });
  }

  return temp_by_date;
};
