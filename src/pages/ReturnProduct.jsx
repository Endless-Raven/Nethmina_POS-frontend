import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { usePost } from "../services/api";



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
    });
  
    // Automatically populate user_id and store_id based on logged-in user
    useEffect(() => {
      if (userData) {
        setFormData((prev) => ({
          ...prev,
          user_id: userData.user_id,
          store_id: userData.store_id,
        }));
      }
    }, [userData]);
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
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
  
    return (
      <div className="w-full px-64">
        <h1 className="text-2xl font-bold mb-4">Add Return Product</h1>
        <div className="p-6 border-2 shadow-md rounded-md border-gray-600">
          <h3 className="text-xl font-bold mb-4">Return Product Details</h3>
          <form onSubmit={handleAddReturnProduct}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">IMEI Number</label>
              <input
                type="text"
                name="imei_number"
                value={formData.imei_number}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
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
            <div className="flex justify-end">
              <Button type="submit" gradientDuoTone="greenToBlue" disabled={loading}>
                Add Return Product
              </Button>
            </div>
          </form>
        </div>
  
        {/* Success/Error Message */}
        {data?.message && (
          <p className="my-2 text-green-600">{data.message}</p>
        )}
        {error && <p className="my-2 text-red-600">{error}</p>}
      </div>
    );
}
