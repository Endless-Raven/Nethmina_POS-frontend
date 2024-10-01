import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export default function CustomerBilling({ customer, setCustomer }) {
  const handleCustomerChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomerNumberChange = (e) => {
    let number = e.target.value;
    setCustomer((prev) => ({
      ...prev,
      ["customer_number"]: e.target.value,
    }));
    // search for data
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
      <form className="flex max-w-md mx-auto flex-col gap-4">
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="contact" value="Customer Contact" />
          <TextInput
            id="contact"
            name="customer_number"
            onChange={handleCustomerNumberChange}
            value={customer.customer_number}
            type="number"
            sizing={"sm"}
            className="w-56"
            placeholder="0762223339"
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
            required
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
          <Button size={"sm"} type="submit" gradientDuoTone="purpleToBlue">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
