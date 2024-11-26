import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Label, Select, TextInput } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = process.env.API_BASE_URL;

export default function DeleteProductModel({
  showModel,
  shop,
  productID,
  close,
  code,
  qty,
}) {
  const [shopsAndCategories, setShopsAndCategories] = useState({
    shops: [],
    product_types: [],
  });
  console.log(shop);
  const imeiRefs = useRef([]);
  const [samplePending, setSamplePending] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [product_name, setProductName] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      resetForm();
      setReset(false);
    }
  }, [reset]);
  const resetForm = () => {
    setNewItem({
      product_id: 0,
      product_name: "",
      delete_quantity: 1,
      imei_number: [],
      brand: "",
      category: "",
      color: "",
      grade: "",
      capacity: "",
    });
  };

  const deleteProductOrIMEI = async () => {
    try {
      const imeiNumbersString = Array.isArray(newItem.imei_number)
        ? newItem.imei_number.join(",")
        : ""; // Ensure it's an array before joining

      const response = await axios.post(
        `${API_BASE_URL}/stock/delete/productimei`,
        {
          product_id: String(productID), // Ensure product_id is a string
          store_id: shop,
          quantity: String(newItem.delete_quantity), // Ensure quantity is a string
          imei_number: imeiNumbersString || "", // Use empty string if IMEI array is empty
        }
      );

      // Check response status
      if (response.status === 200) {
        console.log("IMEI number(s) deleted successfully");
        alert("Product or IMEI deleted successfully.");
        // Optionally, trigger any post-success actions here, like updating UI
      } else {
        console.error("Failed to delete product or IMEI", response);
        alert("Failed to delete product or IMEI. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response);
        alert(
          "Error from server: " + error.response.data.message ||
            "An error occurred."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server. Please check your network.");
      } else {
        console.error("Error in setup:", error.message);
        alert("An error occurred: " + error.message);
      }
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stock/details/byimie`,
        {
          product_code: code,
        }
      );
      const product = response.data;
      console.log(response.data);
      setNewItem({
        product_id: product.product_id,
        code: product.product_code,
        product_name: product.product_name,
        brand: product.brand_name,
        category: product.product_type,

        delete_quantity:
          product.product_type === "Mobile Phone"
            ? 1
            : qty,

        color: product.color,
        grade: product.grade,
        capacity: product.capacity,
      });

      setSelectedType(product.product_type);
      setSelectedBrand(product.brand_name);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const [toShop, setToShop] = useState("");
  const [newItem, setNewItem] = useState({
    product_id: 0,
    code: "",
    product_name: "",
    delete_quantity: 1,
    imei_number: [],
    brand: "",
    category: "",
    color: "",
    grade: "",
    capacity: "",
  });
  const [items, setItems] = useState([]);

  const handleDeleteItem = () => {
    // Ensure IMEI numbers are properly filled if required
    if (newItem.category === "Mobile Phone") {
      const imeiNumbersFilled =
        Array.isArray(newItem.imei_number) &&
        newItem.imei_number.length === Number(newItem.delete_quantity) &&
        newItem.imei_number.every((imei) => imei.trim() !== "");

      if (!imeiNumbersFilled) {
        console.error("IMEI numbers are missing or incomplete.");
        return; // Stop if IMEI numbers are not fully populated
      }
    }

    setItems([...items, newItem]);

    setNewItem({
      product_id: 0,
      product_name: "",
      delete_quantity: 1,
      imei_number: [],
      color: "",
      grade: "",
      capacity: "",
    });
  };

  console.log(items);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 4000);
    }
  }, [error]);

  return (
    <Modal
      show={showModel}
      onClose={() => {
        close();
      }}
    >
      <Modal.Header>Delete Product</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div>
            <TextInput
              id="productCode"
              type="text"
              placeholder="Enter Product Code"
              value={newItem.code}
              onChange={(e) => {}}
            />

            <Label htmlFor="category">Category</Label>
            <TextInput id="category" value={newItem.category} />
          </div>

          <div>
            <Label htmlFor="brand">Brand</Label>
            <TextInput id="brand" value={newItem.brand} />
          </div>
          <div className="flex items-center gap-6">
            <div>
              <Label htmlFor="brand">grade</Label>
              <TextInput id="brand" value={newItem.grade} />
            </div>
            <div>
              <Label htmlFor="brand">color</Label>
              <TextInput id="brand" value={newItem.color} />
            </div>
            <div>
              <Label htmlFor="brand">capacity</Label>
              <TextInput id="brand" value={newItem.capacity} />
            </div>
          </div>

          <div>
            <Label htmlFor="product">Product</Label>
            <Select
              id="product"
              value={newItem.product_name}
              onChange={(e) => {
                console.log("onChange triggered");
                var name = products.find(
                  (p) => p.product_id == e.target.value
                ).product_name;
                setNewItem({
                  ...newItem,
                  product_name: e.target.value,
                });
              }}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.product_name} value={product.product_name}>
                  {product.product_name}
                </option>
              ))}
            </Select>
          </div>

          {newItem.product_id !== 0 && (
            <div>
              <Label htmlFor="qty">Quantity</Label>
              <TextInput
                id="qty"
                type="number"
                min={1}
                value={newItem.delete_quantity}
                onChange={(e) => {
                  setNewItem({
                    ...newItem,
                    delete_quantity: e.target.value,
                  });
                }}
              />
              {newItem.category === "Mobile Phone" && (
                <div className="mt-4">
                  <Label>IMEI Numbers</Label>
                  {[...Array(Number(newItem.delete_quantity))].map(
                    (_, index) => (
                      // IMEI Number Input Handling
                      <TextInput
                        key={index}
                        type="text"
                        ref={(el) => (imeiRefs.current[index] = el)}
                        placeholder={`IMEI ${index + 1}`}
                        required
                        maxLength={15} // Limit to 15 characters
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length === 15) {
                            // Ensure imei_number is an array before updating it
                            const updatedIMEIs = Array.isArray(
                              newItem.imei_number
                            )
                              ? [...newItem.imei_number]
                              : [];
                            updatedIMEIs[index] = value;
                            setNewItem({
                              ...newItem,
                              imei_number: updatedIMEIs,
                            });
                            if (
                              value.length === 15 &&
                              index < imeiRefs.current.length - 1
                            ) {
                              imeiRefs.current[index + 1].focus();
                            }
                          }
                        }}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="submit"
            onClick={async () => {
              deleteProductOrIMEI();
              setReset(true);
            }}
          >
            Delete
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setReset(true);
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
