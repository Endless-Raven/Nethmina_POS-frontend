import React, { useState } from "react";
import { Button, Modal, Label, Select, TextInput } from "flowbite-react";
import PendingRequestList from "../components/admin_inventory/PendingRequestList";
import { ProductTable } from "../components/admin_inventory/ProductTable";

function ShareStockAdminInventory() {
  const samplePending = [
    {
      from: "bgd",
      time: "23.55",
      date: "25/10/24",
      products: [
        {
          category: "greer",
          brand: "fwrg",
          product: "asggg",
          qty: "45",
        },
        {
          category: "greer",
          brand: "fwrg",
          product: "asggg",
          qty: "45",
        },
      ],
    },
    {
      from: "mjkyli7u",
      time: "23.55",
      date: "25/10/24",
      products: [
        {
          category: "greer",
          brand: "fwrg",
          product: "asggg",
          qty: "45",
        },
      ],
    },
  ];
  
  const [toShop, setToShop] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelTransfer, setCancelTransfer] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    shopName: "",
    category: "",
    brand: "",
    product: "",
    qty: "1",
    imeiNumbers: [],
  });

  // Open modal
  const openModal = () => setModalOpen(true);

  // Close modal
  const closeModal = () => setModalOpen(false);

  // Handle adding item with validation
  const handleAddItem = () => {
    if (!newItem.product) {
      alert("Please enter a product name.");
      return; // Prevent adding item if no product name is entered
    }
    
    setItems([...items, newItem]); // Add new item to items list
    setModalOpen(false); // Close modal after adding
    setNewItem({
      shopName: "",
      category: "",
      brand: "",
      product: "",
      qty: "1",
      imeiNumbers: [],
    }); // Reset form
  };

  return (
    <div className="share-stock-container  p-5 min-h-screen max-w-5xl mx-auto">
      {/* Pending Request List */}
      <PendingRequestList data={samplePending} />

      {/* From Input - Top Left Corner */}
      <div className="absolute left-9 mt-2">
        <Label htmlFor="fromShop">From:</Label>
        <TextInput id="fromShop" value={"Admin"} readOnly />
      </div>

      {/* Dropdown - Top Right Corner */}
      <div className="absolute right-9 mt-2 ">
        <div className="">
          <Label htmlFor="Shops">To:</Label>
        </div>
        <Select id="Shops" required={true}>
          <option value="Kurunegala">Kurunegala</option>
          <option value="Kandy">Kandy</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
        </Select>
      </div>

      {/* Add Item Button */}
      <div className="text-center mt-36 mx-1 ">
        <Button gradientDuoTone="purpleToBlue" onClick={openModal}>
          Add Item
        </Button>
      </div>

      {/* Modal for Adding Items */}
      <Modal show={modalOpen} onClose={closeModal}>
  <Modal.Header>Add Item</Modal.Header>
  <Modal.Body>
    <div className="space-y-4">
      {/* Shop Name Selector */}
      <Label htmlFor="shopName">Shop Name</Label>
      <Select
        id="shopName"
        value={newItem.shopName}
        onChange={(e) =>
          setNewItem({ ...newItem, shopName: e.target.value })
        }
      >
        <option value="">Select Shop Name</option>
        <option value="Kandy">Kandy</option>
        <option value="Polonnaruwa">Polonnaruwa</option>
      </Select>

      {/* Show Category Selector after selecting Shop */}
      {newItem.shopName && (
        <>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="mobile phone">Mobile Phone</option>
            <option value="mobile accessories">Mobile Accessories</option>
          </Select>
        </>
      )}

      {/* Show Brand Selector after selecting Category */}
      {newItem.category && (
        <>
          <Label htmlFor="brand">Brand</Label>
          <Select
            id="brand"
            value={newItem.brand}
            onChange={(e) =>
              setNewItem({ ...newItem, brand: e.target.value })
            }
          >
            <option value="">Select Brand</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
          </Select>
        </>
      )}

      {/* Show Product Selector after selecting Brand */}
      {newItem.brand && (
        <>
          <Label htmlFor="product">Product</Label>
          <Select
            id="product"
            value={newItem.product}
            onChange={(e) =>
              setNewItem({ ...newItem, product: e.target.value })
            }
          >
            <option value="">Select Product</option>
            <option value="iPhone 12">iPhone 12</option>
            <option value="Samsung Galaxy A21s">
              Samsung Galaxy A21s
            </option>
          </Select>
        </>
      )}

      {/* Quantity Input */}
      {newItem.product && (
        <>
          <Label htmlFor="qty">Quantity</Label>
          <TextInput
            id="qty"
            type="number"
            min={1}
            value={newItem.qty}
            onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
          />

          {/* IMEI Numbers if Category is Mobile Phone */}
          {newItem.category === "mobile phone" && (
            <>
              <Label>IMEI Numbers</Label>
              {[...Array(Number(newItem.qty))].map((_, index) => (
                <TextInput
                  key={index}
                  type="text"
                  placeholder={`IMEI ${index + 1}`}
                  onChange={(e) => {
                    const imeiNumbers = [...newItem.imeiNumbers];
                    imeiNumbers[index] = e.target.value;
                    setNewItem({ ...newItem, imeiNumbers });
                  }}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  </Modal.Body>

  <Modal.Footer>
    <Button gradientDuoTone="pinkToOrange" onClick={closeModal}>
      Cancel
    </Button>
    <Button gradientDuoTone="purpleToBlue" onClick={handleAddItem}>
      Add Item
    </Button>
  </Modal.Footer>
</Modal>


      {/* ProductTable to display added items */}
      <div className="mt-10">
        <ProductTable items={items} />{" "}
        {/* Pass items as a prop to ProductTable */}
      </div>

      {/* Transfer Button */}
      <div className="text-center mt-10  flex justify-end gap-2 ">
        <Button gradientDuoTone="pinkToOrange" onClick={cancelTransfer}>
          Cancel
        </Button>
        <Button gradientDuoTone="purpleToBlue">Transfer</Button>
      </div>
    </div>
  );
}

export default ShareStockAdminInventory;
