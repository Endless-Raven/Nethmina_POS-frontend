import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";
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
    qty: 0,
    warranty_period: "No Warranty",
    imei_number: "",
    category: "",
    model: "",
    wholesale_price: "",
    retailPrice: "",
    max_discount: "0",
    low_count: 10,
    capacity: "",
    color: "other",
    grade: "",
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
        low_count: newItem.low_count,
        capacity: newItem.capacity,
        color: newItem.color,
        grade: newItem.grade,
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
      qty: 0,
      retailPrice: "",
      wholesale_price: "",
      store: "",
      brand: "",
      model: "",
      category: "",
      max_discount: "",
      low_count: 10,
      capacity: "",
      color: "other",
      grade: "",
    });
    setItemNames({ name: "" });
    setReset(true);
  };
  return (
    <div className="space-y-6">
      <div className="w-full flex gap-4">
        <div className="w-3/4">
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
            {itemNames.name !== "" &&
              showSuggestions &&
              suggestions.length > 0 && (
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
        </div>
        <div className="w-1/4">
          <Label htmlFor="code" value="Code" />
          <TextInput
            type="text"
            id="code"
            placeholder="001-XYZ"
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
        </div>
      </div>
      <div className="flex gap-4">
        <div className="">
          <Label htmlFor="capacity" value="Capacity" />
          <Select
            id="capacity"
            value={newItem.capacity}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                capacity: e.target.value,
              })
            }
          >
            <option value="">Select</option>
            <option value="64 GB">64 GB</option>
            <option value="128 GB">128 GB</option>
            <option value="256 GB">256 GB</option>
            <option value="512 GB">512 GB</option>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="colour" value="Colour" />
          <TextInput
            type="text"
            id="colour"
            placeholder="Black"
            value={newItem.color}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                color: e.target.value,
              })
            }
          />
        </div>
        <div className="">
          <Label htmlFor="grade" value="Grade" />
          <Select
            id="grade"
            required
            value={newItem.grade}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                grade: e.target.value,
              })
            }
          >
            <option value="">select</option>
            <option value="P1+">P1+</option>
            <option value="P2+">P2+</option>
            <option value="P3+">P3+</option>
            <option value="P4+">P4+</option>
          </Select>
        </div>
        <div className="">
          <Label htmlFor="warranty_period" value="Warranty Period" />
          <Select
            id="warranty_period"
            required
            value={newItem.warranty_period}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                warranty_period: e.target.value,
              })
            }
          >
            <option value="No Warranty">No Warrenty</option>
            <option value="1 Week">1 Week</option>
            <option value="2 Week">2 Week</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Month">2 Month</option>
            <option value="3 Month">3 Month</option>
            <option value="6 Month">6 Month</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Year">2 Year</option>
          </Select>
        </div>
      </div>

      <div className="flex gap-4 py-2 justify-between">
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
      <div className="flex gap-4">
        <div className="flex-1">
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
        </div>
        <div className="flex-1">
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
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
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
        </div>
        <div className="flex-1">
          <Label htmlFor="low_count" value="Low Alert Count" />
          <TextInput
            type="number"
            id="low_count"
            value={newItem.low_count}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                low_count: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
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
