import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.API_BASE_URL;

const UpdateItemModel = ({ stockqty, productName, showModel, close }) => {
  const [loading, setLoading] = useState(false);
  const [itemNames, setItemNames] = useState({ name: "", category: "" });
  const [footerMessage, setFooterMessage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const navigate = useNavigate();
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
    newqty: "",
  });

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/${productName}`
        );
        const product = response.data;
        // console.log(productName);
        setNewItem({
          name: product.product_name,
          brand: product.brand_name,
          qty: stockqty,
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
        // console.log(product.brand_name);
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
      console.log(newItem.newqty);

      const imeiNumbers = Array.isArray(newItem.imei_number)
        ? newItem.imei_number
        : [newItem.imei_number];
      const response = await axios.put(
        `${API_BASE_URL}/product/updateStockAndIMEI/${productName}`,
        {
          imei_number: imeiNumbers,
          product_stock: newItem.newqty,
          user: 1,
        }
      );

      if (response.status === 200) {
        setFooterMessage("Stock Add successfully!");
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
    <Modal
    show={showModel}
    onClose={() => {
      close, navigate(0);
    }}
  >
    <Modal.Header>
      {/* {editIndex !== null ? "Edit Item" : "Add Stock"} */}
    </Modal.Header>
    <Modal.Body>
      <div className="flex flex-col gap-6">
        <Label htmlFor="name" value={`Name: ${newItem.name}`} />
        <Label htmlFor="qty" value={`Current Quantity: ${newItem.qty}`} />
  
        <Label htmlFor="new_qty" value="New Quantity" />
        <TextInput
          type="text"
          id="new_qty"
          onChange={(e) => setNewItem({ ...newItem, newqty: e.target.value.trim() })} // Trimmed
          required
        />
  
        <Label htmlFor="imei_number" value="IMEI Number" />
        <TextInput
          id="imei_number"
          onChange={(e) =>
            setNewItem({
              ...newItem,
              imei_number: e.target.value.trim(), // Trimmed
            })
          }
          required
        />
      </div>
  
      <Modal.Footer>
        <Button
          onClick={updateProduct} // Update product instead of adding
          outline
          size={"sm"}
          gradientDuoTone="purpleToBlue"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Stock"}
        </Button>
        {footerMessage && (
          <p className="text-sm text-green-500">{footerMessage}</p>
        )}
      </Modal.Footer>
    </Modal.Body>
  </Modal>
  
  
  );
};

export default UpdateItemModel;
