import React, { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const API_BASE_URL = process.env.API_BASE_URL;

const RequestProduct = ({ show, close }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getFilteredProducts`,
        {
          params: { searchTerm },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectProduct = (product) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setQuantity({ ...quantity, [product.id]: 1 });
    }
  };

  const handleQuantityChange = (productId, qty) => {
    setQuantity({ ...quantity, [productId]: qty });
  };

  const handleCancel = () => {
    close();
    setSelectedProducts([]);
    setQuantity({});
  };

  const handleCreateRequest = () => {
    // Handle the logic to create the request (send data to API, etc.)
    console.log("Selected Products", selectedProducts);
    console.log("Quantities", quantity);
    close();
  };

  return (
    <Modal show={show} onClose={close}>
      <Modal.Header>Request Product</Modal.Header>
      <Modal.Body>
        <div className="relative w-full mb-4">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Search Product by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 p-2 border rounded-lg border-gray-300 w-full"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">
                  <Button
                    gradientDuoTone="greenToBlue"
                    onClick={() => handleSelectProduct(product)}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-4 mb-2 text-lg font-semibold">Selected Products</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={quantity[product.id]}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    className="p-2 border rounded-lg border-gray-300"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <Button
                    gradientDuoTone="redToPink"
                    onClick={() =>
                      setSelectedProducts(
                        selectedProducts.filter((p) => p.id !== product.id)
                      )
                    }
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button gradientDuoTone="purpleToBlue" onClick={handleCreateRequest}>
          Create Request
        </Button>
        <Button gradientDuoTone="pinkToOrange" outline onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestProduct;
