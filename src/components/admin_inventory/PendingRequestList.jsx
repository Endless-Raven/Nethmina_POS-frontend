import React, { useState } from "react";
import { useMobileForImei } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function     PendingRequestList({ data }) {
  const { error, loading, fetchMobileData } = useMobileForImei();
  const navigate = useNavigate();
  const handleMarkAsRead = async (id) => {
    await fetchMobileData("stock/markRequestAsRead", { request_id: id });
    navigate(0);
  };

  return (
    <div className="mb-4 border rounded-xl bg-green-50 text-green-700">
      <h3 className="font-bold text-2xl mb-2 mt-4 mx-4">Pending Request</h3>
      {data && data.length > 0 ? (
        <div>
          {data.map((pending, index) => (
            <div
              key={index}
              className="p-4 border-b-2 bg-green-50 hover:bg-green-100"
            >
              <div className="flex justify-between gap-2 mb-2 ">
              <div className="">
                  <strong>Requested By:</strong> {pending.shop}
                </div>
                <div className="">
                  <strong>From:</strong> {pending.req_from}
                </div>
                <div className="flex gap-3">
                  <strong>Time:</strong> {pending.time}
                  <strong>Date:</strong>{" "}
                  {new Date(pending.date).toLocaleDateString()}
                </div>
              </div>
              {pending.products.map((product, index2) => (
                <div
                  className=" flex gap-3 text-sm justify-between"
                  key={index2}
                >
                  <div>
                    <strong>Category:</strong> {product.product_type}
                  </div>
                  <div>
                    {" "}
                    <strong>Brand:</strong> {product.brand_name}
                  </div>
                  <div>
                    {" "}
                    <strong>Color:</strong> {product.color}
                  </div>
                  <div>
                    {" "}
                    <strong>Capacity:</strong> {product.capacity}
                  </div>
                  <div>
                    <strong>Product Name:</strong> {product.product_name}
                  </div>
                  <div>
                    {" "}
                    <strong>Quantity:</strong> {product.request_quantity}
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleMarkAsRead(pending.request_id)}
                className="bg-green-700 text-white px-3 py-1 mt-2 rounded-md hover:bg-green-600"
              >
                Mark As Read
              </button>
              {error && <p>{error}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>No pending requests.</p>
      )}
    </div>
  );
}
