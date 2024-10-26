import React from 'react';
import { Modal, Button } from 'flowbite-react';

const InventoryPendingRequest = ({ show, close }) => {
  const requests = [
    {
      request_id: 1,
      date: "2024/10/02",
      time: "06:55",
      is_seen: false,
      products: [
        {
          product_id: 1,
          product_name: "samsung 23",
          brand_name: "samsung",
          product_type: "mobile phone",
          request_quantity: 20
        },
        {
          product_id: 2,
          product_name: "apple iPhone 15",
          brand_name: "apple",
          product_type: "mobile phone",
          request_quantity: 15
        }
      ]
    },
    {
      request_id: 2,
      date: "2024/10/03",
      time: "08:30",
      is_seen: false,
      products: [
        {
          product_id: 3,
          product_name: "dell xps 13",
          brand_name: "dell",
          product_type: "laptop",
          request_quantity: 10
        },
        {
          product_id: 4,
          product_name: "lenovo thinkpad",
          brand_name: "lenovo",
          product_type: "laptop",
          request_quantity: 8
        }
      ]
    },
    {
      request_id: 3,
      date: "2024/10/04",
      time: "11:45",
      is_seen: true,
      products: [
        {
          product_id: 5,
          product_name: "samsung galaxy tab",
          brand_name: "samsung",
          product_type: "tablet",
          request_quantity: 12
        },
        {
          product_id: 6,
          product_name: "apple iPad Air",
          brand_name: "apple",
          product_type: "tablet",
          request_quantity: 18
        }
      ]
    },
    {
      request_id: 4,
      date: "2024/10/05",
      time: "14:10",
      is_seen: true,
      products: [
        {
          product_id: 7,
          product_name: "fitbit versa 3",
          brand_name: "fitbit",
          product_type: "smartwatch",
          request_quantity: 25
        },
        {
          product_id: 8,
          product_name: "garmin instinct",
          brand_name: "garmin",
          product_type: "smartwatch",
          request_quantity: 30
        }
      ]
    }
  ];

  return (
    <Modal show={show} onClose={close}>
      <Modal.Header>
        <div className="flex justify-between w-full text-green-600">
          <h2>Pending Requests</h2>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="space-y-6">
          {/* Pending Requests Section */}
          <div className="border rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-green-400">Pending Requests</h2>
            {requests
              .filter(request => !request.is_seen)
              .map(request => (
                <div key={request.request_id} className="mt-4 space-y-4">
                  <p><strong>Request ID:</strong> {request.request_id}</p>
                  <p><strong>Date:</strong> {request.date}</p>
                  <p><strong>Time:</strong> {request.time}</p>
                  {request.products.map(product => (
                    <div key={product.product_id} className="border-t pt-2 space-y-1">
                      <p><strong>Product Name:</strong> {product.product_name}</p>
                      <p><strong>Brand Name:</strong> {product.brand_name}</p>
                      <p><strong>Product Type:</strong> {product.product_type}</p>
                      <p><strong>Qty:</strong> {product.request_quantity}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          {/* Seen Requests Section */}
          <div className="border rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-blue-500">Seen Requests</h2>
            {requests
              .filter(request => request.is_seen)
              .map(request => (
                <div key={request.request_id} className="mt-4 space-y-4">
                  <p><strong>Request ID:</strong> {request.request_id}</p>
                  <p><strong>Date:</strong> {request.date}</p>
                  <p><strong>Time:</strong> {request.time}</p>
                  {request.products.map(product => (
                    <div key={product.product_id} className="border-t pt-2 space-y-1">
                      <p><strong>Product Name:</strong> {product.product_name}</p>
                      <p><strong>Brand Name:</strong> {product.brand_name}</p>
                      <p><strong>Product Type:</strong> {product.product_type}</p>
                      <p><strong>Qty:</strong> {product.request_quantity}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InventoryPendingRequest;
