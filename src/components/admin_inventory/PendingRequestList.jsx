import React from "react";

export default function PendingRequestList({ data }) {
  
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
                  <strong>From:</strong> {pending.shop}
                </div>
                <div className="flex gap-3">
                  <strong>Time:</strong> {pending.time}
                  <strong>Date:</strong>{" "}
                  {new Date(pending.date).toLocaleDateString()}
                </div>
              </div>
              {pending.products.map((product, index2) => (
                <div className=" flex gap-3 text-sm" key={index2}>
                  <strong>Category:</strong> {product.product_type}
                  <strong>Brand:</strong> {product.brand_name}
                  <strong>Product Name:</strong> {product.product_name}
                  <strong>Quantity:</strong> {product.request_quantity}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No pending requests.</p>
      )}
    </div>
  );
}
