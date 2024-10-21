import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import Brand from "../components/Brand";
import Type from "../components/Type";
import Model from "../components/Model";

const API_BASE_URL = process.env.API_BASE_URL;

const Add_item_Model = () => {
  const [reset, setReset] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [itemNames, setItemNames] = useState({ name: "", category: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [footerMessage, setFooterMessage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    qty: "",
    warranty_period: "",
    imei_number: "",
    category: "",
    model: "",
    wholesale_price: "",
    retailPrice: "",
  });

  useEffect(() => {
    if (selectedBrand) {
      fetchModelsByBrand(selectedBrand);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (reset) {
      resetForm();
      setReset(false);
    }
  }, [reset]);

  const fetchAddNewItems = async () => {
    setLoading(true);
    try {
      const imeiNumbers = Array.isArray(newItem.imei_number)
        ? newItem.imei_number
        : [newItem.imei_number];

      const response = await axios.post(`${API_BASE_URL}/product`, {
        product_name: itemNames.name,
        product_price: newItem.retailPrice,
        warranty_period: newItem.warranty_period,
        imei_numbers: imeiNumbers,
        product_stock: newItem.qty,
        product_type: newItem.category,
        brand_name: newItem.brand,
        product_model: newItem.model,
        product_wholesale_price: newItem.wholesale_price,
        user: 1,
      });

      if (response.statusText === "OK") {
        setFooterMessage("Item added successfully!");
        resetForm();
      } else {
        setFooterMessage("Failed to add the item.");
      }
    } catch (error) {
      setFooterMessage("An error occurred while adding the item.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (
      e.key === "Enter" &&
      activeIndex >= 0 &&
      activeIndex < suggestions.length
    ) {
      handleSuggestionClick(suggestions[activeIndex]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setItemNames({ ...itemNames, name: suggestion });
    setShowSuggestions(false);
  };

  const fetchSuggestions = async (query) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/searchProductsBy/Name`,
          {
            params: { searchText: query },
          }
        );
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setItemNames({ ...itemNames, name: value });
    await fetchSuggestions(value);
    setActiveIndex(-1);
  };

  const fetchModelsByBrand = async (brand) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/models/byBrand`, {
        params: { brand_name: brand },
      });
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const resetForm = () => {
    setNewItem({
      warranty_period: "",
      imei_number: "",
      qty: "",
      retailPrice: "",
      wholesale_price: "",
      store: "",
      brand: "",
      model: "",
      category: "",
    });
    setItemNames({ name: "" });
    setReset(true);
  };

  return (
    <div>
      <Label htmlFor="name" value="Name" />
      <div className="relative">
        <input
          type="text"
          id="name"
          value={itemNames.name}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
          className="border p-2 w-full rounded-md"
          placeholder="Search products..."
        />
        {itemNames.name !== "" && showSuggestions && suggestions.length > 0 && (
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
      <Label htmlFor="warranty_period" value="Warranty Period" />
      <TextInput
        id="warranty_period"
        value={newItem.warranty_period}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            warranty_period: e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""),
          })
        }
        required
      />
      <Label htmlFor="imei_number" value="IMEI Number" />
      <TextInput
        id="imei_number"
        value={newItem.imei_number}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            imei_number: e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""),
          })
        }
        required
      />
      <Label htmlFor="qty" value="Quantity" />
      <TextInput
        type="number"
        id="qty"
        value={newItem.qty}
        onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
        required
      />
      <div className="flex flex-col mt-4 mb-4 w-full gap-4">
        <Type
          value={selectedType}
          reset={reset}
          onSelectType={(type) => {
            setSelectedType(type);
            setNewItem({ ...newItem, category: type });
          }}
        />
        <Model
          value={selectedModel}
          reset={reset}
          onSelectModel={(model) => {
            setSelectedModel(model);
            setNewItem({ ...newItem, model });
          }}
        />
        <Brand
          value={selectedBrand}
          reset={reset}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            setNewItem({ ...newItem, brand });
          }}
        />
      </div>
      <Label htmlFor="retailPrice" value="Retail Price" />
      <TextInput
        type="number"
        id="retailPrice"
        value={newItem.retailPrice}
        onChange={(e) =>
          setNewItem({ ...newItem, retailPrice: e.target.value })
        }
        required
      />
      <Label htmlFor="wholesale_price" value="Wholesale Price" />
      <TextInput
        type="number"
        id="wholesale_price"
        value={newItem.wholesale_price}
        onChange={(e) =>
          setNewItem({ ...newItem, wholesale_price: e.target.value })
        }
        required
      />
      <Modal.Footer>
        <Button
          onClick={fetchAddNewItems}
          outline
          size={"sm"}
          gradientDuoTone="purpleToBlue"
          disabled={loading}
        >
          {loading
            ? "Adding..."
            : editIndex !== null
            ? "Update Item"
            : "Add Item"}
        </Button>
        <Button
          onClick={resetForm}
          outline
          size="sm"
          gradientDuoTone="pinkToOrange"
        >
          Cancel
        </Button>
        {footerMessage && (
          <p className="text-sm text-red-500">{footerMessage}</p>
        )}
      </Modal.Footer>
    </div>
  );
};

export default Add_item_Model;
