import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";
import Brand from "../components/Brand";
import Type from "../components/Type";
import Model from "../components/Model";

const API_BASE_URL = process.env.API_BASE_URL;

const Edit_Item_Model = ({ productName }) => {
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemNames, setItemNames] = useState({ name: "", category: "" });
  const [footerMessage, setFooterMessage] = useState("");
  const [deletefooterMessage, setdeleteFooterMessage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    qty: "",
    color: "",
    grade: "",
    capacity: "",
    warranty_period: "",
    imei_number: "",
    category: "",
    model: "",
    wholesale_price: "",
    retailPrice: "",
    max_discount: "",
    low_count: "",
  });

  useEffect(() => {
    if (reset) {
      resetForm();
      setReset(false);
    }
  }, [reset]);
  const resetForm = () => {
    setNewItem({
      name: "",
      brand: "",
      qty: "",
      warranty_period: "",
      imei_number: "",
      category: "",
      model: "",
      wholesale_price: "",
      retailPrice: "",
      max_discount: "",
      low_count: "",
      color: "",
      grade: "",
      capacity: "",
    });
    setItemNames({ name: "" });
    setReset(true);
  };

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/${productName}`
        );
        const product = response.data;
        console.log(response.data);
        setNewItem({
          name: product.product_name,
          brand: product.brand_name,
          qty: product.product_stock,
          color: product.color,
          capacity: product.capacity,
          grade: product.grade,
          low_count: product.low_count,
          max_discount: product.max_discount,
          low_count: product.max_discount,
          warranty_period: product.warranty_period,
          imei_number: product.imei_number,
          category: product.product_type,
          model: product.product_model,
          wholesale_price: product.product_wholesale_price,
          retailPrice: product.product_price,
        });
        setSelectedType(product.product_type);
        setSelectedModel(product.product_model);
        setSelectedBrand(product.brand_name);
        setItemNames({ name: product.product_name });
        console.log(product.brand_name);
        setFooterMessage("");
      } catch (error) {
        console.error("Error fetching product details:", error);
        setFooterMessage("Error fetching product details.");
      }
    };

    fetchProductDetails();
  }, [productName]);

  // Function to handle updating the product
  const updateProduct = async () => {
    // Trimmed values to remove any leading or trailing whitespace
    const productName = newItem.name?.trim();
    const productPrice = newItem.retailPrice?.trim();
    const warrantyPeriod = newItem.warranty_period?.trim();
    const productType = newItem.category?.trim();
    const brandName = newItem.brand?.trim();
    const productModel = newItem.model?.trim();
    const wholesalePrice = newItem.wholesale_price?.trim();
    const max_discount = newItem.max_discount;

    // Check for missing fields
    if (
      !productName ||
      !productPrice ||
      !warrantyPeriod ||
      !productType ||
      !brandName ||
      !productModel ||
      !wholesalePrice ||
      !max_discount
    ) {
      setFooterMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/product/${productName}`,
        {
          product_name: productName,
          product_price: productPrice,
          warranty_period: warrantyPeriod,
          product_type: productType,
          brand_name: brandName,
          product_model: productModel,
          product_wholesale_price: wholesalePrice,
          max_discount: max_discount,
          color: newItem.color,
          grade: newItem.grade,
          capacity: newItem.capacity,
        }
      );

      if (response.status === 200) {
        setFooterMessage("Product updated successfully!");
      } else {
        setFooterMessage("Failed to update the product.");
      }
    } catch (error) {
      setFooterMessage("An error occurred while updating the product.");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/product/${productName}`
      );

      if (response.status === 200) {
        setdeleteFooterMessage("Product deleted successfully!");
        resetForm();
      } else {
        setdeleteFooterMessage("Failed to delete the product.");
      }
    } catch (error) {
      setdeleteFooterMessage("An error occurred while deleting the product.");
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Label htmlFor="name" value="Name" />
      <TextInput
        id="name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} // Allow spaces
        onBlur={(e) => setNewItem({ ...newItem, name: e.target.value.trim() })} // Trim when focus leaves
        required
        className="mb-2"
      />
      <div className="flex gap-4">
        <div className="">
          <Label htmlFor="capacity" value="Capacity" />
          <Select
            type="text"
            id="capacity"
            value={newItem.capacity}
            onChange={
              (e) => setNewItem({ ...newItem, capacity: e.target.value.trim() }) // Trimmed
            }
          >
            {" "}
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
            placeholder="Color"
            value={newItem.color}
            onChange={
              (e) => setNewItem({ ...newItem, color: e.target.value.trim() }) // Trimmed
            }
            id="color"
          />
        </div>
        <div className="">
          <Label htmlFor="grade" value="Grade" />

          <Select
            type="text"
            id="grade"
            value={newItem.grade}
            onChange={
              (e) => setNewItem({ ...newItem, grade: e.target.value.trim() }) // Trimmed
            }
          >
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
            value={newItem.warranty_period}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                warranty_period: e.target.value.trim(), // Trimmed
              })
            }
            required
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
      <div className="flex flex-col mt-4 mb-4 w-full gap-6">
        <div className="flex gap-4">
          <div class="">
          <Label htmlFor="Type" value="Type" />
            <Type
              value={selectedType}
              reset={reset}
              onSelectType={(type) => {
                setSelectedType(type);
                setNewItem({ ...newItem, category: type });
              }}
              type={selectedType}
              required // Optional: if you want to enforce selection
              className="mb-2"
            />
          </div>
          <div class="">
          <Label htmlFor="Model" value="Model" />
            <Model
              value={selectedModel}
              reset={reset}
              onSelectModel={(model) => {
                setSelectedModel(model);
                setNewItem({ ...newItem, model });
              }}
              model={selectedModel}
              required // Optional: if you want to enforce selection
            />
          </div>
          <div class="">
          <Label htmlFor="Brand" value="Brand" />
            <Brand
              value={selectedBrand}
              reset={reset}
              onSelectBrand={(brand) => {
                setSelectedBrand(brand);
                setNewItem({ ...newItem, brand });
              }}
              brand={selectedBrand}
              required // Optional: if you want to enforce selection
            />
          </div>
        </div>
      </div>
      <Label htmlFor="low_count" value="low_count" />
      <TextInput
        type="text"
        id="low_count"
        value={newItem.low_count}
        onChange={
          (e) => setNewItem({ ...newItem, low_count: e.target.value.trim() }) // Trimmed
        }
      />
      <Label htmlFor="retailPrice" value="Retail Price" />
      <TextInput
        type="text"
        id="retailPrice"
        value={newItem.retailPrice}
        onChange={
          (e) => setNewItem({ ...newItem, retailPrice: e.target.value.trim() }) // Trimmed
        }
        required
        className="mb-2"
      />
      <Label htmlFor="wholesale_price" value="Wholesale Price" />
      <TextInput
        type="text"
        id="wholesale_price"
        value={newItem.wholesale_price}
        onChange={
          (e) =>
            setNewItem({ ...newItem, wholesale_price: e.target.value.trim() }) // Trimmed
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
            max_discount: e.target.value.trim(),
          })
        }
        required
      />

      <Modal.Footer>
        <Button
          onClick={updateProduct} // Update product instead of adding
          outline
          size={"sm"}
          gradientDuoTone="purpleToBlue"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </Button>
        <Button
          onClick={deleteProduct} // Delete product
          outline
          size={"sm"}
          gradientDuoTone="pinkToOrange"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Product"}
        </Button>
        {footerMessage && (
          <p className="text-sm text-green-500">{footerMessage}</p>
        )}
        {deletefooterMessage && (
          <p className="text-sm text-red-500">{deletefooterMessage}</p>
        )}
      </Modal.Footer>
    </div>
  );
};

export default Edit_Item_Model;
