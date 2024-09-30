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
        <CustomerBilling />
        <ProductBilling />
      </div>
      {/* main content */}
      <div className="w-[70%] border-l-4 p-4 min-h-screen">
        <TableBilling />
        <div className="border-2 p-4 rounded-md bg-white">
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
