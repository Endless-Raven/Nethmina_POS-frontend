import React, { useEffect, useState } from "react";
import { Button, Modal, Label, Select, TextInput } from "flowbite-react";
import PendingRequestList from "../components/admin_inventory/PendingRequestList";
import { ProductTable } from "../components/admin_inventory/ProductTable";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = process.env.API_BASE_URL;

function ShareStockAdminInventory() {
  const userData = useSelector((state) => state.user.data);
  // Backend data
  const [shopsAndCategories, setShopsAndCategories] = useState({
    shops: [],
    product_types: [],
  });
  const [samplePending, setSamplePending] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [code, setbarcode] = useState("");
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
      transfer_quantity: 1,
      imei_number: [],
      brand: "",
      category: "",
    });
  };

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
      // console.log(response.data)
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
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stock/getAllPendingRequests`
      );
      setSamplePending(response.data);
    } catch (error) {
      console.error("Error fetching pending data:", error);
      if (error.response?.data?.message !== "No pending requests found.")
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
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching brands data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
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
        product_name: product.product_name,
        transfer_quantity: 1,
        brand: product.brand_name,
        category: product.product_type,
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

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/product/getFiltered/ProductDetails`,
        {
          brand_name: selectedBrand,
          product_type: selectedType,
          store_id: userData.store_id,
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

  useEffect(() => {
    fetchProduct();
  }, [code]);

  const [modalOpen, setModalOpen] = useState(false);
  const [toShop, setToShop] = useState("");
  const [newItem, setNewItem] = useState({
    product_id: 0,
    product_name: "",
    transfer_quantity: 1,
    imei_number: [],
    brand: "",
    category: "",
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

  // console.log(items);

  const handleTransfer = async () => {
    const req = {
      products: items,
      from: "Tech_Haven",
      to: toShop,
      user: userData.user_id,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stock/transferStock`,
        req
      );
      setMessage("Transfer Send Successfully");
    } catch (error) {
      console.error("Error fetching transfer data:", error);
      setError(error.message);
    } finally {
      setItems([]);
      setLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 4000);
    }
  }, [error]);

  // useEffect(() => {
  //   getModels();
  // }, [selectedType]);

  useEffect(() => {
    if (selectedType && selectedBrand) {
      setProducts([]);
      getProducts();
    }
  }, [selectedType, selectedBrand]);

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
            {shopsAndCategories?.shops
              ?.filter((shop) => shop !== "Tech_Haven")
              .map((shop, index) => (
                <option
                  key={index}
                  value={shop}
                  className={`${shop === "repair" && "bg-red-300"}`}
                >
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
                  <TextInput
                    id="productCode"
                    type="text"
                    placeholder="Enter Product Code"
                    onChange={(e) => setbarcode(e.target.value)}
                  />

                  <Label htmlFor="category">Category</Label>
                  <TextInput id="category" value={newItem.category} />
                </div>
              )}

              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput id="brand" value={newItem.brand} />
              </div>

              <div>
                <Label htmlFor="product">Product</Label>
                <Select
                  id="product"
                  value={newItem.product_id}
                  onChange={(e) => {
                    console.log("onChange triggered");
                    var name = products.find(
                      (p) => p.product_id == e.target.value
                    ).product_name;
                    setNewItem({
                      ...newItem,
                      product_id: e.target.value,
                      product_name: name,
                    });
                  }}
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.product_id} value={product.product_id}>
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
              <Button type="submit" onClick={() => setReset(true)}>
                Add
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setModalOpen(false), setReset(true);
                }}
              >
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
