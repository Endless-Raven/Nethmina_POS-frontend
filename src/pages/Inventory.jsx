import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    qty: "",
    wholesalePrice: "",
    retailPrice: "",
  });
  const [editIndex, setEditIndex] = useState(null); // Track item to edit
  const [selectedStore, setSelectedStore] = useState("All");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      wholesalePrice: "",
      retailPrice: "",
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

  return (
    <div className="p-4">
      <h1 className="text-3xl text-cyan-950 font-bold mb-4">Inventory</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/2 mx-auto">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Search Item"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 p-2 border rounded-lg border-gray-300 w-full"
          />
        </div>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="p-2 border rounded-lg bg-cyan-800 text-white"
        >
          <option value="All">All</option>
          <option value="store 1">store 1</option>
          <option value="store 2">store 2</option>
          <option value="store 3">store 3</option>
        </select>
      </div>
      <table className="w-full border bg-gray-100">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Brand</th>
            <th className="border border-gray-300 p-2">Qty</th>
            <th className="border border-gray-300 p-2">Wholesale Price</th>
            <th className="border border-gray-300 p-2">Retail Price</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr
              key={item.no}
              className={item.qty < 20 ? "bg-red-200" : "bg-green-200"}
            >
              <td className="border border-gray-300 p-2">{item.no}</td>
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.brand}</td>
              <td className="border border-gray-300 p-2">{item.qty}</td>
              <td className="border border-gray-300 p-2">
                {item.wholesalePrice}
              </td>
              <td className="border border-gray-300 p-2">{item.retailPrice}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditItem(index)}
                  className="mr-2 p-1 border rounded-lg border-sky-600 bg-sky-600 text-white hover:bg-gray-400  hover:text-black transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="p-1 border rounded-lg border-red-800 text-red-600 hover:bg-red-800 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 p-2 rounded-md bg-slate-400 text-neutral-300 hover:bg-cyan-900  hover:text-white transition-colors"
      >
        Add Item
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl mb-4">
              {editIndex !== null ? "Edit Item" : "Add Item"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="p-2 border border-gray-300 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Brand"
              value={newItem.brand}
              onChange={(e) =>
                setNewItem({ ...newItem, brand: e.target.value })
              }
              className="p-2 border border-gray-300 mb-2 w-full"
            />
            <input
              type="number"
              min={0}
              placeholder="Qty"
              value={newItem.qty}
              onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
              className="p-2 border border-gray-300 mb-2 w-full"
            />
            <input
              type="number"
              min={0}
              placeholder="Wholesale Price"
              value={newItem.wholesalePrice}
              onChange={(e) =>
                setNewItem({ ...newItem, wholesalePrice: e.target.value })
              }
              className="p-2 border border-gray-300 mb-2 w-full"
            />
            <input
              type="number"
              min={0}
              placeholder="Retail Price"
              value={newItem.retailPrice}
              onChange={(e) =>
                setNewItem({ ...newItem, retailPrice: e.target.value })
              }
              className="p-2 border border-gray-300 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditIndex(null);
                }}
                className="p-2 border rounded-md bg-gray-500 text-white mr-2 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="p-2 border rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-colors"
              >
                {editIndex !== null ? "Save Changes" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
