import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Spinner, Table } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import Add_item_Model from "../components/Add_item_Model";
import Edit_Item_Model from "../components/Edit_Item_Model";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.API_BASE_URL;

function Product() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const navigate = useNavigate();
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
  const [selectedProductName, setselectedProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-20">
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="flex justify-between items-center w-1/4 mb-4 gap-3">
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
        </div>
        <div className="w-3/3">
          <div className="overflow-x-auto max-h-[79vh] shadow-md">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="bg-sky-300">No</Table.HeadCell>
                <Table.HeadCell className="bg-sky-300">Name</Table.HeadCell>
                <Table.HeadCell className="bg-sky-300">Brand</Table.HeadCell>
                <Table.HeadCell className="bg-sky-300">Type</Table.HeadCell>
                <Table.HeadCell className="bg-sky-300">Price</Table.HeadCell>
                <Table.HeadCell className="bg-sky-300">Warranty</Table.HeadCell>
                <Table.HeadCell className="bg-sky-300">MAx Discount</Table.HeadCell>
                <Table.HeadCell className="bg-sky-300">Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {loading ? (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-sky-50">
                    <Table.Cell
                      colSpan={7}
                      className="text-red-500 text-center h-48"
                    >
                      <Spinner size="md" />
                      <span className="pl-3 text-slate-400 text-xl">
                        Loading...
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ) : products.length < 1 ? (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-sky-50">
                    <Table.Cell
                      colSpan={7}
                      className="text-red-500 text-center h-48"
                    >
                      No Products Found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  products?.map((item, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-sky-50"
                      key={index}
                    >
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        <strong>{item.product_name}</strong>
                      </Table.Cell>
                      <Table.Cell> {item.brand_name}</Table.Cell>
                      <Table.Cell>{item.product_type}</Table.Cell>
                      <Table.Cell>{item.product_price}</Table.Cell>
                      <Table.Cell>{item.warranty_period}</Table.Cell>
                      <Table.Cell>{item.max_discount}</Table.Cell>
                      <Table.Cell>
                        <Button
                          className="m-3 p-1 mb-3 text-lg font-bold"
                          onClick={() => {
                            setShowEditModal(true),
                              setselectedProductName(item.product_name);
                          }}
                          size="m"
                          gradientDuoTone="Transparent"
                        >
                          ...
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false), navigate(0);
        }}
      >
        <Modal.Header>
          {editIndex !== null ? "Edit Item" : "Add Item"}
        </Modal.Header>
        <Modal.Body>
          <Add_item_Model />
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false), navigate(0);
        }}
      >
        <Modal.Header>
          {editIndex !== null ? "Update Item" : "Update Item"}
        </Modal.Header>
        <Modal.Body>
          <Edit_Item_Model productName={selectedProductName} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Product;
