import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ProductBilling({ product, setProduct, addProduct }) {
  
  const categories = [
    "Mobile Phones",
    "Screen Protectors",
    "Smartwatches",
    "Power Banks",
    "Chargers & Cables",
    "Speakers",
    "Earphones & Headphones",
    "Phone Cases",
    "Wi-Fi Routers",
    "Tablets",
  ];

  const brands = [
    "Samsung",
    "Apple",
    "Huawei",
    "Xiaomi",
    "OnePlus",
    "Google",
    "Nokia",
    "Sony",
    "Oppo",
    "Vivo",
  ];

  const models = [
    {
      product_id: 1,
      product_name: "Samsung Galaxy S10",
      price: 130000,
      warranty_period: "1 year",
    },
    {
      product_id: 2,
      product_name: "iPhone 13",
      price: 250000,
      warranty_period: "1 year",
    },
    {
      product_id: 3,
      product_name: "Google Pixel 6",
      price: 180000,
      warranty_period: "2 years",
    },
    {
      product_id: 4,
      product_name: "OnePlus 9 Pro",
      price: 150000,
      warranty_period: "1.5 years",
    },
    {
      product_id: 5,
      product_name: "Xiaomi Mi 11",
      price: 120000,
      warranty_period: "1 year",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(""); // State for selected model ID
  const [openModal, setOpenModal] = useState(false);

  // Handle changes for product fields
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for model selection
  const handleChangeProduct = (e) => {
    const selected = e.target.value;
    setSelectedModelId(selected); // Update the selected model ID

    if (selected) {
      const model = models.find(
        (model) => model.product_id === Number(selected)
      );
      if (model) {
        setProduct({
          product_id: model.product_id,
          product_name: model.product_name,
          serial_number: "",
          price: model.price,
          quantity: 1,
          discount: 0.0,
          warranty_period: model.warranty_period,
        });
      }
    } else {
      resetProduct(); // Reset product if no model is selected
    }
  };

  // Function to reset product data
  const resetProduct = () => {
    setProduct({
      product_id: "",
      product_name: "",
      serial_number: "",
      price: "",
      quantity: "",
      discount: "",
      warranty_period: "",
    });
    setSelectedModelId(""); // Reset selected model ID
  };

  // Handle form submission
  const handleAdd = (e) => {
    if (product.serial_number && product.serial_number.length === 15) {
      e.preventDefault();
      // Validate product data before adding
      addProduct();
      resetProduct(); // Reset product and selections after adding
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div className="">
      <form className="mx-auto p-2 flex max-w-md flex-col gap-2">
        {/* Product Type Selection */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="type" value="Product Type" />
          <Select
            id="type"
            sizing={"sm"}
            className="w-64"
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>

        {/* Brand Selection */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="brand" value="Brand Name" />
          <Select
            id="brand"
            sizing={"sm"}
            className="w-64"
            required
            disabled={selectedCategory===""}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </div>

        {/* Product Selection */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="product" value="Product Name" />
          <Select
            id="product"
            sizing={"sm"}
            className="w-64"
            required
            disabled={selectedBrand===""}
            value={selectedModelId} // Bind selected model ID to the value of the dropdown
            onChange={handleChangeProduct}
          >
            <option value="">Select</option>
            {models.map((model, index) => (
              <option key={index} value={model.product_id}>
                {model.product_name}
              </option>
            ))}
          </Select>
        </div>

        {/* Serial Number */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="serial" value="Serial Number" />
          <TextInput
            sizing={"sm"}
            value={product.serial_number}
            onChange={handleProductChange}
            name="serial_number"
            min={0}
            id="serial"
            type="number"
            className="w-64"
            placeholder="350123451234560"
            required
          />
        </div>

        {/* Unit Price (Read Only) */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="price" value="Unit Price" />
          <TextInput
            sizing={"sm"}
            value={product.price}
            name="price"
            id="price"
            type="number"
            className="w-64"
            placeholder="10000.00"
            readOnly
          />
        </div>

        {/* Number of Units */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="quantity" value="No of Units" />
          <TextInput
            sizing={"sm"}
            id="quantity"
            type="number"
            min={1}
            onChange={handleProductChange}
            name="quantity"
            className="w-64"
            placeholder="3"
            value={product.quantity}
            required
          />
        </div>

        {/* Discount */}
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="discount" value="Discount" />
          <TextInput
            sizing={"sm"}
            id="discount"
            name="discount"
            onChange={handleProductChange}
            type="number"
            min={0}
            className="w-64"
            placeholder="500.00"
            value={product.discount}
          />
        </div>

        {/* Total Price */}
        <div className="flex gap-4 items-center justify-between mb-3">
          <Label htmlFor="total" value="Total Price" />
          <TextInput
            sizing={"sm"}
            id="total"
            value={
              (Number(product.price) || 0) * (Number(product.quantity) || 1) -
              (Number(product.discount) || 0)
            }
            type="number"
            className="w-64"
            placeholder="30000"
            readOnly
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            type="reset"
            size={"sm"}
            outline
            gradientDuoTone="pinkToOrange"
            onClick={resetProduct} // Use resetProduct function for clarity
          >
            Clear
          </Button>
          <Button
            type="submit"
            onClick={handleAdd}
            size={"sm"}
            gradientDuoTone="purpleToBlue"
          >
            Add Product
          </Button>
        </div>
      </form>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Something wrong with product data
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
