import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import TableBilling from "../components/TableBilling";
import ProductBilling from "../components/ProductBilling";
import CustomerBilling from "../components/CustomerBilling";

export default function Billing() {

  const [orderedList, setOrderedList] = useState([
    {
      no: 1,
      name: "Apple iPhone 14 Pro",
      warranty: "1 year",
      unitPrice: 460000, // LKR
      noOfUnits: 1,
      discount:2000,
    },
    {
      no: 2,
      name: "Samsung Galaxy S23 Ultra",
      warranty: "1 year",
      unitPrice: 380000, // LKR
      noOfUnits: 1,
      discount:1000,
    },
    {
      no: 3,
      name: "OnePlus 11",
      warranty: "1 year",
      unitPrice: 270000, // LKR
      noOfUnits: 1,
      discount:3000,
    },
    {
      no: 4,
      name: "Google Pixel 7 Pro",
      warranty: "1 year",
      unitPrice: 320000, // LKR
      noOfUnits: 1,
      discount:500,
    },
    {
      no: 5,
      name: "Xiaomi 13 Pro",
      warranty: "1 year",
      unitPrice: 290000, // LKR
      noOfUnits: 1,
      discount:300,
    },
    {
      no: 6,
      name: "Huawei P50 Pro",
      warranty: "1 year",
      unitPrice: 340000, // LKR
      noOfUnits: 1,
      discount:700,
    },
  ]);
  const [salesmans,setSalesmans] = useState([""]);


  const [product,setProduct] = useState({
    name:"",
    serial_number:"",
    unit_price:"",
    quantity:"",
    discount:"",
  });
  const [customer,setCustomer] = useState({
    customer_number:"",
    customer_name:"",
    customer_address:"",
  });
  const [salesman,setSalesman]= useState("");

  console.log(customer);

  return (
    <div className="flex w-full">
      {/* sidebar */}
      <div className="w-[30%] p-2 min-h-screen">
        <CustomerBilling customer={customer} setCustomer={setCustomer} />
        <ProductBilling product={product} setProduct={setProduct}/>
      </div>
      {/* main content */}
      <div className="w-[70%] border-l-4 p-2 min-h-screen relative">
        <TableBilling orderedList={orderedList} />
        <div className="absolute bottom-4 z-10 w-[calc(100%-2rem)] border-2 p-4 rounded-md bg-white">
          <div className="flex justify-between items-center gap-8 flex-col md:flex-row">
            <div className="flex gap-4 items-center justify-between">
              <Label htmlFor="salesman" value="Salesman" />
              <Select id="salesman" className="w-64" required>
                <option>Select</option>
                <option>saman kumara</option>
                <option>sanath nishantha</option>
              </Select>
            </div>
            <div className="flex gap-4 items-center justify-end mb-4">
              <Label htmlFor="total" value="Total Price" />
              <TextInput
                id="total"
                type="number"
                className="w-64"
                placeholder="30000"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="submit" outline gradientDuoTone="pinkToOrange">
              Cancel
            </Button>
            <Button type="submit" gradientDuoTone="cyanToBlue">
              Done
            </Button>
            <Button type="submit" gradientDuoTone="purpleToBlue">
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
