const City = require("../models/city");
const axios = require("axios");

exports.fetchWeatherData = async (city) => {
  // const { city_latitude, city_longitude } = city;
  const city_name = city.city_name.replace(/-/g, "%20");
  const apiKey = process.env.API_KEY; // Replace with your actual API key
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
        RESET
    );
    // console.error(error);
  }
};

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "An error occurred while fetching cities" });
  }
  // console.log(YELLOW + LINE + "REQUEST" + LINE + RESET);
};
