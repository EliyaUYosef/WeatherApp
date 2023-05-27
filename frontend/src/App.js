import "./App.css";
import React, { useState } from "react";
import { CityProvider } from "./CityContext";
import SearchInput from "./components/SearchInput";
import CityList from "./components/CityList";
import WeatherData from "./components/WeatherData";
require("./constants");

const App = () => {
  return (
    <div className="main">
      <CityProvider>
        <SearchInput />
        <WeatherData />
        <CityList id="cityList" />
      </CityProvider>
    </div>
  );
};

export default App;
