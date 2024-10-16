import React, { useState } from 'react';
import { Button, Modal, Label, Select, TextInput } from 'flowbite-react';
import PendingRequestList from '../components/admin_inventory/PendingRequestList';
import { ProductTable } from '../components/admin_inventory/ProductTable';
function ShareStockAdminInventory() {
  const [fromShop, setFromShop] = useState('');
  const [toShop, setToShop] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    shopName: '',
    category: '',
    brand: '',
    product: '',
    qty: '1',
    imeiNumbers: []
  });

  // Open modal
  const openModal = () => setModalOpen(true);

  // Close modal
  const closeModal = () => setModalOpen(false);

  // Handle adding item
  const handleAddItem = () => {
    setItems([...items, newItem]); // Add new item to items list
    setModalOpen(false); // Close modal after adding
    setNewItem({ shopName: '', category: '', brand: '', product: '', qty: '1', imeiNumbers: [] }); // Reset form
  };

  return (
    <div className="share-stock-container relative p-5 min-h-screen max-w-5xl mx-auto">
      {/* Pending Request List */}
      <PendingRequestList />

      {/* From Input - Top Left Corner */}
      <div className="absolute left-12">
        <Label htmlFor="fromShop">From:</Label>
        <TextInput
          id="fromShop"
          value={fromShop}
          onChange={(e) => setFromShop(e.target.value)}
          placeholder="Select shop"
        />
      </div>

      {/* To Input - Top Right Corner */}
      <div className="absolute right-12">
        <Label htmlFor="toShop">To:</Label>
        <TextInput
          id="toShop"
          value={toShop}
          onChange={(e) => setToShop(e.target.value)}
          placeholder="Select shop"
        />
      </div>

      {/* Add Item Button */}
      <div className="text-center mt-52">
        <Button gradientDuoTone="purpleToBlue" onClick={openModal}>
          Add Item
        </Button>
      </div>

      {/* Modal for Adding Items */}
      <Modal show={modalOpen} onClose={closeModal}>
        <Modal.Header>Add Item</Modal.Header>
        <Modal.Body>
          <div className="space-y-1">
            <Label htmlFor="shopName">Shop Name</Label>
            <TextInput
              id="shopName"
              placeholder="Shop Name"
              value={newItem.shopName}
              onChange={(e) => setNewItem({ ...newItem, shopName: e.target.value })}
            />

            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="mobile phone">Mobile Phone</option>
              <option value="mobile accessories">Mobile Accessories</option>
            </Select>

            <Label htmlFor="brand">Brand</Label>
            <TextInput
              id="brand"
              placeholder="Brand"
              value={newItem.brand}
              onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
            />

            <Label htmlFor="product">Product</Label>
            <TextInput
              id="product"
              placeholder="Product"
              value={newItem.product}
              onChange={(e) => setNewItem({ ...newItem, product: e.target.value })}
            />

            <Label htmlFor="qty">Quantity</Label>
            <TextInput
              id="qty"
              min={0}
              type="number"
              value={newItem.qty}
              onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
            />

            {/* IMEI Numbers if Category is 'Phone' */}
            {newItem.category === 'mobile phone' && (
              <div>
                <Label>IMEI Numbers</Label>
                {[...Array(Number(newItem.qty))].map((_, index) => (
                  <TextInput
                    key={index}
                    type="text"
                    placeholder={`IMEI ${index + 1}`}
                    onChange={(e) => {
                      const imeis = [...newItem.imeiNumbers];
                      imeis[index] = e.target.value;
                      setNewItem({ ...newItem, imeiNumbers: imeis });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone="pinkToOrange" onClick={closeModal}>Cancel</Button>
          <Button gradientDuoTone="purpleToBlue" onClick={handleAddItem}>Add Item</Button>
        </Modal.Footer>
      </Modal>

      {/* ProductTable to display added items */}
      <div className="mt-10">
        <ProductTable items={items} /> {/* Pass items as a prop to ProductTable */}
      </div>

      {/* Transfer Button */}
      <div className="text-center mt-10  flex justify-end ">
        <Button gradientDuoTone="purpleToBlue">Transfer</Button>
      </div>
    </div>
  );
}

export default ShareStockAdminInventory;
