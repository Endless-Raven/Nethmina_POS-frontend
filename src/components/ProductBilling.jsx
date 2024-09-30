import React from "react";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";

export default function ProductBilling() {
  return (
    <div>
      <form className="p-4 flex max-w-md flex-col gap-2">
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="type" value="Product Type" />
          <Select id="type" className="w-64" required>
            <option>Select</option>
            <option>Mobile Phone</option>
            <option>Battery</option>
            <option>Temperd</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="brand" value="Brand Name" />
          <Select id="brand" className="w-64" required>
            <option>Select</option>
            <option>Samsung</option>
            <option>Nokia</option>
            <option>Huawei</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="product" value="Product Name" />
          <Select id="product" className="w-64" required>
            <option>Select</option>
            <option>samsung galaxy s10</option>
            <option>samsung galaxy s20</option>
            <option>samsung galaxy s21</option>
            <option>samsung galaxy s22</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="serial" value="Serial Number" />
          <TextInput
            id="serial"
            type="text"
            className="w-64"
            placeholder="350123451234560"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="price" value="Unit Price" />
          <TextInput
            id="price"
            type="number"
            className="w-64"
            placeholder="10000.00"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="units" value="No of Units" />
          <TextInput
            id="units"
            type="number"
            className="w-64"
            placeholder="3"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="discount" value="Discount" />
          <TextInput
            id="discount"
            type="number"
            className="w-64"
            placeholder="5%"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between mb-4">
          <Label htmlFor="total" value="Total Price" />
          <TextInput
            id="total"
            type="number"
            className="w-64"
            placeholder="30000"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="submit" outline gradientDuoTone="pinkToOrange">Clear</Button>
          <Button type="submit" gradientDuoTone="purpleToBlue">Add Product</Button>
        </div>
      </form>
    </div>
  );
}
