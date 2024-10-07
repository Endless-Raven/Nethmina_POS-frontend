import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

const Inventory = () => {
  const [items, setItems] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const [showAccessoriesModal, setShowAccessoriesModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    qty: "",
    category: "",
    wholesalePrice: "",
    retailPrice: "",
    store: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedcategory, setSelectedcategory] = useState("All");
  // const [selectedAccessories, setSelectedAccessories] = useState([]);

  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setprodcuts] = useState([]);
  // const[loading,setLoding]=useState(true);
  // const[error,setError]=useState(null);

  useEffect(() => {
    fetchCategoris();
    fetchStores();
    fetchBrands();
    fetchproductdata();
  }, []);

  useEffect(() => {
    fetchBrands();
    fetchproductdata();
  }, [selectedcategory]);

  useEffect(() => {
    fetchproductdata();
  }, [selectedBrand]);

  useEffect(() => {
    fetchproductdata();
  }, [searchTerm]);

  useEffect(() => {
    fetchproductdata();
  }, [selectedStore]);

  // async function fetchproductdata() {
  //   // let params = {};

  //   // if (searchTerm) {
  //   //   params.product_name = searchTerm;
  //   // }
  //   // if (selectedStore) {
  //   //   params.store_name = selectedStore;
  //   // }
  //   // if (selectedBrand) {
  //   //   params.brand_name = selectedBrand;
  //   // }
  //   // if (selectedcategory) {
  //   //   params.product_type = selectedcategory;
  //   // }

  //   try {
  //     const response = await axios.get(
  //       `${API_BASE_URL}/product/getFiltered/ProductDetails`,
  //       {
  //         product_name: searchTerm,
  //         store_name: selectedStore,
  //         brand_name: selectedBrand,
  //         product_type: selectedcategory,
  //       }
  //     );
  //     console.log("response.data", response.data);
  //     console.log(
  //       "req.data",
  //       searchTerm,
  //       selectedStore,
  //       selectedBrand,
  //       selectedcategory
  //     );
  //     // Save the response data in an array or object
  //     // setprodcuts(response.data); // Assuming you are storing the final data in a state
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function fetchproductdata() {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/getFiltered/ProductDetails`,
        {
          product_name: searchTerm,
          store_name: selectedStore,
          brand_name: selectedBrand,
          product_type: selectedcategory,
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchStores() {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/getstore/names`);
      console.log("response.data", response.data);
      setStores(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCategoris() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/product/getProductTypes/get`
      );
      console.log("responseeee", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // async function fetchBrands() {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/product/getFilteredProductDetails/get`,{
  //       product_type:newItem.category
  //     });
  //     console.log("response12345",response);
  //    // setBrands(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function fetchBrands() {
    try {
      console.log("sjds");
      const response = await axios.get(
        `${API_BASE_URL}/product/brands/byproducttype`,
        {
          params: { product_type: selectedcategory }, // Correctly sending the product type
        }
      );
      console.log("Brands response:", response.data);
      setBrands(response.data); // Uncommented this line to set brands
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const filteredItems = items.filter(
  //   (item) =>
  //     (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     (selectedStore === "All" || item.store === selectedStore) &&
  //     (selectedBrand === "All" || item.brand === selectedBrand)
  // );

  const filteredItems = items.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStore === "All" || item.store === selectedStore) &&
      (selectedBrand === "All" || item.brand === selectedBrand)
  );

  const handleAddItem = () => {
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = { ...newItem, no: editIndex + 1 };
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, { ...newItem, no: items.length + 1 }]);
    }

    setShowModal(false);
    setNewItem({
      name: "",
      brand: "",
      qty: "",
      category: "",
      wholesalePrice: "",
      retailPrice: "",
      store: "",
    });
  };

  const handleEditItem = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleShowAccessories = (index) => {
    // setSelectedAccessories(items[index].accessories);
    // setShowAccessoriesModal(true);
  };

  return (
    <div className="p-6 bg-slate-100 min-h-[88vh]">
      <div className="flex justify-between items-center mb-4 gap-3">
        <div className="relative w-1/2 mx-auto">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Search Item by Name or Brand"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="pl-10 p-2 border rounded-lg border-gray-300 w-full"
          />
        </div>
        <select
          value={selectedStore}
          onChange={(e) => {
            setSelectedStore(e.target.value);
          }}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="All">All Stores</option>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
        <select
          value={selectedcategory}
          onChange={async (e) => {
            setSelectedcategory(e.target.value);
          }}
          className="p-2 border rounded-lg bg-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
          }}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="All">All Brands</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full  bg-slate-50">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Brand</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Qty</th>
            <th className="border border-gray-300 p-2">Wholesale Price</th>
            <th className="border border-gray-300 p-2">Retail Price</th>
            <th className="border border-gray-300 p-2">Store</th>
            <th className="border border-gray-300 p-2 hidden">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr
              key={item.no}
              className={
                item.stock_quantity < 20 ? "bg-red-200" : "bg-green-200"
              }
            >
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td
              // className="border border-gray-300 p-2 cursor-pointer text-blue-600 underline"
              // onClick={() => handleShowAccessories(index)}
              >
                {item.product_name}
              </td>
              <td className="border border-gray-300 p-2">{item.brand_name}</td>
              <td className="border border-gray-300 p-2">
                {item.product_type}
              </td>
              <td className="border border-gray-300 p-2">
                {item.stock_quantity}
              </td>
              <td className="border border-gray-300 p-2">
                {item.product_wholesale_price}
              </td>
              <td className="border border-gray-300 p-2">
                {item.product_price}
              </td>
              <td className="border border-gray-300 p-2">{item.store_name}</td>
              <td className="border border-gray-300 p-2 flex gap-1 hiddenz">
                <Button
                  onClick={() => handleEditItem(index)}
                  gradientDuoTone="purpleToBlue"
                  size={"xs"}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteItem(index)}
                  outline
                  size={"xs"}
                  gradientDuoTone="pinkToOrange"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className="mt-3 hidden"
        onClick={() => setShowModal(true)}
        size={"sm"}
        gradientDuoTone="purpleToBlue"
      >
        {editIndex !== null ? "Update Item" : "Add Item"}
      </Button>

      {/* Add/Edit Item Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          {editIndex !== null ? "Edit Item" : "Add Item"}
        </Modal.Header>
        <Modal.Body>
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
            <Label htmlFor="brand" value="Brand" />
            <TextInput
              id="brand"
              value={newItem.brand}
              onChange={(e) =>
                setNewItem({ ...newItem, brand: e.target.value })
              }
              required
            />
            <Label htmlFor="qty" value="Quantity" />
            <TextInput
              type="number"
              id="qty"
              value={newItem.qty}
              onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
              required
            />
            <Label htmlFor="wholesalePrice" value="Wholesale Price" />
            <TextInput
              type="number"
              id="wholesalePrice"
              value={newItem.wholesalePrice}
              onChange={(e) =>
                setNewItem({ ...newItem, wholesalePrice: e.target.value })
              }
              required
            />
            <Label htmlFor="retailPrice" value="Retail Price" />
            <TextInput
              type="number"
              id="retailPrice"
              value={newItem.retailPrice}
              onChange={(e) =>
                setNewItem({ ...newItem, retailPrice: e.target.value })
              }
              required
            />
            <Label htmlFor="store" value="Store" />
            <select
              id="store"
              value={newItem.store}
              onChange={(e) =>
                setNewItem({ ...newItem, store: e.target.value })
              }
              className="mt-4 border border-gray-300 bg-gray-100 rounded-lg p-2  "
            >
              {stores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShowModal(false)}
            outline
            size={"sm"}
            gradientDuoTone="pinkToOrange"
          >
            Cancel
          </Button>

          <Button
            onClick={handleAddItem}
            outline
            size={"sm"}
            gradientDuoTone="purpleToBlue"
          >
            {editIndex !== null ? "Update Item" : "Add Item"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Accessories Modal 
      <Modal
        show={showAccessoriesModal}
        onClose={() => setShowAccessoriesModal(false)}
      >
        <Modal.Header>Accessories</Modal.Header>
        <Modal.Body>
          <ul>
            {selectedAccessories.map((accessory) => (
              <li key={accessory.name}>
                {accessory.name}: ${accessory.price}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowAccessoriesModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default Inventory;
