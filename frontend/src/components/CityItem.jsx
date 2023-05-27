import React from "react";
import { convertTimezoneToDateTime, convertKelvinToCelsius } from "../utils";

const CityItem = ({ city, onClick }) => {
  return (
    <li className="city-item" style={{}} onClick={onClick}>
      <div className="container">
        <div className="item">{city.city_name}</div>
        <div
          className="item"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          {" "}
          {convertTimezoneToDateTime(city.city_timeZone)}
        </div>
        <div className="item">
          {convertKelvinToCelsius(city.temp)}
          <span>&#176;</span>
        </div>
      </div>
    </li>
  );
};

export default CityItem;
