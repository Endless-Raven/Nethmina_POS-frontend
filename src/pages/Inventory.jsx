import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Button, Modal, Label, TextInput } from "flowbite-react";

import axios from "axios";
import UpcommingStockInv from "../components/UpcommingStockInv";

const API_BASE_URL = process.env.API_BASE_URL;

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedcategory, setSelectedcategory] = useState("All");
  const [searchitems, setsearchitems] = useState("");
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setprodcuts] = useState([]);
  const [loading, setloading] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [openModalUpcomming, setOpenModalUpcomming] = useState(false);

  useEffect(() => {
    fetchCategoris();
    fetchStores();
    fetchBrands();
    fetchproductdata();
    fetchsetsearchitems();
  }, []);

  useEffect(() => {
    fetchproductdata();
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

  //serch bar
  async function fetchsetsearchitems() {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/getstore/names`);
      console.log("response.data", response.data);
      setsearchitems(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchStores() {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/getstore/names`);
      console.log("response.data", response.data);
      setStores(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCategoris() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductTypes/get`
      );
      console.log("responseeee", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchBrands() {
    try {
      console.log("sjds");
      const response = await axios.get(
        `${API_BASE_URL}/product/brands/byproducttype`,
        {
          params: { product_type: selectedcategory }, // Correctly sending the product type
        }
      );
      console.log("Brands response:", response.data);
      setBrands(response.data); // Uncommented this line to set brands
    } catch (error) {
      console.error(error);
    }
  }

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

  const handleEditItem = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="p-6 bg-slate-100 min-h-[88vh]">
      <div className="flex justify-between items-center mb-4 gap-3">
        <div className="relative w-1/2 mx-auto">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
          <div className="relative">
            <input
              type="text"
              placeholder="Search Item by Name or Brand"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="pl-10 p-2 border rounded-lg border-gray-300 w-full"
            />
          </div>
        </div>
        <select
          value={selectedStore}
          onChange={(e) => {
            setSelectedStore(e.target.value);
          }}
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
          onChange={async (e) => {
            setSelectedcategory(e.target.value);
          }}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="All">All Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
          }}
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

      <table className="w-full  bg-slate-50">
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
            <th className="border border-gray-300 p-2 hidden">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length < 1 ? (
            <div>
              <center> No products </center>
            </div>
          ) : (
            products.map((item, index) => (
              <tr
                key={item.no}
                className={
                  item.stock_quantity < 20 ? "bg-red-200" : "bg-green-200"
                }
              >
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td>{item.product_name}</td>
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
      <div className="flex justify-between fixed bottom-2 left-0 w-full px-6">
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          className="shadow-md drop-shadow-md"
          onClick={() => setOpenModalUpcomming(true)}
        >
          Upcomming Stocks
        </Button>
        <div className="flex gap-4">
          <Button
            gradientDuoTone="purpleToBlue"
            className="shadow-md drop-shadow-md"
          >
            Request Product
          </Button>
          <Button
            gradientDuoTone="greenToBlue"
            outline
            className="shadow-md drop-shadow-md"
          >
            Pending Request
          </Button>
        </div>
      </div>
      <UpcommingStockInv show={openModalUpcomming} close={() => setOpenModalUpcomming(false)}/>
    </div>
  );
};

export default Inventory;
