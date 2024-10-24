import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import UpcommingStockInv from "../components/UpcommingStockInv";
import RequestProduct from "../components/RequestProduct";
import { InventoryTable } from "../components/InventoryTable";

const Inventory = () => {
  const productTypesAndCategories = [
    {
      product_types: "mobile phone",
      brand_names: ["samsung", "apple", "huawei", "oneplus", "google"],
    },
    {
      product_types: "mobile accessory",
      brand_names: ["anker", "belkin", "mi", "spigen", "jbl"],
    },
    {
      product_types: "laptop",
      brand_names: ["dell", "hp", "asus", "lenovo", "acer"],
    },
    {
      product_types: "tablet",
      brand_names: ["apple", "samsung", "lenovo", "microsoft", "huawei"],
    },
    {
      product_types: "smartwatch",
      brand_names: ["fitbit", "apple", "samsung", "garmin", "fossil"],
    },
  ];

  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    if (productTypesAndCategories && productTypesAndCategories.length > 0) {
      setSelectedType(productTypesAndCategories[0].product_types);
      setSelectedBrand(productTypesAndCategories[0].brand_names[0]);
    }
  }, []);

  const [openModalUpcomming, setOpenModalUpcomming] = useState(false);
  const [openModalRequest, setOpenModalRequest] = useState(false);

  console.log(selectedType);
  return (
    <div className="p-6 bg-slate-100 min-h-[88vh]">
      {/* Search Bar and  Selectors */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <TextInput
            icon={CiSearch}
            placeholder="Search Item"
            className="w-1/3"
          />

          {/* Category Selector */}
          <Select
            value={selectedType}
            className="w-1/4"
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            {productTypesAndCategories?.map((product, index) => (
              <option value={product.product_types} key={index}>
                {product.product_types}
              </option>
            ))}
          </Select>

          {/* Brand Selector */}
          <Select
            value={selectedBrand}
            className="w-1/4"
            onChange={(e) => {
              setSelectedBrand(e.target.value);
            }}
          >
            {productTypesAndCategories
              ?.find((product) => product.product_types === selectedType)
              ?.brand_names.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
          </Select>
        </div>
      </div>

      {/* Checkbox and Paragraph */}
      <div className="mb-6 flex items-center gap-2">
        <Checkbox id="low-stock" />
        <Label htmlFor="low-stock" className="cursor-pointer">
          Show only low stock items
        </Label>
      </div>

      {/* Stock table */}
      <InventoryTable />

      {/* Bottom Buttons */}
      <div className="flex justify-between fixed bottom-2 left-0 w-full px-6">
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          onClick={() => setOpenModalUpcomming(true)}
        >
          Upcoming Stocks
        </Button>
        <div className="flex gap-4">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={() => setOpenModalRequest(true)}
          >
            Request Product
          </Button>
          <Button gradientDuoTone="greenToBlue" outline>
            Pending Request
          </Button>
        </div>
      </div>

      {/* Modals */}
      <UpcommingStockInv
        show={openModalUpcomming}
        close={() => setOpenModalUpcomming(false)}
      />
      <RequestProduct
        show={openModalRequest}
        close={() => setOpenModalRequest(false)}
      />
    </div>
  );
};

export default Inventory;
