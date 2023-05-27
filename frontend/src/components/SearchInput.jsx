import React, { useState, useContext } from "react";
import { CityContext } from "../CityContext";

const SearchInput = () => {
  const { setCities } = useContext(CityContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cities/?search=${searchQuery}`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
