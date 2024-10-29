import React, { useEffect, useState } from "react";
import { Button, Modal, Label, Select, TextInput } from "flowbite-react";
import PendingRequestList from "../components/admin_inventory/PendingRequestList";
import { ProductTable } from "../components/admin_inventory/ProductTable";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

function ShareStockAdminInventory() {
  // Backend data
  const [shopsAndCategories, setShopsAndCategories] = useState({
    shops: [],
    product_types: [],
  });
  const [samplePending, setSamplePending] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [product_name, setProductName] = useState("");

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductTypes/get`
      );
      setShopsAndCategories((prev) => ({
        ...prev,
        product_types: response.data,
      }));
    } catch (error) {
      console.error("Error fetching Categories:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getShops = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/getstore/names`);
      setShopsAndCategories((prev) => ({ ...prev, shops: response.data }));
    } catch (error) {
      console.error("Error fetching Shops:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPending = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stock/getAllPendingRequests`
      );
      setSamplePending(response.data);
    } catch (error) {
      console.error("Error fetching pending data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getModels = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/brands/byproducttype?product_type=${type}`
      );
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async (type, brand) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/product/getFiltered/ProductDetails`,
        {
          brand_name: brand,
          product_type: type,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getShops();
    getPending();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [toShop, setToShop] = useState("");
  const [newItem, setNewItem] = useState({
    product_id: 0,
    product_name: "",
    transfer_quantity: 1,
    imei_number: [],
  });
  const [items, setItems] = useState([]);

  const openModal = () => setModalOpen(true);

  const handleAddItem = () => {
    if (!newItem.product_id) {
      alert("Please add a product");
      return;
    }

    if (newItem.category === "mobile phone") {
      const imeiNumbersFilled =
        newItem.imei_number.length === Number(newItem.transfer_quantity) &&
        newItem.imei_number.every((imei) => imei.trim() !== "");

      if (!imeiNumbersFilled) {
        alert("Please enter all required IMEI numbers.");
        return;
      }
    }

    setItems([...items, newItem]);
    setModalOpen(false);

    setNewItem({
      product_id: 0,
      product_name: "",
      transfer_quantity: 1,
      imei_number: [],
    });
  };

  const handleTransfer = async () => {
    const req = {
      products: items,
      from: "Tech_Haven",
      to: toShop,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stock/transferStock`,
        req
      );
      setMessage("Transfer Send Successfully");
      setItems([]);
    } catch (error) {
      console.error("Error fetching transfer data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <div className="share-stock-container p-5 min-h-screen max-w-5xl mx-auto">
      {samplePending.length > 0 && <PendingRequestList data={samplePending} />}
      <div className=" flex gap-8 items-end my-8">
        <div className="">
          <Label htmlFor="fromShop">From:</Label>
          <TextInput id="fromShop" value={"Admin"} readOnly />
        </div>
        <div className="">
          <Label htmlFor="Shops">To:</Label>
          <Select
            id="Shops"
            required
            value={toShop}
            onChange={(e) => setToShop(e.target.value)}
          >
            <option value="">Select Shop</option>
            {shopsAndCategories?.shops?.map((shop, index) => (
              <option key={index} value={shop}>
                {shop}
              </option>
            ))}
          </Select>
        </div>
        {toShop && (
          <Button gradientDuoTone="greenToBlue" onClick={openModal}>
            Add Item
          </Button>
        )}
        {items.length > 0 && (
          <Button gradientDuoTone="greenToBlue" onClick={handleTransfer}>
            Transfer
          </Button>
        )}
      </div>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Add Item</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddItem}>
            <div className="flex flex-col gap-4">
              {toShop && (
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={newItem.category}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      getModels(e.target.value);
                    }}
                  >
                    <option value="">Select Category</option>
                    {shopsAndCategories.product_types.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {selectedType && (
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select
                    id="brand"
                    value={newItem.brand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      getProducts(selectedType, e.target.value);
                    }}
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {selectedBrand && (
                <div>
                  <Label htmlFor="product">Product</Label>
                  <Select
                    id="product"
                    value={newItem.product_id}
                    onChange={(e) => {
                      setNewItem({
                        ...newItem,
                        product_id: e.target.value,
                      });
                    }}
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option
                        key={product.product_id}
                        value={product.product_id}
                      >
                        {product.product_name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
              {newItem.product_id !== 0 && (
                <div>
                  <Label htmlFor="qty">Quantity</Label>
                  <TextInput
                    id="qty"
                    type="number"
                    min={1}
                    value={newItem.transfer_quantity}
                    onChange={(e) => {
                      setNewItem({
                        ...newItem,
                        transfer_quantity: e.target.value,
                      });
                    }}
                  />

                  {selectedType === "Mobile Phone" && (
                    <div className="mt-4">
                      <Label>IMEI Numbers</Label>
                      {[...Array(Number(newItem.transfer_quantity))].map(
                        (_, index) => (
                          <TextInput
                            key={index}
                            type="text"
                            placeholder={`IMEI ${index + 1}`}
                            required
                            onChange={(e) => {
                              const updatedIMEIs = [...newItem.imei_number];
                              updatedIMEIs[index] = e.target.value;
                              setNewItem({
                                ...newItem,
                                imei_number: updatedIMEIs,
                              });
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
              <Button type="submit">Add</Button>
              <Button color="gray" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {items.length > 0 && <ProductTable items={items} />}

      {message && (
        <div className="fixed right-8 bottom-8 text-xl font-semibold text-green-500">
          {message}
        </div>
      )}
      {error && (
        <div className="fixed right-8 bottom-8 font-semibold text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}

export default ShareStockAdminInventory;
