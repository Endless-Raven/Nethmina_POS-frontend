import React from "react";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import TableBilling from "../components/TableBilling";
import ProductBilling from "../components/ProductBilling";
import CustomerBilling from "../components/CustomerBilling";

export default function Billing() {
  return (
    <div className="flex w-full">
      {/* sidebar */}
      <div className="w-[30%] p-4 min-h-screen">
        <CustomerBilling/>
        <div className="">
          <ProductBilling/>
        </div>
      </div>
      {/* main content */}
      <div className="w-[70%] border-l-4 p-4 min-h-screen">
        <TableBilling />
        <form className="mt-10 flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
