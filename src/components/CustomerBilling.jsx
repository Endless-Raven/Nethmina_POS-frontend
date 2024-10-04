import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CustomerBilling({ customer, setCustomer }) {
  const [openModal, setOpenModal] = useState(false);
  const [modelData, setModelData] = useState("something went wrong");

  const handleCustomerChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (customer.customer_number.length !== 10) {
        setModelData("fill 10 numbers");
        setOpenModal(true);
      } else if (isNaN(Number(customer.customer_number))) {
        setModelData("enter valid number");
        setOpenModal(true);
      } else {
        // handle search and set customer data if avialable
        console.log("searching");
      }
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setCustomer({
      customer_number: "",
      customer_name: "",
      customer_address: "",
    });
  };

  return (
    <div className="border-2 bg-white p-2 rounded-md mb-4">
      <form
        className="flex max-w-md mx-auto flex-col gap-4"
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   if (!(/^[A-Za-z\s]+$/.test(customer.customer_name))){
        //     setModelData("enter valid name");
        //     setOpenModal(true);
        //   }
        //   // handle save
        // }}
      >
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="contact" value="Customer Contact" />
          <TextInput
            id="contact"
            name="customer_number"
            onChange={handleCustomerChange}
            value={customer.customer_number}
            type="text"
            sizing={"sm"}
            className="w-56"
            placeholder="0762223339"
            onKeyDown={handleKeyPress}
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="name" value="Customer Name" />
          <TextInput
            sizing={"sm"}
            id="name"
            name="customer_name"
            onChange={handleCustomerChange}
            value={customer.customer_name}
            type="text"
            className="w-56"
            placeholder="W. Saman Kumara"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="address" value="Customer Address" />
          <Textarea
            id="comment"
            name="customer_address"
            onChange={handleCustomerChange}
            value={customer.customer_address}
            className="w-56"
            placeholder="marawila,haputhale"
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            size={"sm"}
            type="reset"
            outline
            gradientDuoTone="pinkToOrange"
            onClick={handleReset}
          >
            Clear
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
              {modelData}
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
