import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import Brand from "../components/Brand";
import Type from "../components/Type";
import Model from "../components/Model";

const API_BASE_URL = process.env.API_BASE_URL;

function Product() {
  const [itemNames, setItemNames] = useState({ name: "", category: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [stores, setStores] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
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

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedcategory, setSelectedcategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setprodcuts] = useState([]);
  useEffect(() => {
    fetchStores();
    fetchCategories();
    fetchBrands();
    fetchProductData();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [searchTerm, selectedStore, selectedBrand, selectedcategory]);


  useEffect(() => {
    fetchBrands();
    fetchproductdata();
  }, [selectedcategory]);

  useEffect(() => {
    fetchproductdata();
  }, [selectedBrand]);

  useEffect(() => {
    fetchproductdata();
  }, [searchTerm]);

  useEffect(() => {
    fetchproductdata();
  }, [selectedStore]);

  async function fetchproductdata() {
    try {
      let product_name;
      let store_name;
      let brand_name;
      let product_type;

      const response = await axios.post(
        `${API_BASE_URL}/product/getFiltered/ProductDetails`,
        {
          product_name: searchTerm,
          store_name: selectedStore,
          brand_name: selectedBrand,
          product_type: selectedcategory,
        }
      );
      console.log(response);
      console.log("ss", product_name, store_name, brand_name, product_type);
      setprodcuts(response.data);
    } catch (error) {
      console.error(error);
    }
  }



  // Fetch suggestions for products
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

  // Handle input changes and fetch suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setItemNames({ ...itemNames, name: value });
    await fetchSuggestions(value);
    setActiveIndex(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setItemNames({ ...itemNames, name: suggestion });
    setShowSuggestions(false);
  };

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e) => {
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
      setShowSuggestions(false);
    }
  };

  // Fetch store names
  const fetchStores = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/getstore/names`);
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductTypes/get`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch brands based on selected category
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/brands/byproducttype`,
        {
          params: { product_type: selectedcategory },
        }
      );
      console.log("response",response.data)
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Fetch filtered product data
  const fetchProductData = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/product/getFiltered/ProductDetails`,
        {
          product_name: searchTerm,
          store_name: selectedStore,
          brand_name: selectedBrand,
          product_type: selectedcategory,
        }
      );
      setprodcuts(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Add new product
  const fetchAddNewItems = async () => {
    try {
      setLoading(true);
      const imeiNumbers = Array.isArray(newItem.imei_number)
        ? newItem.imei_number
        : [newItem.imei_number];

      const response = await axios.post(`${API_BASE_URL}/product`, {
        product_name: itemNames.name,
        product_price: newItem.retailPrice,
        warranty_period: newItem.warranty_period,
        imei_numbers: imeiNumbers,
        product_stock: newItem.qty,
        product_type: newItem.category,
        brand_name: newItem.brand,
        product_model: newItem.model,
        product_wholesale_price: newItem.wholesale_price,
        user: 1,
      });

      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStore === "All" || item.store === selectedStore) &&
      (selectedBrand === "All" || item.brand === selectedBrand)
  );

  const handleRowClick = (productId) => {
    console.log("Product ID:", productId);
    // Add your processing logic here
  };

  const handleEditItem = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // const handleAddItem = () => {
  //   if (editIndex !== null) {
  //     const updatedItems = [...items];
  //     updatedItems[editIndex] = { ...newItem, no: editIndex + 1 };
  //     setItems(updatedItems);
  //     setEditIndex(null);
  //   } else {
  //     setItems([...items, { ...newItem, no: items.length + 1 }]);
  //   }

  //   setShowModal(false);
  //   setNewItem({
  //     name: "",
  //     brand: "",
  //     qty: "",
  //     category: "",
  //     wholesalePrice: "",
  //     retailPrice: "",
  //     store: "",
  //   });
  // };

  return (
    <div>
      Product
      <div className="flex justify-between items-center mb-4 gap-3">
        <div className="flex justify-between items-center w-1/3 mb-4 gap-3">
          <div className="relative w-4/5 mx-auto">
            <div className="relative">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Search Item by Name or Brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 p-2 border rounded-lg border-gray-300 w-full"
              />
            </div>
            <br></br>
            <div class="relative flex flex-col w-full gap-4  ">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="p-2 border rounded-lg bg-white"
              >
                <option value="All">All Stores</option>
                {stores.map((store) => (
                  <option key={store} value={store}>
                    {store}
                  </option>
                ))}
              </select>
              <select
                value={selectedcategory}
                onChange={async (e) => setSelectedcategory(e.target.value)}
                className="p-2 border rounded-lg bg-white"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="p-2 border rounded-lg bg-white"
              >
                <option value="All">All Brands</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <table className="bg-slate-50">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Brand</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Qty</th>
                <th className="border border-gray-300 p-2">Wholesale Price</th>
                <th className="border border-gray-300 p-2">Retail Price</th>
                <th className="border border-gray-300 p-2">Store</th>
              </tr>
            </thead>
            <tbody>
              {products.length < 1 ? (
                <tr>
                  <td colSpan="8">
                    <center>No products</center>
                  </td>
                </tr>
              ) : (
                products.slice(0, 10).map((item, index) => (
                  <tr
                    key={item.no}
                    className={
                      item.stock_quantity < 20 ? "bg-red-200" : "bg-green-200"
                    }
                    onClick={() => handleRowClick(item.product_id)} // Add the onClick handler
                  >
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {item.product_name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.brand_name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.product_type}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.stock_quantity}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.product_wholesale_price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.product_price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.store_name}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Button
            className="mt-3 p-1 mb-3"
            onClick={() => setShowModal(true)}
            size="sm"
            gradientDuoTone="purpleToBlue"
          >
            Add Item
          </Button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          {editIndex !== null ? "Edit Item" : "Add Item"}
        </Modal.Header>
        <Modal.Body>
          <div>
            <Label htmlFor="name" value="Name" />
            <div className="relative">
              <input
                type="text"
                id="name"
                value={itemNames.name}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                required
                className="border p-2 w-full rounded-md"
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
            <Label htmlFor="waranty_period" value="Warranty Period" />
            <TextInput
              id="waranty_period"
              value={newItem.waranty_period}
              onChange={(e) =>
                setNewItem({ ...newItem, waranty_period: e.target.value })
              }
              required
            />
            <Label htmlFor="imei_number" value="IMEI Number" />
            <TextInput
              id="imei_number"
              value={newItem.imei_number}
              onChange={(e) =>
                setNewItem({ ...newItem, imei_number: e.target.value })
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
            <div class="flex flex-col mt-4 mb-4 w-full gap-4">
              <Type
                onSelectType={(type) =>
                  setNewItem({ ...newItem, category: type })
                }
              />
              <Model
                onSelectModel={(model) =>
                  setNewItem({ ...newItem, model: model })
                }
              />
              <Brand
                onSelectBrand={(brand) =>
                  setNewItem({ ...newItem, brand: brand })
                }
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
            <Label htmlFor="store" value="Store" />
            <select
              id="store"
              value={newItem.store}
              onChange={(e) =>
                setNewItem({ ...newItem, store: e.target.value })
              }
              className="mt-4 border border-gray-300 bg-gray-100 rounded-lg p-2"
            >
              {stores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
        {footerMessage && <p className="text-sm text-red-500">{footerMessage}</p>}
        <Button
          onClick={fetchAddNewItems}
          outline
          size={"sm"}
          gradientDuoTone="purpleToBlue"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Adding..." : editIndex !== null ? "Update Item" : "Add Item"}
        </Button>
          <Button
            onClick={() => setShowModal(false)}
            outline
            size="sm"
            gradientDuoTone="pinkToOrange"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Product;
