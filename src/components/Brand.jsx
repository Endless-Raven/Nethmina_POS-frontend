import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

const API_BASE_URL = process.env.API_BASE_URL;

export default function Brand({onSelectBrand}) {
  const [itemNames, setItemNames] = useState({ Brand: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // To track the active suggestion

  // Fetch suggestions based on the category passed as query prop
  const fetchSuggestions = async (queryValue) => {
    if (queryValue.length > 0) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/searchProductsBy/Brand`,
          {
            params: { searchText: queryValue }, // Change query to searchText
          }
        );
        setSuggestions(response.data);
        console.log(queryValue);
        setShowSuggestions(true); // Show the suggestions only if there is data
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  

  const handleKeyDown = (e) => {
    try {
      if (e.key === "ArrowDown") {
        setActiveIndex((prevIndex) =>
          Math.min(prevIndex + 1, suggestions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter") {
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSuggestionClick(suggestions[activeIndex]);
        }
        setShowSuggestions(false); // Hide suggestions after selection
      }
    } catch (err) {
      console.error("Error handling key down event", err);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setItemNames({ ...itemNames, Brand: value }); // Update the input value
    await fetchSuggestions(itemNames.Brand); // Fetch suggestions based on input value
    setActiveIndex(-1); // Reset the active suggestion index
    onSelectBrand(value);
  };
//in hear devlop back end new rout for get name
  const handleSuggestionClick = (suggestion) => {
    setItemNames({ ...itemNames, Brand: suggestion }); // Set the selected suggestion to input value
    setShowSuggestions(false); // Hide the suggestions after selection
    onSelectBrand(suggestion);
  };

  // useEffect(() => {
  //   if (query) {
  //     fetchSuggestions(query); // Fetch suggestions based on the passed query
  //   }
  // }, [query]);

  return (
    <div className="relative"> {/* Add relative positioning to the parent */}
      <input
        type="text"
        id="brand"
        value={itemNames.Brand}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        required
        className="border p-2 w-full rounded-md"
        placeholder="Search Brand..."
      />
      {itemNames.Brand !== "" &&
      showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 rounded-md z-20 bg-white w-full border">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 text-sm ${
                index === activeIndex ? "bg-gray-300" : "bg-gray-100"
              } hover:bg-gray-200 cursor-pointer border-b-2 border-gray-400`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
