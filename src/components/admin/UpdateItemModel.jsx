import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.API_BASE_URL;

const UpdateItemModel = ({ stockqty, productName,product_id, showModel, close }) => {
  const imeiRefs = useRef([]);
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
    imei_number: [],
    category: "",
    model: "",
    wholesale_price: "",
    retailPrice: "",
    newqty: "",
    newimeinumber: [],
  });

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/${product_id}`
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
  }, [product_id]);

  // Function to handle updating the product
  const updateProduct = async () => {
    setLoading(true);
    try {
      console.log(newItem.newqty);

      // Check if the category is 'Mobile Phone'
      if (newItem.category === "Mobile Phone") {
        const imeiNumbers = Array.isArray(newItem.newimeinumber)
          ? newItem.newimeinumber
          : [newItem.newimeinumber];
        console.log(imeiNumbers.length);
        // Check if the quantity matches the count of IMEI numbers
        if (imeiNumbers.length !== Number(newItem.newqty)) {
          setFooterMessage(
            "Quantity must match the number of IMEI numbers for Mobile Phones."
          );
          return; // Exit early if they don't match
        }
      }

      // Prepare IMEI numbers for the request
      const imeiNumbers = Array.isArray(newItem.newimeinumber)
        ? newItem.newimeinumber
        : [newItem.newimeinumber];

      const response = await axios.put(
        `${API_BASE_URL}/product/updateStockAndIMEI/${product_id}`,
        {
          category: newItem.category,
          imei_number: imeiNumbers,
          product_stock: newItem.newqty,
          user: 1,
        }
      );

      if (response.status === 200) {
        setFooterMessage("");
        navigate(0);
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
      onClose={close}
    >
      <Modal.Header>Add Stock</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" value={`Name: ${newItem.name}`} />
          <Label htmlFor="qty" value={`Current Quantity: ${newItem.qty}`} />
          <div className="space-y-2">
            <Label htmlFor="new_qty" value="New Quantity" />
            <TextInput
              type="text"
              id="new_qty"
              onChange={(e) =>
              {
                setNewItem({ ...newItem, newqty: e.target.value.trim(),newimeinumber:[] })
              } // Trimmed
            }
            required
            />
          </div>
          <div className="space-y-2">
           {newItem.category==="Mobile Phone" &&
            <Label>IMEI Numbers</Label>}
            {newItem.category==="Mobile Phone" && newItem?.newqty &&
              Array.from({ length: Number(newItem.newqty) }).map((_, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (imeiRefs.current[index] = el)}
                  type="text"
                  placeholder={`IMEI ${index + 1}`}
                  required
                  maxLength={15}
                  onChange={(e) => {
                    const updatedIMEIs = [...(newItem.newimeinumber || [])];
                    updatedIMEIs[index] = e.target.value;

                    setNewItem({
                      ...newItem,
                      newimeinumber: updatedIMEIs,
                    });

                    if (
                      e.target.value.length === 15 &&
                      index < imeiRefs.current.length - 1
                    ) {
                      imeiRefs.current[index + 1].focus();
                    }
                  }}
                />
              ))}
          </div>
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
