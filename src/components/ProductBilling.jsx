import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { useGetWithoutQuery } from "../services/api";

const API_BASE_URL = process.env.API_BASE_URL;

export default function ProductBilling({
  product,
  setProduct,
  addProduct,
  store_name,
  reset,
  undo,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(""); // State for selected model ID
  const [openModal, setOpenModal] = useState(false);
  const [validEmi, setValidEmi] = useState([]);
  const [emiAvialable, setEmiAvialable] = useState(true);
  const [barcode, setBarcode] = useState("");
  const { data, error, loading, fetchData } = useGetWithoutQuery();
  const [producterror, setError] = useState("");

  const [Max_discount, setMax_discount] = useState(null);
  const [imeicheck, setEmeicheck] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCate();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 10000);
  }, [barcode==""]);

  useEffect(() => {
    checkSerial();
  }, [product.serial_number]);

  const fetchCate = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductTypes/get`
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (selectedCategory !== "") {
      fetchBrands();
    }
  }, [selectedCategory]);
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/brands/byproducttype`,
        {
          params: {
            product_type: selectedCategory,
          },
        }
      );
      setBrands(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [models, setModels] = useState([]);
  useEffect(() => {
    if (selectedBrand !== "" && selectedCategory !== "") {
      fetchModels();
    }
  }, [selectedBrand, selectedCategory]);
  const fetchModels = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/models/bybrandAndStore`,
        {
          params: {
            brand_name: selectedBrand,
            product_type: selectedCategory,
            store_name:store_name
          },
        }
      );
      setModels(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkSerial = async () => {
    try {
      setEmeicheck(false);
      const response = await axios.post(
        `${API_BASE_URL}/product/stockin/imei`,
        {
          product_id: product.product_id,
          store_id: store_name,
          product_serial: product.serial_number,
        }
      );
      if (response.data?.message === "Serial number found in stock.") {
        setEmeicheck(true);
      } else {
        console.warn("IMEI not found in store.");
      }
    } catch (error) {
      console.error(
        "Error checking serial number:",
        error.response?.data || error.message
      );
    }
  };

  // Handle changes for product fields
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "discount" ? Math.min(value, Max_discount) : value,
    }));
  };

  // Handle changes for model selection
  const handleChangeProduct = (e) => {
    const selected = e.target.value;
    setSelectedModelId(selected); // Update the selected model ID

    if (selected) {
      const model = models.find(
        (model) => model.product_id === Number(selected)
      );
      if (model) {
        setProduct({
          product_id: model.product_id,
          product_name: model.product_name,
          serial_number: "",
          price: model.product_price,
          quantity: 1,
          discount: 0.0,
          warranty_period: model.warranty_period,
        });
        setValidEmi(model.imei_number);
        setMax_discount(model.max_discount);
      }
    } else {
      resetProduct(); // Reset product if no model is selected
    }
  };

  // Function to reset product data
  const resetProduct = () => {
    setProduct({
      product_id: "",
      product_name: "",
      serial_number: "",
      price: "",
      quantity: "",
      discount: "",
      warranty_period: "",
    });
    setError("");
    setSelectedModelId(""); // Reset selected model ID
    setSelectedCategory("");
    setSelectedBrand("");
    setBarcode("");
    setValidEmi([]);
    setMax_discount(null);
  };

  // Handle form submission
  const handleAdd = (e) => {
    e.preventDefault();
    if (validEmi.length > 0) {
      if (
        product.serial_number &&
        product.serial_number.length === 15 &&
        validEmi.includes(product.serial_number) &&
        product.product_name !== ""
      ) {
        // Validate product data before adding
        addProduct();
        resetProduct(); // Reset product and selections after adding
      } else {
        setOpenModal(true);
      }
    } else if (product.product_name !== "") {
      addProduct();
      resetProduct();
    } else {
      setOpenModal(true);
    }
  };
  // const handleChangeBarCode = (e) => {
  //   setBarcode(e.target.value);
  //   fetchData(`product/productCode/${e.target.value}/${store_name}`);
  // };

  const handleChangeBarCode = async (e) => {
    const barcode = e.target.value;
    setBarcode(barcode);

    if (barcode.trim() === "") {
      setError("");
      return;
    }
  
    try {
      const response = await fetchData(`product/productCode/${barcode}/${store_name}`);
      if (response.ok) {
        const data = await response.json();
        // Handle the product data (e.g., setProduct(data))
        setError(""); // Clear any previous error
      } else {
        // Handle errors based on response status
        if (response.status > 404) {
          setError("Product not in your store.");
        } else {
          setError("Error fetching data.");
        }
      }
      
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError("Product not in your store.");
    }
  };
  

  useEffect(() => {
    if (data?.product_type) setSelectedCategory(data.product_type);
    if (data?.brand_name) setSelectedBrand(data.brand_name);
    if (data?.product_id) {
      setProduct((prev) => ({ ...prev, product_id: data.product_id }));
      setSelectedModelId(data.product_id);
    }
    if (data?.product_name)
      setProduct((prev) => ({ ...prev, product_name: data.product_name }));
    if (data?.product_name)
      setProduct((prev) => ({ ...prev, color: data.color }));
    if (data?.product_name)
      setProduct((prev) => ({ ...prev, capacity: data.capacity }));
    if (data?.product_price)
      setProduct((prev) => ({ ...prev, price: data.product_price }));
    if (data?.warranty_period)
      setProduct((prev) => ({
        ...prev,
        warranty_period: data.warranty_period,
      }));
    if (data?.max_discount) {
      setMax_discount(data.max_discount);
    }
    if (data?.imei_number) {
      setValidEmi(data.imei_number);
    }
    setProduct((prev) => ({
      ...prev,
      serial_number: "",
      quantity: 1,
      discount: 0.0,
    }));
  }, [data]);

  useEffect(() => {
    if (reset) {
      resetProduct();
      undo();
    }
  }, [reset]);

  return (
    <div className="">
      <form className="mx-auto p-2 flex max-w-md flex-col gap-2">
        {/* barcode */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="barcode" value="Bar Code" />
          <TextInput
            sizing={"sm"}
            value={barcode}
            onChange={handleChangeBarCode}
            name="barcode"
            id="barcode"
            type="text"
            className="w-64"
            placeholder="038678561125"
          />
        </div>
        {/* Product Type Selection */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="type" value="Product Type" />
          <Select
            id="type"
            sizing={"sm"}
            className="w-64"
            required
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setValidEmi([]);
            }}
          >
            <option value="">Select</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>

        {/* Brand Selection */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="brand" value="Brand Name" />
          <Select
            id="brand"
            sizing={"sm"}
            className="w-64"
            required
            disabled={selectedCategory === ""}
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setValidEmi([]);
            }}
          >
            <option value="">Select</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </div>

        {/* Product Selection */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="product" value="Product Name" />
          <Select
            id="product"
            sizing={"sm"}
            className="w-64"
            required
            disabled={selectedBrand === ""}
            value={selectedModelId} // Bind selected model ID to the value of the dropdown
            onChange={handleChangeProduct}
          >
            <option value="">Select</option>
            {models.map((model , index)=>(
            <option key={index} value={model.product_id}>
                {model.product_name}
              </option>
              ))}
          </Select>
        </div>
        {/* Serial Number */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="serial" value="Serial Number" />
          <input
            sizing={"sm"}
            value={product.serial_number}
            onChange={(e) => {
              handleProductChange(e);
            }}
            name="serial_number"
            id="serial"
            type="text"
            maxLength={15}
            className={`w-64 rounded-md focus:ring-2 ${
              false === imeicheck
                ? `border-red-600 focus:ring-red-500`
                : `border-green-400 focus:ring-green-500`
            } px-2 py-1`}
            required
          />
        </div>

        {/* Unit Price (Read Only) */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="price" value="Unit Price" />
          <TextInput
            sizing={"sm"}
            value={product.price}
            name="price"
            id="price"
            type="number"
            className="w-64"
            placeholder="10000.00"
            readOnly
          />
        </div>

        {/* Number of Units */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="quantity" value="No of Units" />
          <TextInput
            sizing={"sm"}
            id="quantity"
            type="number"
            min={1}
            onChange={handleProductChange}
            name="quantity"
            className="w-64"
            placeholder="3"
            value={product.quantity}
            required
          />
        </div>

        {/* Discount */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="discount" value="Discount" />
          <TextInput
            sizing={"sm"}
            id="discount"
            name="discount"
            onChange={handleProductChange}
            type="number"
            min={0}
            className="w-64"
            placeholder="500.00"
            value={product.discount}
          />
        </div>

        {/* Total Price */}
        <div className="flex gap-4 items-center justify-between mb-3">
          <Label htmlFor="total" value="Total Price" />
          <TextInput
            sizing={"sm"}
            id="total"
            value={
              (Number(product.price) || 0) * (Number(product.quantity) || 1) -
              (Number(product.discount) || 0)
            }
            type="number"
            className="w-64"
            placeholder="30000"
            readOnly
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
        {error && <span className="text-red-500">{producterror}</span>}
          <Button
            type="reset"
            size={"sm"}
            outline
            gradientDuoTone="pinkToOrange"
            onClick={resetProduct} // Use resetProduct function for clarity
          >
            Clear
          </Button>
          <Button
            type="submit"
            onClick={handleAdd}
            size={"sm"}
            gradientDuoTone="purpleToBlue"
            disabled={
              loading || (selectedCategory == "Mobile Phone" && !imeicheck)
            }
          >
            Add Product
          </Button>
        </div>
      </form>

      {/* for display error messages */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Something wrong with product data
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
