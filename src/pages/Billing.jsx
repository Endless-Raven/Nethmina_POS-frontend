import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import TableBilling from "../components/TableBilling";
import ProductBilling from "../components/ProductBilling";
import CustomerBilling from "../components/CustomerBilling";

export default function Billing() {

  const [orderedList, setOrderedList] = useState([]);
  const [salesmans, setSalesmans] = useState([
    "saman kumara",
    "sanath nishantha",
  ]);


  // about product Data
  const [product, setProduct] = useState({
    product_id: "",
    product_name: "",
    serial_number: "",
    price: "",
    quantity: "",
    discount: 0.00,
    warranty_period: "",
  });
  const addProduct = () => {
    setOrderedList(prevData => [...prevData, product]);
  }  

  const [customer, setCustomer] = useState({
    customer_number: "",
    customer_name: "",
    customer_address: "",
  });
  const [salesman, setSalesman] = useState("");
  const [total, setTotal] = useState(0);

  const handleReset = () => {
    setOrderedList([]);
    setProduct({
      product_id: "",
      product_name: "",
      serial_number: "",
      price: "",
      quantity: "",
      discount: 0.00,
      warranty_period: "",
    });
    setCustomer({
      customer_number: "",
      customer_name: "",
      customer_address: "",
    });
    setTotal(0);
    setSalesman("");
  };

  const handleDone = (e) => {
    e.preventDefault();
  };

  const handlePrint = (e) => {
    e.preventDefault();
  };

  console.log(orderedList);

  return (
    <div className="flex w-full">
      {/* sidebar */}
      <div className="w-[30%] p-2 min-h-screen">
        {/* customer data */}
        <CustomerBilling customer={customer} setCustomer={setCustomer} />
        {/* product data */}
        <ProductBilling product={product} setProduct={setProduct} addProduct={addProduct}/>
      </div>
      {/* main content */}
      <div className="w-[70%] border-l-4 p-2 min-h-screen relative">
        {/* table */}
        <TableBilling orderedList={orderedList} />
        {/* form */}
        <div className="absolute bottom-4 z-10 w-[calc(100%-2rem)] border-2 p-4 rounded-md bg-white">
          <div className="flex justify-between items-center gap-8 flex-col md:flex-row">
            <div className="flex gap-4 items-center justify-between">
              <Label htmlFor="salesman" value="Salesman" />
              <Select
                id="salesman"
                className="w-64"
                onChange={(e) => {
                  setSalesman(e.target.value);
                }}
                required
              >
                <option value="">Select</option>
                {salesmans.map((man, index) => (
                  <option key={index} value={man}>
                    {man}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex gap-4 items-center justify-end mb-4">
              <Label htmlFor="total" value="Total Price" />
              <TextInput
                value={total}
                readOnly
                id="total"
                type="number"
                className="w-64"
                placeholder="30000"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="reset"
              outline
              gradientDuoTone="pinkToOrange"
              onClick={handleReset}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleDone}
              gradientDuoTone="cyanToBlue"
            >
              Done
            </Button>
            <Button
              type="submit"
              onClick={handlePrint}
              gradientDuoTone="purpleToBlue"
            >
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
