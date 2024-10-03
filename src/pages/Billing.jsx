import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Select, Modal } from "flowbite-react";
import TableBilling from "../components/TableBilling";
import ProductBilling from "../components/ProductBilling";
import CustomerBilling from "../components/CustomerBilling";
import { Toast } from "flowbite-react";
import { MdPrint } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Billing() {
  // toast for done and print
  const [showToastDone, setShowToastDone] = useState(false);
  const [showToastPrint, setShowToastPrint] = useState(false);
  useEffect(() => {
    if (showToastPrint || showToastDone) {
      const timer = setTimeout(() => {
        setShowToastPrint(false);
        setShowToastDone(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToastDone, showToastPrint]);

  // for display validating error
  const [openModal, setOpenModal] = useState(false);

  // order list
  const [orderedList, setOrderedList] = useState([]);

  // salesman
  const [salesmans, setSalesmans] = useState([
    "saman kumara",
    "sanath nishantha",
  ]);
  const [salesman, setSalesman] = useState("");

  // about product Data
  const [product, setProduct] = useState({
    product_id: "",
    product_name: "",
    serial_number: "",
    price: "",
    quantity: "",
    discount: 0.0,
    warranty_period: "",
  });
  const addProduct = () => {
    setOrderedList((prevData) => [...prevData, product]);
  };

  // about customer data
  const [customer, setCustomer] = useState({
    customer_number: "",
    customer_name: "",
    customer_address: "",
  });

  // about total balance
  const [total, setTotal] = useState(0);

  // reset button function
  const handleReset = () => {
    setOrderedList([]);
    setProduct({
      product_id: "",
      product_name: "",
      serial_number: "",
      price: "",
      quantity: "",
      discount: 0.0,
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

  // done button function
  const handleDone = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowToastDone(true);
      handleReset();
    } else {
      setOpenModal(true);
    }
  };

  // print button function
  const handlePrint = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowToastPrint(true);
      handleReset();
    } else {
      setOpenModal(true);
    }
  };

  // validate all forms
  const validate = () => {
    // Check if any customer details are empty
    if (
      customer.customer_number === "" ||
      customer.customer_name === "" ||
      customer.customer_address === ""
    ) {
      return false; // If any detail is empty, return false
    }
    // Check if the ordered list is empty
    if (orderedList.length < 1) {
      return false; // If no orders, return false
    }
    // Check if salesman is empty
    if (salesman === "") {
      return false; // If salesman is not specified, return false
    }
    // If all checks pass, return true
    return true;
  };

  return (
    <div className="flex w-full relative">
      {/* sidebar */}
      <div className="w-[30%] p-2 min-h-screen">
        {/* customer data */}
        <CustomerBilling customer={customer} setCustomer={setCustomer} />
        {/* product data */}
        <ProductBilling
          product={product}
          setProduct={setProduct}
          addProduct={addProduct}
        />
      </div>

      {/* main content */}
      <div className="w-[70%] border-l-4 p-2 min-h-screen relative">
        {/* table */}
        <TableBilling setTotal={setTotal} orderedList={orderedList} />
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

      {/* toast message for adding bill ( done )  */}
      {showToastDone && (
        <Toast className="absolute top-2 right-2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <MdDone className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Order Confirmed successfully.
          </div>
          <Toast.Toggle onDismiss={() => setShowToastDone(false)} />
        </Toast>
      )}
      {/* toast message for adding bill ( print )  */}
      {showToastPrint && (
        <Toast className="absolute top-2 right-2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <MdPrint className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Order Confirmed successfully & Bill Printing
          </div>
          <Toast.Toggle onDismiss={() => setShowToastPrint(false)} />
        </Toast>
      )}

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
              Fill all data ( Customer, Product, Salesman )
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
