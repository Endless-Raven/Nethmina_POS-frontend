import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput } from "flowbite-react";
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
    warranty_period: "",
    imei_number: "",
    category: "",
    model: "",
    wholesale_price: "",
    retailPrice: "",
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
  
    // Check for missing fields
    if (!productName || !productPrice || !warrantyPeriod || !productType || !brandName || !productModel || !wholesalePrice) {
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
      onChange={(e) => setNewItem({ ...newItem, name: e.target.value.trim() })} // Trimmed
      required
    />
    <Label htmlFor="warranty_period" value="Warranty Period" />
    <TextInput
      id="warranty_period"
      value={newItem.warranty_period}
      onChange={(e) =>
        setNewItem({
          ...newItem,
          warranty_period: e.target.value.trim(), // Trimmed
        })
      }
      required
    />
  
    {/* <Label htmlFor="imei_number" value="IMEI Number" />
    <TextInput
      id="imei_number"
      value={newItem.imei_number}
      onChange={(e) =>
        setNewItem({
          ...newItem,
          imei_number: e.target.value.trim(), // Trimmed
        })
      }
      required
    />
    <Label htmlFor="qty" value="Quantity" />
    <TextInput
      type="number"
      id="qty"
      value={newItem.qty}
      onChange={(e) => setNewItem({ ...newItem, qty: e.target.value.trim() })} // Trimmed
      required
    /> */}
  
    <div className="flex flex-col mt-4 mb-4 w-full gap-4">
      <Type
        value={selectedType}
        reset={reset}
        onSelectType={(type) => {
          setSelectedType(type);
          setNewItem({ ...newItem, category: type });
        }}
        type={selectedType}
        required // Optional: if you want to enforce selection
      />
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
  
    <Label htmlFor="retailPrice" value="Retail Price" />
    <TextInput
      type="text"
      id="retailPrice"
      value={newItem.retailPrice}
      onChange={(e) =>
        setNewItem({ ...newItem, retailPrice: e.target.value.trim() }) // Trimmed
      }
      required
    />
    <Label htmlFor="wholesale_price" value="Wholesale Price" />
    <TextInput
      type="text"
      id="wholesale_price"
      value={newItem.wholesale_price}
      onChange={(e) =>
        setNewItem({ ...newItem, wholesale_price: e.target.value.trim() }) // Trimmed
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
