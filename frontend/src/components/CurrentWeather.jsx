import React, { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { convertTimezoneToDateTime, calculateSunRiseOver } from "../utils";

const CurrentWeather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState("10n");
  const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
  const now_unix_ts = Math.floor(Date.now() / 1000);
  const { data, error, isLoading } = useFetch(
    `http://localhost:3001/api/weather/currentDetails/${city._id}`
  );

  useEffect(() => {
    if (data) {
      setWeatherData(data);
      console.log(data);
      setIcon(data.weather[0].icon);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="current-weather">
      {weatherData && (
        <div style={{ lineHeight: "35px" }}>
          {/* <h3>{weatherData.name}</h3> */}
          <img src={iconURL} className="weather-icon" alt="Weather Icon" />
          <br />
          <span className="current-weather-description">
            {weatherData.weather[0].main}-{" "}
            <span style={{ fontSize: "90%" }}>
              {weatherData.weather[0].description}
            </span>
          </span>
          <br />
          <span>
            <span className="as-title">Wind ( speed ) :</span>{" "}
            {weatherData.wind.speed}
          </span>
          <br />
          <span>
            <span className="as-title"> Time :</span>{" "}
            {convertTimezoneToDateTime(weatherData.timezone)}
          </span>
          <br />
          <span>
            <span className="as-title">humidity :</span>{" "}
            {weatherData.main.humidity}
          </span>
          {now_unix_ts + weatherData.timezone / 60 / 60 >
            weatherData.sys.sunrise &&
            now_unix_ts <
              weatherData.sys.sunset + weatherData.timezone / 60 / 60 && (
              <div className="sun-status">
                <div className="sun">
                  sunrise : {convertTimezoneToDateTime(weatherData.sys.sunrise)}
                </div>
                <div
                  className="sun-range-parent"
                  style={{
                    border: "1px solid #fff",
                    background: "transparent",
                    borderRadius: "15px",
                    padding: "2px",
                  }}
                >
                  <div
                    className="sun-range"
                    style={{
                      width:
                        calculateSunRiseOver(
                          weatherData.sys.sunrise,
                          weatherData.sys.sunset
                        ) + "%",
                    }}
                  ></div>
                </div>
                <div className="sun">
                  sunset : {convertTimezoneToDateTime(weatherData.sys.sunset)}
                </div>
              </div>
            )}
          {/* <DebugComponent object={weatherData} /> */}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
