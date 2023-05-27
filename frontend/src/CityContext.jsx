import React, { createContext, useState } from "react";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [clickedCityId, setClickedCityId] = useState(null);

  return (
    <CityContext.Provider
      value={{
        // cities,
        setCities,
        cities,
        setCities,
        clickedCityId,
        setClickedCityId,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
