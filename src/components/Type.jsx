import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

const API_BASE_URL = process.env.API_BASE_URL;

export default function Type({ onSelectType }) {
  const [itemNames, setItemNames] = useState({ Type: "" });
  const [suggestionscategory, setSuggestionscategory] = useState([]);
  const [showSuggestionscategory, setShowSuggestionscategory] = useState(false);
  const [activeIndexcategory, setActiveIndexcategory] = useState(-1); // To track the active suggestion
 
  const fetchSuggestionscategory = async (query) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/searchProductsBy/Type`,
          {
            params: { searchText: query },
          }
        );
        setSuggestionscategory(response.data);
        setShowSuggestionscategory(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    } else {
      setSuggestionscategory([]);
      setShowSuggestionscategory(false);
    }
  };

  // Handle input change
  const handleInputChangecategory = async (e) => {
    const value = e.target.value;
    setItemNames({ ...itemNames, Type: value });
    await fetchSuggestionscategory(value); // Fetch suggestions when the user types
    setActiveIndexcategory(-1); // Reset the active suggestion index
    onSelectType(value);
};

  // Handle suggestion click
  const handleSuggestionClickcategory = (suggestion) => {
    setItemNames({ ...itemNames, Type: suggestion }); // Use setItemNames instead of setNewItem
    setShowSuggestionscategory(false); // Hide suggestions after selecting
    onSelectType(suggestion);
  };

  const handleKeyDown = (e) => {
    try {
      if (e.key === "ArrowDown") {
        setActiveIndexcategory((prevIndex) =>
          Math.min(prevIndex + 1, suggestionscategory.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndexcategory((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter") {
        if (activeIndexcategory >= 0 && activeIndexcategory < suggestionscategory.length) {
            handleSuggestionClickcategory(suggestionscategory[activeIndexcategory]);
        }
        setShowSuggestions(false); // Hide suggestions after selection
      }
    } catch (err) {
      console.error("Error handling key down event", err);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="category"
        value={itemNames.Type} // Bind to the category property in newItem
        onChange={handleInputChangecategory}
        onKeyDown={handleKeyDown}
        required
        className="border p-2 w-full rounded-md"
        placeholder="Search categories..."
      />
      {itemNames.Type !== "" &&
        showSuggestionscategory &&
        suggestionscategory.length > 0 && (
          <ul className="absolute rounded-md z-20 bg-white w-full border">
            {suggestionscategory.map((suggestion, index) => (
              <li
                key={index}
                className={`p-2 text-sm ${
                  index === activeIndexcategory ? "bg-gray-300" : "bg-gray-100"
                } hover:bg-gray-200 cursor-pointer border-b-2 border-gray-400`}
                onClick={() => handleSuggestionClickcategory(suggestion)}
                
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
