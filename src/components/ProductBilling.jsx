import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";

export default function ProductBilling({ product, setProduct }) {
  const [category, setCategory] = useState([
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
  ]);
  const [brands, setBrands] = useState([
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
  ]);
  const [models, setModels] = useState([
    "Samsung Galaxy S10",
    "iPhone 13",
    "Google Pixel 6",
    "OnePlus 9 Pro",
    "Xiaomi Mi 11",
    "Sony Xperia 5 II",
    "Huawei P40 Pro",
    "Oppo Find X3 Pro",
    "Samsung Galaxy Z Fold 3",
    "iPhone 12 Mini",
    "Asus ROG Phone 5",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const handleProductChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setProduct({
      name: "",
      serial_number: "",
      unit_price: "",
      quantity: "",
      discount: "",
    });
  };

  return (
    <div className="">
      <form className="mx-auto p-2 flex max-w-md flex-col gap-2">
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="type" value="Product Type" />
          <Select
            id="type"
            sizing={"sm"}
            className="w-64"
            required
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="">Select</option>
            {category.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="brand" value="Brand Name" />
          <Select
            id="brand"
            sizing={"sm"}
            className="w-64"
            required
            onChange={(e) => {
              setSelectedBrand(e.target.value);
            }}
          >
            <option value="">Select</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="product" value="Product Name" />
          <Select
            id="product"
            sizing={"sm"}
            className="w-64"
            required
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setProduct((prev) => ({
                ...prev,
                ["name"]: e.target.value,
              }));
            }}
          >
            <option value="">Select</option>
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </div>
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
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="price" value="Unit Price" />
          <TextInput
            sizing={"sm"}
            value={product.unit_price}
            name="unit_price"
            onChange={handleProductChange}
            min={1}
            id="price"
            type="number"
            className="w-64"
            placeholder="10000.00"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="units" value="No of Units" />
          <TextInput
            sizing={"sm"}
            id="units"
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
            placeholder="5%"
            value={product.discount}
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between mb-3">
          <Label htmlFor="total" value="Total Price" />
          <TextInput
            sizing={"sm"}
            id="total"
            value={product.unit_price * product.quantity - product.discount}
            type="number"
            className="w-64"
            placeholder="30000"
            readOnly
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            size={"sm"}
            outline
            gradientDuoTone="pinkToOrange"
            onClick={handleReset}
          >
            Clear
          </Button>
          <Button type="submit" size={"sm"} gradientDuoTone="purpleToBlue">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
}
