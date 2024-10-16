import React from "react";

export default function PendingRequestList({ data }) {
  return (
    <div className="mb-4 border rounded-xl bg-green-50 text-green-700">
      <h3 className="font-bold text-2xl mb-2 mt-4 mx-4">Pending Request</h3>

      {data ? (
        <div>
          {/* <div className='flex justify-between gap-2'>
          <strong>From:</strong> {data.from}
          <strong>Time:</strong> {data.time}
          <strong>Date:</strong> {data.date}
        </div>
        <div className='flex justify-between gap-1 mt-2'>
          <strong>Category:</strong> {data.category}
          <strong>Brand:</strong> {data.brand}
          <strong>Product Name:</strong> {data.productName}
          <strong>Quantity:</strong> {data.qty}
        </div> */}
          {data.map((pending, index) => (
            <div key={index} className="p-4 border-b-2 bg-green-50 hover:bg-green-100">
              <div className="flex justify-between gap-2 mb-2 ">
                <div className="">
                  <strong>From:</strong> {pending.from}
                </div>
                <div className="flex gap-3">
                  <strong>Time:</strong> {pending.time}
                  <strong>Date:</strong> {pending.date}
                </div>
              </div>
              {pending.products.map((product, index2) => (
                <div className=" flex gap-3" key={index2}>
                  
                  <strong>Category:</strong> {product.category}
                  <strong>Brand:</strong> {product.brand}
                  <strong>Product Name:</strong> {product.productName}
                  <strong>Quantity:</strong> {product.qty}
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
