import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import Brand from "../components/Brand";
import Type from "../components/Type";
import Model from "../components/Model";

const API_BASE_URL = process.env.API_BASE_URL;

const Edit_Item_Model = ({ productName }) => {  
  const [loading, setLoading] = useState(false);
  const [itemNames, setItemNames] = useState({ name: "", category: "" });
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

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
       
        const response = await axios.get(`${API_BASE_URL}/product/${productName}`);
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
    setLoading(true);
    try {
      const imeiNumbers = Array.isArray(newItem.imei_number)
        ? newItem.imei_number
        : [newItem.imei_number];

      const response = await axios.put(`${API_BASE_URL}/product/${productName}`, {
        product_name: newItem.name,
        product_price: newItem.retailPrice,
        warranty_period: newItem.warranty_period,
        imei_number: imeiNumbers,
        product_stock: newItem.qty,
        product_type: newItem.category,
        brand_name: newItem.brand,
        product_model: newItem.model,
        product_wholesale_price: newItem.wholesale_price,
      });

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

  return (
    <div>
      <Label htmlFor="name" value="Name" />
      <TextInput
        id="name"
        value={newItem.name}
        onChange={(e) =>
          setNewItem({ ...newItem, name: e.target.value })
        }
        required
      />
      <Label htmlFor="warranty_period" value="Warranty Period" />
      <TextInput
        id="warranty_period"
        value={newItem.warranty_period}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            warranty_period: e.target.value,
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
            imei_number: e.target.value,
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
          onSelectType={(type) => {
            setSelectedType(type);
            setNewItem({ ...newItem, category: type });
          }}
          reset={false} // Optional, depending on your implementation
          type={selectedType}
        />
        <Model
          value={selectedModel}
          onSelectModel={(model) => {
            setSelectedModel(model);
            setNewItem({ ...newItem, model });
          }}
          model={selectedModel}
        />
        <Brand
          value={selectedBrand}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            setNewItem({ ...newItem, brand });
          }}
          brand={selectedBrand}
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
          onClick={updateProduct}  // Update product instead of adding
          outline
          size={"sm"}
          gradientDuoTone="purpleToBlue"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </Button>
        {footerMessage && (
          <p className="text-sm text-red-500">{footerMessage}</p>
        )}
      </Modal.Footer>
    </div>
  );
};

export default Edit_Item_Model;
