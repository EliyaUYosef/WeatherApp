import React, { useContext, useEffect, useState } from "react";
import { CityContext } from "../CityContext";
import CurrentWeather from "./CurrentWeather";
import { convertKelvinToCelsius } from "../utils.js";
require("../WeatherData.css");

const WeatherData = () => {
  const { clickedCityId } = useContext(CityContext);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clean, setClean] = useState(true);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        if (clickedCityId) {
          const response = await fetch(
            `http://localhost:3001/api/weather/${clickedCityId}`
          );
          const data = await response.json();
          console.log(data);
          setClean(false);
          setIsLoading(false);
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [clickedCityId]);

  return (
    <div className="weather-data">
      {!clean ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {weatherData ? (
              <div>
                <span style={{ fontSize: "70%" }}>Weather for :</span> <br />
                <span style={{ fontSize: "300%" }}>
                  {weatherData.city.city_name} |{" "}
                </span>
                <span style={{ fontSize: "200%", color: "#fff" }}>
                  {weatherData.city.city_subtitle}
                </span>
                <span
                  style={{
                    fontSize: "250%",
                    color: "#fff",
                    float: "right",
                  }}
                >
                  {convertKelvinToCelsius(weatherData.forecasts[0].temp)}
                  <span>&#176;</span>
                </span>
                <div>
                  <CurrentWeather city={weatherData.city} />
                  <br />
                  <hr />
                  <div className="element-list">
                    {weatherData.avg_temps_by_days.map((forecast, i) => (
                      <div key={forecast.id} className="element">
                        <h3 style={{ color: "#fff" }}>
                          {weekday[new Date(forecast.date).getDay()]}
                        </h3>
                        <span style={{ fontSize: "135%" }}>
                          {convertKelvinToCelsius(forecast.temp)}
                          <span>&#176;</span>
                        </span>
                        <br />
                        <span style={{ fontSize: "90%" }}>
                          max - {forecast.temp_max}
                        </span>
                        <hr className="between-temp" />
                        <span style={{ fontSize: "90%" }}>
                          min - {convertKelvinToCelsius(forecast.temp_min)}
                          &#176;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>No weather data available</div>
            )}
          </div>
        )
      ) : (
        <div>> Please Choose city for more details about here =]</div>
      )}
    </div>
  );
};

export default WeatherData;
