import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import Add_item_Model from "../components/Add_item_Model";
import Edit_Item_Model from "../components/Edit_Item_Model";

const API_BASE_URL = process.env.API_BASE_URL;

function Product() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProductName,setselectedProductName] = useState("");

  useEffect(() => {
    fetchStores();
    fetchCategories();
    fetchBrands();
    fetchProductData();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [searchTerm, selectedStore, selectedBrand, selectedCategory]);

  useEffect(() => {
    fetchBrands();
  }, [selectedCategory]);

  useEffect(() => {
    fetchProductData();
  }, [selectedBrand]);

  useEffect(() => {
    fetchProductData();
  }, [searchTerm]);

  useEffect(() => {
    fetchProductData();
  }, [selectedStore]);

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
          params: { product_type: selectedCategory },
        }
      );
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
          product_type: selectedCategory,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-3">
        <div className="flex justify-between items-center w-1/3 mb-4 gap-3">
          <div className="relative w-4/5 mx-auto">
            <div className="relative">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Search Item by Name"
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 p-2 border rounded-lg border-gray-300 w-full"
              />
            </div>
            <br />
            <div className="relative flex flex-col w-full gap-4">
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
          <table className="bg-slate-50 m-16">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Brand</th>
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Warranty</th>
                <th className="border border-gray-300 p-2">  </th>
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
                products.slice(0, 6).map((item, index) => (
                  <tr
                    key={item.no}
                    className={
                       "bg-green-200"
                    }
                    onClick={() => console.log("Product ID:", item.product_id)} // Add your processing logic here
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
                      {item.product_price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.warranty_period}
                    </td>
                     <td
                      className="border border-gray-300 p-2"
                      
                    >
                      <Button
                        className="m-3 p-1 mb-3 text-lg"
                        onClick={() => {setShowEditModal(true),setselectedProductName(item.product_name)} }
                        size="m"
                        
                        gradientDuoTone="Transparent"
                      >
                        ...
                      </Button>
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
          <Add_item_Model />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Header>
          {editIndex !== null ? "Edit Item" : "Add Item"}
        </Modal.Header>
        <Modal.Body>
        <Edit_Item_Model productName={selectedProductName} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Product;
