import React from 'react';
import { Modal, Button } from 'flowbite-react';


const InventoryPendingRequest = ({ show, close }) => {
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
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-green-400">Pending Request</h2>
            </div>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <p><strong>Request ID:</strong> 01</p>
                <p><strong>Date:</strong> 2024/10/02</p>
                <p><strong>Time:</strong> 06:55</p>
                <div className="border-t pt-2 space-y-1">
                  <p><strong>Product Name:</strong> Samsung 23</p>
                  <p><strong>Brand Name:</strong> Samsung</p>
                  <p><strong>Product Type:</strong> Mobile Phone</p>
                  <p><strong>Qty:</strong> 20</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seen Requests Section */}
          <div className="border rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-blue-500">Seen Request</h2>
            </div>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <p><strong>Request ID:</strong> 02</p>
                <p><strong>Date:</strong> 2024/10/01</p>
                <p><strong>Time:</strong> 12:30</p>
                <div className="border-t pt-2 space-y-1">
                  <p><strong>Product Name:</strong> Pixel 7</p>
                  <p><strong>Brand Name:</strong> Google</p>
                  <p><strong>Product Type:</strong> Mobile Phone</p>
                  <p><strong>Qty:</strong> 10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

     
    </Modal>
  );
};

export default InventoryPendingRequest;
