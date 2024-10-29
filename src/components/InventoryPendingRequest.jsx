import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";

const InventoryPendingRequest = ({ show, close }) => {
  
  const [requests, setRequests] = useState([
    {
      request_id: 1,
      date: "2024/10/02",
      time: "06:55",
      is_seen: true,
      products: [
        {
          product_id: 1,
          product_name: "samsung 23",
          brand_name: "samsung",
          product_type: "mobile phone",
          request_quantity: 20,
        },
        {
          product_id: 1,
          product_name: "samsung 23",
          brand_name: "samsung",
          product_type: "mobile phone",
          request_quantity: 20,
        },
      ],
    },
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
          request_quantity: 20,
        },
        {
          product_id: 1,
          product_name: "samsung 23",
          brand_name: "samsung",
          product_type: "mobile phone",
          request_quantity: 20,
        },
      ],
    },
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
          request_quantity: 20,
        },
        {
          product_id: 1,
          product_name: "samsung 23",
          brand_name: "samsung",
          product_type: "mobile phone",
          request_quantity: 20,
        },
      ],
    },
  ]);

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
            <h2 className="text-xl font-semibold text-green-400">
              Pending Requests
            </h2>
            {requests
              .filter((request) => !request.is_seen)
              .map((request) => (
                <div
                  key={request.request_id}
                  className="relative mt-4 pb-4 border-b-2 border-green-400 space-y-2"
                >
                  <p>
                    <strong>Request ID:</strong> {request.request_id}
                  </p>
                  <p>
                    <strong>Date:</strong> {request.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {request.time}
                  </p>
                  {request.products.map((product) => (
                    <div
                      key={product.product_id}
                      className="border-t pt-2 flex"
                    >
                      <p>
                        <strong>Product Name:</strong> {product.product_name}
                      </p>
                      <p>
                        <strong>Brand Name:</strong> {product.brand_name}
                      </p>
                      <p>
                        <strong>Product Type:</strong> {product.product_type}
                      </p>
                      <p>
                        <strong>Qty:</strong> {product.request_quantity}
                      </p>
                    </div>
                  ))}
                  <Button
                    className="absolute top-0 right-0"
                    gradientDuoTone="pinkToOrange"
                  >
                    Cansel Request
                  </Button>
                </div>
              ))}
          </div>

          {/* Seen Requests Section */}
          <div className="border rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-blue-500">
              Seen Requests
            </h2>
            {requests
              .filter((request) => request.is_seen)
              .map((request) => (
                <div
                  key={request.request_id}
                  className="relative mt-4 pb-4 border-b-2 border-blue-400 space-y-4"
                >
                  <p>
                    <strong>Request ID:</strong> {request.request_id}
                  </p>
                  <p>
                    <strong>Date:</strong> {request.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {request.time}
                  </p>
                  {request.products.map((product) => (
                    <div
                      key={product.product_id}
                      className="border-t pt-2 flex"
                    >
                      <p>
                        <strong>Product Name:</strong> {product.product_name}
                      </p>
                      <p>
                        <strong>Brand Name:</strong> {product.brand_name}
                      </p>
                      <p>
                        <strong>Product Type:</strong> {product.product_type}
                      </p>
                      <p>
                        <strong>Qty:</strong> {product.request_quantity}
                      </p>
                    </div>
                  ))}
                  <Button
                    className="absolute top-0 right-0"
                    gradientDuoTone="pinkToOrange"
                  >
                    Delete Request
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InventoryPendingRequest;
