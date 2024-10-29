import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import UpcommingStockInv from "../components/UpcommingStockInv";
import RequestProduct from "../components/RequestProduct";
import { InventoryTable } from "../components/InventoryTable";
import InventoryPendingRequest from "../components/InventoryPendingRequest";

const Inventory = () => {
  
  const [productTypes, setProductTypes] = useState([
    "Mobile Accessory",
    "Mobile Phone",
    "Wearable",
    "Electronics",
    "mobile_phone",
  ]);
  const [brands, setBrands] = useState(["Sony", "Generic"]);
  const products = [
    {
      product_id: 3,
      product_name: "Samsung Galaxy A21s",
      product_price: "50000.00",
      warranty_period: "1",
      created_at: "2024-10-10T04:21:06.000Z",
      updated_at: "2024-10-27T09:58:57.000Z",
      product_stock: "7.00",
      product_type: "Mobile Phone",
      brand_name: "Samsung",
      product_model: "A21s",
      product_wholesale_price: "0.00",
      imei_numbers: "123456789012345,987654321098765",
      imei_number: [
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
        "182734659900876",
        "888776954345695",
        "445623456886954",
        "754456758844321",
      ],
    },
    {
      product_id: 16,
      product_name: "Samsung s5",
      product_price: "7000.00",
      warranty_period: null,
      created_at: "2024-10-11T13:17:52.000Z",
      updated_at: "2024-10-11T13:18:21.000Z",
      product_stock: "400.00",
      product_type: "Mobile Phone",
      brand_name: "Samsung",
      product_model: "s5",
      product_wholesale_price: "2500.00",
      imei_numbers: null,
      imei_number: ["111225469887532", "232233223456765", "122234500978654"],
    },
    {
      product_id: 37,
      product_name: "test 16",
      product_price: "100.00",
      warranty_period: null,
      created_at: "2024-10-16T11:09:05.000Z",
      updated_at: "2024-10-26T08:35:48.000Z",
      product_stock: "12.00",
      product_type: "Mobile Phone",
      brand_name: "Samsung",
      product_model: "",
      product_wholesale_price: "11.00",
      imei_numbers: null,
      imei_number: [],
    },
    {
      product_id: 39,
      product_name: "test 18",
      product_price: "1000.00",
      warranty_period: "",
      created_at: "2024-10-18T04:39:42.000Z",
      updated_at: "2024-10-18T04:39:42.000Z",
      product_stock: "1000.00",
      product_type: "Mobile Phone",
      brand_name: "Samsung",
      product_model: "A21s",
      product_wholesale_price: "1800.00",
      imei_numbers: null,
      imei_number: [],
    },
  ];

  const [filterdProducts, setFilterdProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [openModalUpcomming, setOpenModalUpcomming] = useState(false);
  const [openModalRequest, setOpenModalRequest] = useState(false);
  const [openModalPending, setOpenModalPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  


  useEffect(() => {
    if (productTypes && productTypes.length > 0) {
      setSelectedType(productTypes[0]);
    }
    if (products && products.length > 0) {
      setFilterdProducts(products);
    }
  }, []);

  return (
    <div className="p-6 bg-slate-100 min-h-[88vh]">
      {/* Search Bar and Selectors */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <TextInput
            icon={CiSearch}
            placeholder="Search Item"
            className="w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
          />

          {/* Category Selector */}
          <Select
            value={selectedType}
            className="w-1/4"
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            {productTypes.map((product, index) => (
              <option value={product} key={index}>
                {product}
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
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Checkbox and Paragraph */}
      <div className="mb-6 flex items-center gap-2">
        <Checkbox
          id="low-stock"
          onChange={(e) => {
            if (e.target.checked) {
              setFilterdProducts(
                products.filter((p) => parseFloat(p.product_stock) < 10)
              );
            } else {
              setFilterdProducts(products);
            }
          }}
        />
        <Label htmlFor="low-stock" className="cursor-pointer">
          Show only low stock items
        </Label>
      </div>
      
      {/* Stock table */}
      <InventoryTable productList={filterdProducts} />

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
          <Button
            gradientDuoTone="greenToBlue"
            outline
            onClick={() => setOpenModalPending(true)}
          >
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
      <InventoryPendingRequest
        show={openModalPending}
        close={() => setOpenModalPending(false)}
      />
    </div>
  );
};

export default Inventory;
