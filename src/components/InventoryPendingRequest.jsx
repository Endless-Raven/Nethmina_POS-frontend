import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";
const API_BASE_URL = process.env.API_BASE_URL;

const InventoryPendingRequest = ({ show, close }) => {
  const userData = useSelector((state) => state.user.data);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(null);

  async function getPendingRequest() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stock/getProductRequests`,
        {
          params: {
            store_id: userData.store_id,
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.message !== "No requests found for this store.")
        setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteRequest(id) {
    setLoading1(true);
    setError(null);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/stock/deleteRequest`,
        {
          params: {
            store_id: userData.store_id,
            request_id: id,
          },
        }
      );
      setRequests(requests.filter((p) => p.request_id !== id));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading1(false);
    }
  }

  useEffect(() => {
    getPendingRequest();
  }, []);

  return (
    <Modal show={show} onClose={close}>
      <Modal.Header>
        <div className="flex justify-between w-full text-green-600">
          <h2>Pending Requests</h2>
        </div>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <div className="min-h-[50vh] flex justify-center items-center">
            <div className="flex items-center gap-4">
              <Spinner size="lg" />
              <span className="pl-3 text-slate-400 text-3xl">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="min-h-[50vh] flex justify-center items-center">
            <div className="flex items-center gap-4">
              <span className="pl-3 text-red-400 text-3xl">
                Something went wrong
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pending Requests Section */}
            <div className="border rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold text-green-400">
                Pending Requests
              </h2>
              {requests
                ?.filter((request) => !request.is_seen)
                .map((request) => (
                  <div
                    key={request.request_id}
                    className="relative mt-4 pb-4 border-b-2 border-green-400 space-y-2"
                  >
                    <p>
                      <strong>Request ID:</strong> {request.request_id}
                    </p>
                    <p>
                      <strong>Request From:</strong> {request.req_from}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(request.date).toLocaleDateString()}
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
                          <strong>Qty:</strong> {product.request_quentity}
                        </p>
                      </div>
                    ))}
                    <Button
                      className="absolute top-0 right-0"
                      gradientDuoTone="pinkToOrange"
                      onClick={() => deleteRequest(request.request_id)}
                      disabled={loading1}
                    >
                      Cancel Request
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
                ?.filter((request) => request.is_seen)
                .map((request) => (
                  <div
                    key={request.request_id}
                    className="relative mt-4 pb-4 border-b-2 border-blue-400 space-y-4"
                  >
                    <p>
                      <strong>Request ID:</strong> {request.request_id}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(request.date).toLocaleDateString()}
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
                          <strong>Qty:</strong> {product.request_quentity}
                        </p>
                      </div>
                    ))}
                    <Button
                      className="absolute top-0 right-0"
                      gradientDuoTone="pinkToOrange"
                      onClick={() => deleteRequest(request.request_id)}
                      disabled={loading1}
                    >
                      Delete Request
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InventoryPendingRequest;
