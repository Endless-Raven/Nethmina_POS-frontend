import React from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  Textarea,
} from "flowbite-react";

export default function CustomerBilling() {
  return (
    <div className="border-2 bg-white p-4 rounded-md mb-8">
      <form className="flex max-w-md mx-auto flex-col gap-4">
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="contact" value="Customer Contact" />
          <TextInput
            id="contact"
            type="number"
            className="w-56"
            placeholder="0762223339"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Label htmlFor="name" value="Customer Name" />
          <TextInput
            id="name"
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
            className="w-56"
            placeholder="marawila,haputhale"
            required
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="submit" outline gradientDuoTone="pinkToOrange">
            Clear
          </Button>
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
