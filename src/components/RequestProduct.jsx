import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
const API_BASE_URL = process.env.API_BASE_URL;

export default function RequestProduct({ show, close }) {
  const userData = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success,setSuccess] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggesstionList, setSuggesstionList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [stores, setStores] = useState([]);

  async function getSuggestions() {
    try {
      setError(null);
      setSuccess(null);
      const response = await axios.get(
        `${API_BASE_URL}/product/productdetails/${searchQuery}`
      );
      setSuggesstionList(response.data);
    } catch (error) {
      if (error.response.data.message) setError("Products Not Found");
      else setError(error.message);
    }
  }
  useEffect(() => {
    fetchStores();
  }, []);

    // Fetch store names
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/stores/getstore/names`);
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

  useEffect(() => {
    if (searchQuery && searchQuery !== "") getSuggestions();
  }, [searchQuery]);

  async function requestProduct() {
    try {
      if (!selectedStore || selectedStore === "") {
        setError("Please select a valid store.");
        return; // Exit the function if no store is selected
      }

      setLoading(true);
      setError(null);
      setSuccess(null);
      const req = {
        products: selectedProducts,
        store_id: userData.store_id,
        req_from:selectedStore
      };
      const response = await axios.post(
        `${API_BASE_URL}/stock/requestproduct`,
        req
      );
      setSuccess(response.data.message);
      setSelectedProducts([]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Modal */}
      <Modal show={show} onClose={close} size="xl" popup={true}>
        <Modal.Header>
          <h2 className="text-xl font-semibold text-green-500 mx-2 mb-5">
            Request Product
          </h2>
        </Modal.Header>
        <Modal.Body>
          <div className="min-h-[50vh]">
          <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="p-2 border rounded-lg bg-white"
                required
              >
                <option value="All">Request From</option>
                {stores.map((store) => (
                  <option key={store} value={store}>
                    {store}
                  </option>
                ))}
              </select>
            {/* Search Bar */}
            <div className="relative pt-2">
              <CiSearch className="text-gray-600 mr-2 absolute left-2 top-5 text-xl" />
              <input
                type="search"
                placeholder="Search product"
                className="mb-5 w-full rounded-lg pl-8 pr-2 py-2 border  bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ul className="bg-gray-50 top-14 w-full absolute z-10 border-b rounded-md">
                {suggesstionList?.length > 0 &&
                  suggesstionList.map((li, index) => (
                    <li
                      className="pl-8 hover:bg-gray-200 cursor-pointer mb-1"
                      key={index}
                      onClick={async () => {
                        setSelectedProducts((prev) => [
                          ...prev,
                          {
                            product_id: li.product_id,
                            product_name: li.product_name,
                            request_quantity: 1,
                          },
                        ]);
                        setSuggesstionList([]);
                        setSearchQuery("");
                      }}
                    >
                       {li.product_name} {" "} {li.color} {" "} {li.capacity}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Product Table */}
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Product Name</Table.HeadCell>
                <Table.HeadCell>Qty</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {selectedProducts?.map((pro, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{pro.product_name}</Table.Cell>
                    <Table.Cell>
                      <input
                        type="number"
                        min={1}
                        className="w-24"
                        value={pro.request_quantity}
                        id={pro.product_id}
                        onChange={(e) => {
                          const newQuantity = e.target.value;
                          setSelectedProducts((prev) =>
                            prev.map((p) =>
                              p.product_id === pro.product_id
                                ? { ...p, request_quantity: newQuantity }
                                : p
                            )
                          );
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell className="text-3xl hover:text-red-500">
                      <div
                        className=""
                        onClick={() => {
                          setSelectedProducts(
                            selectedProducts.filter(
                              (p) => p.product_id !== pro.product_id
                            )
                          );
                        }}
                      >
                        <MdDelete />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {/* Add more rows as needed */}
              </Table.Body>
            </Table>
            {loading && (
              <div className="absolute inset-0 bg-slate-100 bg-opacity-50 flex items-center justify-center">
                <div className="flex items-center">
                  <Spinner aria-label="Spinner button example" size="lg" />
                  <span className="pl-3 text-2xl">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          {/* Buttons */}
          <div className="flex justify-end space-x-3 items-center">
            <Button
              gradientDuoTone="greenToBlue"
              outline
              onClick={requestProduct}
              disabled={loading}
            >
              Create Request
            </Button>
            {error && (
              <span className="text-red-400 font-medium text-sm">{error}</span>
            )}
            {success && (
              <span className="text-green-400 font-medium text-sm">{success}</span>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
