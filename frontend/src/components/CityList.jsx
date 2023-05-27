import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "../CityContext";
import CityItem from "./CityItem";

const CityList = () => {
  const { setClickedCityId } = useContext(CityContext);
  const { cities, setCities } = useContext(CityContext);
  const [searchQuery] = useState("");
  const [limit] = useState(17);
  const [orderBy] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/cities/?search=${searchQuery}&limit=${limit}&orderBy=${orderBy}`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery, limit, orderBy, setCities]);
  let index = 0;
  return (
    <div className="city-list">
      <div className="list-control"></div>
      <ul>
        {cities &&
          cities.map((city) => (
            <CityItem
              key={city._id}
              city={city}
              index={index++}
              onClick={(e) => setClickedCityId(city._id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default CityList;
