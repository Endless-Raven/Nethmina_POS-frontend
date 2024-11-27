import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, Select, Spinner, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import UpcommingStockInv from "../components/UpcommingStockInv";
import RequestProduct from "../components/RequestProduct";
import { InventoryTable } from "../components/InventoryTable";
import InventoryPendingRequest from "../components/InventoryPendingRequest";
import axios from "axios";
import { useSelector } from "react-redux";
const API_BASE_URL = process.env.API_BASE_URL;

const Inventory = () => {
  const userData = useSelector((state) => state.user.data);
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getAllTypes() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductTypes/get`
      );
      setProductTypes(response.data);
      setSelectedType(response.data[0]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getBrandsByType() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/brands/byproducttype`,
        {
          params: {
            product_type: selectedType,
          },
        }
      );
      setBrands(response.data);
      setSelectedBrand(response.data[0]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getProductsByTypeBrand() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/inventory/stock`,
        {
          params: {
            product_type: selectedType,
            brand_name: selectedBrand,
            store_id: userData.store_id
          },
        }
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllTypes();
  }, []);

  useEffect(() => {
    getBrandsByType();
  }, [selectedType]);

  useEffect(() => {
    getProductsByTypeBrand();
  }, [selectedType, selectedBrand]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((p) =>
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <div className="relative min-h-[88vh]">
      {loading ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <div className="flex items-center gap-4">
            <Spinner size="lg" />
            <span className="pl-3 text-slate-400 text-3xl">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <div className="flex items-center gap-4">
            <span className="pl-3 text-red-400 text-3xl">
              Something went wrong
            </span>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-100 min-h-[88vh]">
          {/* Search Bar and Selectors */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <TextInput
                icon={CiSearch}
                placeholder="Search Item"
                className="w-1/3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Category Selector */}
              <Select
                value={selectedType}
                className="w-1/4"
                onChange={(e) => {
                  setSelectedType(e.target.value);
                }}
              >
                {productTypes.map((product, index) => (
                  <option value={product} key={index}>
                    {product}
                  </option>
                ))}
              </Select>

              {/* Brand Selector */}
              <Select
                value={selectedBrand}
                className="w-1/4"
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                }}
              >
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Checkbox and Paragraph */}
          <div className="mb-6 flex items-center gap-2">
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

          {/* Stock table */}
          <InventoryTable productList={filteredProducts} />

       

         
        </div>
      )}
    </div>
  );
};

export default Inventory;
