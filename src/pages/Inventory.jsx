import React, { useState } from 'react';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    brand: '',
    qty: '',
    wholesalePrice: '',
    retailPrice: '',
  });
  const [selectedStore, setSelectedStore] = useState('All');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    setItems([...items, { ...newItem, no: items.length + 1 }]);
    setShowModal(false);
    setNewItem({ name: '', brand: '', qty: '', wholesalePrice: '', retailPrice: '' });
  };

  const handleEditItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = newItem;
    setItems(updatedItems);
    setShowModal(false);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl   text-cyan-950 font-bold mb-4">Inventory</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Item"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-lg border-gray-300 w-1/2 mx-auto"
        />
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="p-2 border rounded-lg "
        >
          <option value="All">All</option>
          <option value="store 1">store 1</option>
          <option value="store 2">store 2</option>
          <option value="store 3">store 3</option>
        </select>
      </div>
      <table className="w-full border bg-slate-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 ">No</th>
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
            <tr key={item.no}>
              <td className="border border-gray-300 p-2">{item.no}</td>
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.brand}</td>
              <td className="border border-gray-300 p-2">{item.qty}</td>
              <td className="border border-gray-300 p-2">{item.wholesalePrice}</td>
              <td className="border border-gray-300 p-2">{item.retailPrice}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditItem(index)}
                  className="mr-2 p-1 border rounded-xl border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="p-1 border rounded-xl border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
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
        className="mt-4 p-2 rounded-md bg-cyan-950 text-neutral-300 hover:bg-slate-400  hover:text-cyan-950 transition-colors"
      >
        Add Item
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl mb-4">Add Item</h2>
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
              onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
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
              type=""
              placeholder="Wholesale Price"
              value={newItem.wholesalePrice}
              onChange={(e) => setNewItem({ ...newItem, wholesalePrice: e.target.value })}
              className="p-2 border border-gray-300 mb-2 w-full"
            />
            <input
              type=""
              placeholder="Retail Price"
              value={newItem.retailPrice}
              onChange={(e) => setNewItem({ ...newItem, retailPrice: e.target.value })}
              className="p-2 border border-gray-300 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-gray-500 text-white mr-2 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button onClick={handleAddItem} className="p-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors">
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
