import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

export default function UpcommingStockInv({ show, close }) {
  const userData = useSelector((state) => state.user.data);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState(null);

  async function getUpcomming() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stock/getallTransfers`,
        {
          params: {
            store_id: userData.store_id,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUpcomming();
  }, []);

  const handleRecived = async (e, id) => {
    e.preventDefault();
    try {
      setLoading1(true);
      const response = await axios.put(
        `${API_BASE_URL}/stock/markTransferAsRead?transfer_id=${id}`
      );
      setData(data.filter((p) => p.transfer_id !== id));
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading1(false);
    }
  };

  return (
    <Modal show={show} size="xl" onClose={close} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 capitalize">
          <h3 className="text-xl font-medium text-blue-700 dark:text-white">
            Upcomming Stocks
          </h3>
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
          ) : data.length > 0 ? (
            data.map((transfer, index) => (
              <div
                key={index}
                className="p-2 bg-white border rounded-md shadow-blue-300 shadow-md text-slate-600"
              >
                <p className="flex justify-between pb-1 mb-2 border-b-2 border-blue-200">
                  <span className="font-semibold">{transfer.from}</span>
                  <span className="text-sm">{transfer.date}</span>
                </p>
                {transfer.products.map((product, index2) => (
                  <p
                    key={index2}
                    className="flex justify-between items-center mb-1"
                  >
                    <span>{product.product_name}</span>
                    <span className="text-sm">{product.product_type}</span>
                    <span>{product.transfer_quantity}</span>
                  </p>
                ))}
                <div className="mt-2 flex justify-end">
                  <Button
                    color="blue"
                    size="xs"
                    onClick={(e) => {
                      handleRecived(e, transfer.transfer_id);
                    }}
                    disabled={loading1}
                  >
                    Recived parcel
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-32 text-xl text-slate-400 font-semibold">
              No Upcomming Stocks
            </div>
          )}
          <div></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
