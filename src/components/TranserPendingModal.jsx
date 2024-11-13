import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default function TranserPendingModal({ store_Id, show, close }) {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransfers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/stock/getTransfers/bystore`,
          {
            params: { store_id: store_Id }, // Set the store_id as a query parameter
          }
        );
        setTransfers(response.data);
      } catch (err) {
        console.error("Error fetching transfers:", err);
        setError("Error fetching transfers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (store_Id) {
      fetchTransfers();
    }
  }, [store_Id]);

  const handleCancelTransfer = async (transfer_id) => {
    if (!window.confirm("Are you sure you want to cancel this transfer?")) {
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/stock/cancel/transferStock`,
        {
          transfer_id,
        }
      );
      alert(response.data.message);
      // Update transfer list to remove the canceled transfer
      setTransfers(transfers.filter((t) => t.transfer_id !== transfer_id));
    } catch (err) {
      console.error("Error canceling transfer:", err);
      alert("Error canceling transfer. Please try again.");
    }
  };

  return (
    <div>
      <Modal show={show} size={"5xl"} onClose={close} popup>
        <Modal.Header>
          <h2>Pending Transfers</h2>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading pending transfers...</p>
          ) : error ? (
            <p>{error}</p>
          ) : transfers.length === 0 ? (
            <p>No pending transfers found for this store.</p>
          ) : (
            <div className="p-4">
              {/* Pending Transfer Section */}
              <div className="w-full">
                <h2 className="text-lg font-bold mb-10 text-green-500">
                  Pending Transfers
                </h2>
                {transfers.map((transfer, index) => (
                  <div key={transfer.transfer_id} className="mb-6">
                    {/* Transfer Header Box */}
                    <div className="p-2 flex rounded-t-md justify-start gap-4 bg-green-200 text-green-600">
                      <strong>From:</strong> {transfer.to}
                      <strong>Transfer ID:</strong> {transfer.transfer_id}
                      <strong>Date:</strong> {new Date(transfer.date).toLocaleDateString()}
                      <strong>Time:</strong> {transfer.time}
                      <strong>Approval Status:</strong>{" "}
                      {transfer.transfer_approval}
                    </div>

                    {/* Product Table */}
                    <table className="min-w-full border-collapse bg-green-100 hover:bg-green-50 ">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Product ID</th>
                          <th className="border px-4 py-2">Product Name</th>
                          <th className="border px-4 py-2">Brand</th>
                          <th className="border px-4 py-2">Type</th>
                          <th className="border px-4 py-2">
                            Transfer Quantity
                          </th>
                          <th className="border px-4 py-2">IMEI Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transfer.products.map((product, i) => (
                          <tr key={i}>
                            <td className="border px-4 py-2">
                              {product.product_id}
                            </td>
                            <td className="border px-4 py-2">
                              {product.product_name}
                            </td>
                            <td className="border px-4 py-2">
                              {product.brand_name}
                            </td>
                            <td className="border px-4 py-2">
                              {product.product_type}
                            </td>
                            <td className="border px-4 py-2">
                              {product.transfer_quantity}
                            </td>
                            <td className="border px-4 py-2">
                              {product.imei_number}
                            </td>
                          </tr>
                        ))}
                      </tbody> </table>
                      {/* Cancel Button */}
                      <div className="w-full flex justify-end">
                      <button
                        onClick={() =>
                          handleCancelTransfer(transfer.transfer_id)
                        }
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel Transfer
                      </button>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
