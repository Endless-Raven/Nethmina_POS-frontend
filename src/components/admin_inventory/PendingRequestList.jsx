import React from 'react';

export default function PendingRequestList({ data }) {
  return (
    <div className="mb-4 p-4 border rounded-xl bg-green-100 hover:bg-green-200 text-green-700">
      <h3 className="font-bold mb-2">Pending Request</h3>
      {data ? (
        <>
          <p><strong>From:</strong> {data.from}</p>
          <p><strong>Time:</strong> {data.time}</p>
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Brand:</strong> {data.brand}</p>
          <p><strong>Product Name:</strong> {data.productName}</p>
          <p><strong>Quantity:</strong> {data.qty}</p>
        </>
      ) : (
        <p>No pending requests.</p>
      )}
    </div>
  );
}
