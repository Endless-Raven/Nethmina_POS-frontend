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
    code: "",
    qty: "",
    warranty_period: "",
    imei_number: "",
    category: "",
    model: "",
    wholesale_price: "",
    retailPrice: "",
    max_discount: ""
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
    // Start loading
    setLoading(true);

    // Trim and validate required fields
    const trimmedName = itemNames.name.trim();
    const trimmedCode = newItem.code.trim();
    
    const trimmedRetailPrice = newItem.retailPrice?.toString().trim();
    const trimmedWarrantyPeriod = newItem.warranty_period.trim();
    const trimmedCategory = newItem.category?.trim();
    const trimmedBrand = newItem.brand?.trim();
    const trimmedModel = newItem.model?.trim();
    const trimmedWholesalePrice = newItem.wholesale_price?.toString().trim();
    const trimmedQty = newItem.qty;
    const trimmedmaxdiscount = newItem.max_discount?.toString().trim();

    if (
      !trimmedName ||
      
      !trimmedRetailPrice ||
      !trimmedWarrantyPeriod ||
      !trimmedCategory ||
      !trimmedBrand ||
      !trimmedModel ||
      !trimmedWholesalePrice ||
      !trimmedCode ||
      !trimmedmaxdiscount
    ) {
      setFooterMessage(
        "All fields are required and cannot be empty or contain only spaces."
      );
      setLoading(false);
      return;
    }

    try {
      const imeiNumbers = Array.isArray(newItem.imei_number)
        ? newItem.imei_number.map((imei) => imei.trim())
        : [newItem.imei_number.trim()];

      const response = await axios.post(`${API_BASE_URL}/product`, {
        product_name: trimmedName,
        product_code: trimmedCode,
        
        product_price: trimmedRetailPrice,
        warranty_period: trimmedWarrantyPeriod,
        imei_numbers: imeiNumbers,
        product_stock: trimmedQty,
        product_type: trimmedCategory,
        brand_name: trimmedBrand,
        product_model: trimmedModel,
        product_wholesale_price: trimmedWholesalePrice,
        max_discount: trimmedmaxdiscount,
        user: 1,
      });

      if (response.status === 200) {
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
      code: "",
      
      warranty_period: "",
      imei_number: "",
      qty: "",
      retailPrice: "",
      wholesale_price: "",
      store: "",
      brand: "",
      model: "",
      category: "",
      max_discount:""
    });
    setItemNames({ name: "" });
    setReset(true);
  };

  return (
    <div>
      <Label htmlFor="name" value="Name" />
      <div className="relative">
        <TextInput
          type="text"
          id="name"
          value={itemNames.name}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
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
      <Label htmlFor="code" value="Code" />
      <TextInput
        type="text"
        id="code"
        value={newItem.code}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            code: e.target.value
              .replace(/^\s+|\s+$/g, "")
              .replace(/\s{2,}/g, " "),
          })
        }
        onKeyDown={handleKeyDown}
        required
      />
      <Label htmlFor="capacity" value="Capacity" />
      
        <TextInput
          type="text"
          id="capacity"
          required  
        />

      <Label htmlFor="colour" value="Colour" />
      
      <TextInput
        type="text"
        id="colour"
        required  
      />

      <Label htmlFor="grade" value="Grade" />
      
      <TextInput
        type="text"
        id="grade"
        required
        
      />

      <Label htmlFor="warranty_period" value="Warranty Period" />
      <TextInput
        id="warranty_period"
        value={newItem.warranty_period}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            warranty_period: e.target.value
              .replace(/[^a-zA-Z0-9\s]/g, "")
              .trim(),
          })
        }
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
          required
        />
        <Model
          value={selectedModel}
          reset={reset}
          onSelectModel={(model) => {
            setSelectedModel(model);
            setNewItem({ ...newItem, model });
          }}
          required
        />
        <Brand
          value={selectedBrand}
          reset={reset}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            setNewItem({ ...newItem, brand });
          }}
          required
        />
      </div>

      <Label htmlFor="retailPrice" value="Retail Price" />
      <TextInput
        type="text"
        id="retailPrice"
        value={newItem.retailPrice}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            retailPrice: e.target.value.replace(/^\s+|\s+$/g, ""),
          })
        }
        required
      />

      <Label htmlFor="wholesale_price" value="Wholesale Price" />
      <TextInput
        type="text"
        id="wholesale_price"
        value={newItem.wholesale_price}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            wholesale_price: e.target.value.replace(/^\s+|\s+$/g, ""),
          })
        }
        required
      />
       <Label htmlFor="max_discount" value="Max Discount" />
      <TextInput
        type="text"
        id="max_discount"
        value={newItem.max_discount}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            max_discount: e.target.value.replace(/^\s+|\s+$/g, ""),
          })
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
