import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Select,
  Modal,
  Spinner,
} from "flowbite-react";
import TableBilling from "../components/TableBilling";
import ProductBilling from "../components/ProductBilling";
import CustomerBilling from "../components/CustomerBilling";
import { Toast } from "flowbite-react";
import { MdPrint } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useReactToPrint } from "react-to-print";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";
import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

export default function Billing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoiceId, setInvoiceId] = useState("");
  const [showToastDone, setShowToastDone] = useState(false);
  const [showToastPrint, setShowToastPrint] = useState(false);
  const userData = useSelector((state) => state.user.data);
  const [print, setPrint] = useState(false);

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
  const [salesmans, setSalesmans] = useState([]);
  useEffect(() => {
    fetchCashiers();
  }, []);
  const fetchCashiers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cashiers/cashiers`, {
        params: {
          store_id: userData.store_id,
        },
      });
      setSalesmans(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [salesman, setSalesman] = useState("");
  const [salesmanId, setSalesmanId] = useState("");

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
    // const { warranty_period, ...productWithoutWarranty } = product;
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
  };

  // done button function
  const handleDone = async (e) => {
    e.preventDefault();
    if (validate()) {
      setError(null);
      setLoading(true);
      const requestBody = {
        cashier_id: salesmanId,
        sales_person: salesman,
        total_amount: total,
        products: orderedList,
        user: userData.user_id,
        customer_details: {
          customer_name: customer.customer_name,
          customer_phone_number: customer.customer_number,
          customer_address: customer.customer_address,
        },
      };
      try {
        const response = await axios.post(`${API_BASE_URL}/sales`, requestBody);
        setInvoiceId(response.data.sales_id);
        setShowToastDone(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error(error);
      } finally {
        handleReset();
      }
    } else {
      setOpenModal(true);
    }
  };

  // print button function
  const handlePrint = async (e) => {
    e.preventDefault();
    if (validate()) {
      setError(null);
      setLoading(true);
      const requestBody = {
        cashier_id: salesmanId,
        sales_person: salesman,
        total_amount: total,
        products: orderedList,
        user: userData.user_id,
        customer_details: {
          customer_name: customer.customer_name,
          customer_phone_number: customer.customer_number,
          customer_address: customer.customer_address,
        },
      };
      try {
        const response = await axios.post(`${API_BASE_URL}/sales`, requestBody);
        setInvoiceId(response.data.sales_id);
        setPrint(true);
        setShowToastPrint(true);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.error(error);
        setLoading(false);
      }
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (invoiceId && print) {
      try {
        printFn();
      } catch (error) {
        console.log(error);
      } finally {
        setPrint(false);
        setInvoiceId(null);
        handleReset();
      }
    }
  }, [invoiceId, print]);

  // validate all forms
  const validate = () => {
    // Check if any customer details are empty
    if (
      customer.customer_number === "" ||
      customer.customer_number.length !== 10 ||
      customer.customer_name === "" ||
      !/^[A-Za-z\s]+$/.test(customer.customer_name) // Check if customer_name contains only alphabetic characters
    ) {
      return false; // If any detail is empty or invalid, return false
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

  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Bill",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });



  return (
    <div className="flex w-full relative bg-slate-100">
      {/* sidebar */}
      <div className="w-[30%] p-2 ">
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
      <div className="w-[70%] border-l-4 p-2 min-h-[90vh] relative">
        {/* table */}
        <TableBilling setTotal={setTotal} orderedList={orderedList} setOrderedList={setOrderedList}/>
        {/* form */}
        <div className="absolute bottom-4 z-10 w-[calc(100%-1rem)] border-2 p-4 rounded-md bg-white">
          <div className="flex justify-between items-center gap-8 flex-col md:flex-row">
            <div className="flex gap-4 items-center justify-between">
              <Label htmlFor="salesman" value="Salesman" />
              <Select
                id="salesman"
                className="w-64"
                onChange={(e) => {
                  setSalesman(e.target.value);
                  setSalesmanId(
                    salesmans.find((c) => c.cashier_name === e.target.value)
                      .cashier_id
                  );
                }}
                required
              >
                <option value="">Select</option>
                {salesmans.map((man, index) => (
                  <option key={index} value={man.cashier_name}>
                    {man.cashier_name}
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
            {error && <p className="text-red-600">{error}</p>}
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    aria-label="Alternate spinner button example"
                    size="sm"
                  />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                <>Done</>
              )}
            </Button>
            <Button
              type="submit"
              onClick={handlePrint}
              gradientDuoTone="purpleToBlue"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    aria-label="Alternate spinner button example"
                    size="sm"
                  />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                <>Print</>
              )}
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

      {/* display error when didnt complete all data  */}
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

      {/* Bill */}
      <div className="hidden">
        <div ref={componentRef} className="p-3 pr-6 border-4">
          <div className="bg-white flex flex-col gap-1 px-3 py-1 ">
            <div className="flex justify-between items-end ">
              <div className="text-xs">
                <h1 className="text-2xl font-bold">Nethmina Cellular</h1>
                <div className="flex gap-3">
                  <h4>
                    No 9, First floor,
                    <br /> MC Plaza, Kurunegala <br />
                    TP : 071 642 7418
                  </h4>
                  <div className="border-r-2 border-slate-500"></div>
                  <h4>
                    Hospital Junction,
                    <br /> Polonnaruwa (Infront of KFC) <br />
                    TP : 070 480 4800
                  </h4>
                </div>
              </div>
              <div className="text-xs">
                <div className="flex gap-4">
                  <p className="font-medium mr-1">Invoice Id </p>
                  <p>: {invoiceId}</p>
                </div>
                <div className="flex gap-4">
                  <p className="font-medium">Date </p>
                  <p className="ml-8">: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4">
                  <p className="font-medium">Time </p>
                  <p className="ml-8">: {new Date().toLocaleTimeString()}</p>
                </div>
                <div className="flex gap-4">
                  <p className="font-medium">Salesman </p>
                  <p className="ml-2">: {salesman}</p>
                </div>
              </div>
            </div>
            <hr class="border-gray-400 border-t-2 w-full" />
            <div className="w-full flex gap-4 text-xs">
              <p>
                Customer <span>: {customer.customer_name}</span>
              </p>
              <p>
                Mobile <span>: {customer.customer_number}</span>
              </p>
              <p>
                Address <span>: {customer.customer_address}</span>
              </p>
            </div>
            <hr class="border-gray-400 border-t-2 w-full" />
            <div className="overflow-x-auto">
              <Table>
                <Table.Head className="">
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell className="text-xs py-0">Product name</Table.HeadCell>
                  <Table.HeadCell className="text-xs py-0">Price</Table.HeadCell>
                  <Table.HeadCell className="text-xs py-0">Qty</Table.HeadCell>
                  <Table.HeadCell className="text-xs py-0">warranty</Table.HeadCell>
                  <Table.HeadCell className="text-xs py-0">Discount</Table.HeadCell>
                  <Table.HeadCell className="text-xs py-0">Total</Table.HeadCell>
                </Table.Head>
                <Table.Body className="">
                  {orderedList.map((product, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 font-medium text-black text-sm"
                    >
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell className="text-xs py-0">
                        {product.product_name}
                        <br />
                        {product.serial_number && (
                          <span className="font-semibold">
                            code : {product.serial_number}
                          </span>
                        )}
                      </Table.Cell>
                      <Table.Cell className="text-xs py-0">{product.price}</Table.Cell>
                      <Table.Cell className="text-xs py-0">{product.quantity}</Table.Cell>
                      <Table.Cell className="text-xs py-0">{product.warranty_period}</Table.Cell>
                      <Table.Cell className="text-xs py-0">
                        {Number(product.discount).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell className="text-xs py-0">
                        {(
                          Number(product.price) * Number(product.quantity) -
                          Number(product.discount)
                        ).toFixed(2)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="flex justify-end">
              <p className="font-semibold mr-4 text-sm">Total : {total.toFixed(2)}</p>
            </div>
            <div className="w-full flex gap-4 justify-between items-end text-xs">
              <div>
                <p className="italic">
                  {" "}
                  <strong>Note</strong> Goods Sold are Non Refundable /
                  Not Exchangeable.{" "}
                </p>
                <p className="underline font-medium">
                  Warranty does not Apply.
                </p>
                <ul className="pl-4 list-disc">
                  <li>
                    To damages caused by Accident / Abuse / Misuse / Flood
                  </li>
                  <li>To consumable Parts such as Batteries</li>
                  <li>To Cosmetic Damages (Scratches / Dents)</li>
                  <li>Display, Touch and No Power</li>
                  {/* <li>Modification of Software and Hardware.</li> */}
                </ul>
              </div>
              <div>
                <p>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </p>
                <p>Customer Signature</p>
                <p className="text-xs whitespace-nowrap">Goods Recived in good condition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
