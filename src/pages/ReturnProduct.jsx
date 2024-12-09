import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { usePost } from "../services/api";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default function ReturnProduct() {
  const { data, error, loading, postData } = usePost();
  const userData = useSelector((state) => state.user.data);

  const [formData, setFormData] = useState({
    imei_number: "",
    amount: "",
    description: "",
    user_id: "",
    store_id: "",
    in_imei_number:"",
    store_name:"",
  });

  const [inStock, setInStock] = useState(false); // Track checkbox state
  const [barcode, setBarcode] = useState(""); // Track barcode value
  const [productDetails, setProductDetails] = useState(null); // Track fetched product details
  const [additionalInfo, setAdditionalInfo] = useState(""); // New input field

  // Automatically populate user_id and store_id based on logged-in user
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        user_id: userData.user_id,
        store_id: userData.store_id,
        store_name: userData.store_name,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle checkbox state change
  const handleCheckboxChange = (e) => {
    setInStock(e.target.checked);
    setBarcode(""); // Clear the barcode field when toggling the checkbox
    setProductDetails(null); // Reset product details when checkbox is unchecked
  };

  // Handle barcode change and fetch product details
  const handleChangeBarCode = (e) => {
    const product_code = e.target.value;
    setBarcode(e.target.value);
    fetchProductDetails(product_code); // Fetch product details using barcode
  };

  // Fetch product details from the backend using product code
  // Fetch product details from the backend using product code
  const fetchProductDetails = async (product_code) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/productCode/${product_code}`
      );
      const data = response.data; // Axios automatically parses the response as JSON
      console.log(data);

      if (data) {
        setProductDetails(data);
      } else {
        setProductDetails(null); // Reset product details if not found
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProductDetails(null); // Reset product details in case of an error
    }
  };

  const handleAddReturnProduct = async (e) => {
    e.preventDefault();
    await postData("return/AddReturn", formData); // Replace with your API endpoint
    setFormData({
      imei_number: "",
      amount: "",
      description: "",
      user_id: userData?.user_id || "",
      store_id: userData?.store_id || "",
    });
  };

  const handleAddReturnInStock = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      description:additionalInfo,
      product_id:productDetails.product_id,
      price: productDetails.product_price,
    };
    await postData("return/AddReturnInStock", payload); // Replace with your endpoint
    setBarcode("");
    setAdditionalInfo("");
  };

  return (
    <div className="w-full px-64">
      <h1 className="text-2xl font-bold mb-4">Add Return Product</h1>
      <div className="p-6 border-2 shadow-md rounded-md border-gray-600">
        <h3 className="text-xl font-bold mb-4">Return Product Details</h3>
        <form
          onSubmit={inStock ? handleAddReturnInStock : handleAddReturnProduct}
        >
          {!inStock && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">IMEI Number</label>
                <input
                  type="text"
                  name="imei_number"
                  value={formData.imei_number}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  disabled={inStock} // Disable if "In Stock" is checked
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  required
                />
              </div>
              <Button
              type="submit"
              gradientDuoTone="greenToBlue"
              disabled={loading}
            >
              Add Return Product
            </Button>
              </>
            )}
              {/* In Stock Checkbox */}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="text-gray-700">In Stock</label>
              </div>
            
          
          {/* Product Code input, visible when "In Stock" is checked */}
          {inStock && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Product Code</label>
                <input
                  type="text"
                  value={barcode}
                  onChange={handleChangeBarCode}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Product Code"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">IMEI Number</label>
                <input
                  type="text"
                  name="in_imei_number"
                  value={formData.in_imei_number}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required // Disable if "In Stock" is checked
                />
              </div>
              {/* Display product details under product code input */}
              {productDetails && (
                <div className="mb-4">
                  <h4 className="font-semibold">Product Details:</h4>
                  <p>
                    <strong>Product Name:</strong> {productDetails.product_name}
                  </p>
                  <p>
                    <strong>Color:</strong> {productDetails.color}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {productDetails.capacity}
                  </p>
                  <p>
                    <strong>Grade:</strong> {productDetails.grade}
                  </p>
                  <p>
                    <strong>Grade:</strong> {productDetails.product_price}
                  </p>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Additional Info
                </label>
                <input
                  type="text"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter additional information"
                />
              </div>
            </>
          )}

          <div className="flex justify-end">
            {inStock && (
              <Button
                type="button"
                onClick={handleAddReturnInStock}
                gradientDuoTone="purpleToPink"
                className="ml-4"
              >
                Add In-Stock Return
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Success/Error Message */}
      {data?.message && <p className="my-2 text-green-600">{data.message}</p>}
      {error && <p className="my-2 text-red-600">{error}</p>}
    </div>
  );
}
