import React, { useState } from "react";
import { Button, Modal, Label, Select, TextInput } from "flowbite-react";
import PendingRequestList from "../components/admin_inventory/PendingRequestList";
import { ProductTable } from "../components/admin_inventory/ProductTable";

function ShareStockAdminInventory() {
  const shopsAndCategories = {
    shops: ["kurunegal", "kandy", "polonnaruwa"],
    product_types: ["mobile phone", "mobile accessories", "spekaers"],
  };

  const brands = ["apple", "samsung", "google"];

  const products = [
    {
      product_id: 1,
      product_name: "iPhone 12",
      stock_quantity: 34,
    },
    {
      product_id: 2,
      product_name: "Samsung Galaxy S21",
      stock_quantity: 50,
    },
    {
      product_id: 3,
      product_name: "Google Pixel 6",
      stock_quantity: 25,
    },
    {
      product_id: 4,
      product_name: "OnePlus 9",
      stock_quantity: 40,
    },
    {
      product_id: 5,
      product_name: "Xiaomi Mi 11",
      stock_quantity: 60,
    },
    {
      product_id: 6,
      product_name: "Sony Xperia 5",
      stock_quantity: 15,
    },
  ];

  const openModal = () => setModalOpen(true);

  const [newItem, setNewItem] = useState({
    shopName: "",
    category: "",
    brand: "",
    product: "",
    qty: "1",
    imeiNumbers: [],
  });

  console.log(newItem);

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

  // Handle adding item with validation
  const handleAddItem = () => {
    if (!newItem.product) {
      alert("Please enter a product name.");
      return; // Prevent adding item if no product name is entered
    }

    // Validate IMEI numbers if the category is mobile phone
    if (newItem.category === "mobile phone") {
      const imeiNumbersFilled =
        newItem.imeiNumbers.length === Number(newItem.qty) &&
        newItem.imeiNumbers.every((imei) => imei.trim() !== "");

      if (!imeiNumbersFilled) {
        alert("Please enter all required IMEI numbers.");
        return; // Prevent adding item if IMEI numbers are not fully filled
      }
    }

    // Add new item to items list
    setItems([...items, newItem]);

    // Close modal after adding
    setModalOpen(false);

    // Reset form
    setNewItem({
      shopName: "",
      category: "",
      brand: "",
      product: "",
      qty: "1",
      imeiNumbers: [],
    });
  };

  return (
    <div className="share-stock-container p-5 min-h-screen max-w-5xl mx-auto">
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
        <Select
          id="Shops"
          required={true}
          value={toShop}
          onChange={(e) => setToShop(e.target.value)}
        >
          <option value="">Select Shop</option>
          {shopsAndCategories.shops.map((shop, index) => (
            <option key={index} value={shop}>
              {shop}
            </option>
          ))}
        </Select>
      </div>

      {/* Add Item Button */}
      <div className="text-center mt-36 mx-1 ">
        <Button gradientDuoTone="purpleToBlue" onClick={openModal}>
          Add Item
        </Button>
      </div>

      {/* Modal for Adding Items */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Add Item</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            {/* Show Category Selector after selecting Shop */}
            {toShop && (
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {shopsAndCategories.product_types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {/* Show Brand Selector after selecting Category */}
            {newItem.category && (
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select
                  id="brand"
                  value={newItem.brand}
                  onChange={(e) =>
                    setNewItem({ ...newItem, brand: e.target.value })
                  }
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {/* Show Product Selector after selecting Brand */}
            {newItem.brand && (
              <div>
                <Label htmlFor="product">Product</Label>
                <Select
                  id="product"
                  value={newItem.product}
                  onChange={(e) =>
                    setNewItem({ ...newItem, product: e.target.value })
                  }
                >
                  <option value="">Select Product</option>
                  {products.map((product, index) => (
                    <option key={index} value={product.product_name}>
                      {product.product_name}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {/* Quantity Input */}
            {newItem.product && (
              <div>
                <Label htmlFor="qty">Quantity</Label>
                <TextInput
                  id="qty"
                  type="number"
                  min={1}
                  value={newItem.qty}
                  onChange={(e) => {
                    const maxQty = products.filter(
                      (p) => p.product_name === newItem.product
                    )[0].stock_quantity;
                    if (e.target.value !== "") {
                      const inputQty = parseInt(e.target.value, 10);
                      if (inputQty <= maxQty) {
                        setNewItem({ ...newItem, qty: inputQty });
                      } else {
                        setNewItem({ ...newItem, qty: maxQty });
                      }
                    } else {
                      setNewItem({ ...newItem, qty: 1 });
                    }
                  }}
                />

                {/* IMEI Numbers if Category is Mobile Phone */}
                {newItem.category === "mobile phone" && (
                  <div className="mt-4">
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
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="left-96"
            gradientDuoTone="pinkToOrange"
            onClick={() => {
              setModalOpen(false);
              setNewItem({
                shopName: "",
                category: "",
                brand: "",
                product: "",
                qty: "1",
                imeiNumbers: [],
              });
            }}
          >
            Cancel
          </Button>
          <Button
            className="left-96"
            gradientDuoTone="purpleToBlue"
            onClick={handleAddItem}
          >
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
      <div className="text-center mt-10 flex justify-end gap-2 ">
        <Button gradientDuoTone="pinkToOrange" onClick={cancelTransfer}>
          Cancel
        </Button>
        <Button gradientDuoTone="purpleToBlue">Transfer</Button>
      </div>
    </div>
  );
}

export default ShareStockAdminInventory;
