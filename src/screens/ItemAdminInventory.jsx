import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal,Checkbox,Label, Spinner, Table } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import UpdateItemModel from "../components/admin/UpdateItemModel";
import ImeiNumberModel from "../components/admin/ImeiNumberModel";
import DeleteProductModel from "../components/admin/DeleteProductModel";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.API_BASE_URL;

function ItemAdminInventory() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState("");
  const [showImeiNumber, setShowImeiNumberModal] = useState("");
  const [showDelete, setShowDeleteModal] = useState(false);
  const [qty, setqty] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [stores, setStores] = useState([]);
  const [color, setColor] = useState([]);
  const [Capacity, setCapacity] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedProductName, setselectedProductName] = useState("");
  const [selectedProductCode, setselectedPrdocutCode] = useState("");
  const [selectedProductID, setselectedProductID] = useState("");
  const [selectedShop, setselectedShop] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchStores();
    fetchCategories();
    fetchBrands();
    fetchProductData();
    fetchColor();
    fetchCapacity();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [searchTerm, selectedStore, selectedBrand, selectedCategory]);

  useEffect(() => {
    fetchProductData();
  }, [selectedColor]);

  useEffect(() => {
    fetchProductData();
  }, [selectedCapacity]);

  useEffect(() => {
    fetchProductData();
  }, [selectedGrade]);

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

  useEffect(() => {
    setFilteredProducts(
      products.filter((p) =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm])

  // Fetch store names
  const fetchStores = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/getstore/names`);
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const fetchColor = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductColor/get`
      );
      setColor(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCapacity = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductCapacity/get`
      );
      setCapacity(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
          color: selectedColor,
          grade: selectedGrade,
          capacity: selectedCapacity,
        }
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
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
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4 gap-3">
        <div className="relative w-4/5 mx-auto">
          <div className="relative pb-4">
            <CiSearch className="absolute left-3 top-5 transform -translate-y-1/2 text-xl text-gray-500" />
            <input
              type="text"
              placeholder="Search Item by Name"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 p-2 border rounded-lg border-gray-300 w-full"
            />
          </div>
          <div className="relative flex justify-between w-full">
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
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="p-2 border rounded-lg bg-white"
            >
              <option value="All">Color</option>
              {color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="p-2 border rounded-lg bg-white"
            >
              <option value="All">Capacity</option>
              {Capacity.map((Capacity) => (
                <option key={Capacity} value={Capacity}>
                  {Capacity}
                </option>
              ))}
            </select>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="p-2 border rounded-lg bg-white"
            >
              <option value="All">Grade</option>
              <option value="P1+">P1+</option>
              <option value="P2+">P2+</option>
              <option value="P3+">P3+</option>
              <option value="P4+">P4+</option>
            </select>
         
          </div>
           {/* Checkbox and Paragraph */}
           <div className=" pt-6 flex items-center gap-2">
            <Checkbox
              id="low-stock"
              onChange={(e) => {
                if (e.target.checked) {
                  setFilteredProducts(
                    products.filter((p) => parseFloat(p.stock_quantity) < p.low_count)
                  );
                } else {
                  setFilteredProducts(products);
                }
              }}
            />
            <Label htmlFor="low-stock" className="cursor-pointer">
              Show only low stock items
            </Label>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start mb-4 gap-3">
        <div>
          <div className="table-container overflow-x-auto max-h-[79vh] shadow-md">
            <Table hoverable>
              <Table.Head className="">
                <Table.HeadCell className="bg-emerald-300">
                  Bar Code
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">
                  Store Name
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">
                  Brand
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">Type</Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">
                  Product
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">
                  Color
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">
                  Grade
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">
                  Capacity
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">
                  Stock
                </Table.HeadCell>
                <Table.HeadCell className="bg-emerald-300">Edit</Table.HeadCell>
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
                ) : filteredProducts.length < 1 ? (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-sky-50">
                    <Table.Cell
                      colSpan={7}
                      className="text-red-500 text-center h-48"
                    >
                      No Products Found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredProducts?.map((item, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-emerald-50"
                      key={index}
                    >
                      <Table.Cell>{item.product_code}</Table.Cell>
                      <Table.Cell>
                        <strong>{item.store_name}</strong>
                      </Table.Cell>
                      <Table.Cell> {item.brand_name}</Table.Cell>
                      <Table.Cell>{item.product_type}</Table.Cell>
                      <Table.Cell
                        onClick={() => {
                          setselectedProductID(item.product_id);
                          setselectedShop(item.store_name);
                          setShowImeiNumberModal(true);
                        }}
                      >
                        {item.product_name}
                      </Table.Cell>
                      <Table.Cell>{item.color}</Table.Cell>
                      <Table.Cell>{item.grade}</Table.Cell>
                      <Table.Cell>{item.capacity}</Table.Cell>
                      <Table.Cell>{item.stock_quantity}</Table.Cell>
                      <Table.Cell>
                      <div className="flex justify-between items-center mb-4 gap-3">
                        <Button
                          className="m-3 p-1 mb-3 text-lg"
                          onClick={async () => {
                            setShowImeiNumberModal(false);
                            setqty(item.stock_quantity);
                            setShowEditModal(true);
                            setselectedProductName(item.product_name);
                            setselectedProductID(item.product_id);
                          }}
                          size="m"
                          gradientDuoTone="Transparent"
                        >
                          ...
                        </Button>
                        <Button
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => {
                            setselectedShop(item.store_name);
                            setselectedProductID(item.product_id);
                            setselectedPrdocutCode(item.product_code);
                            setShowDeleteModal(true);
                            setqty(item.stock_quantity);
                          }}
                          size="m"
                          gradientDuoTone="Transparent"
                        >
                          Delete
                        </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      {showDelete &&  <DeleteProductModel
        showModel={showDelete}
        shop={selectedShop}
        productID={selectedProductID}
        qty={qty}
        code={selectedProductCode}
        close={() => {
          setShowDeleteModal(false);
          navigate(0);
        }}
      />}
      <UpdateItemModel
        stockqty={qty}
        productName={selectedProductName}
        product_id={selectedProductID}
        showModel={showEditModal}
        close={() => {
          setShowEditModal(false);
          navigate(0);
        }}
      />
      <ImeiNumberModel
        productID={selectedProductID}
        shop={selectedShop}
        showModel={showImeiNumber}
        close={() => {
          setShowImeiNumberModal(false);
        }}
      />
      
    </div>
  );
}

export default ItemAdminInventory;
