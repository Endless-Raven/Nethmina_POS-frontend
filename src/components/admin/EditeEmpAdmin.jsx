import React, { useState } from "react";
import { Modal, Select } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";

export default function EditeEmpAdmin({ show, onClose, emp, shops }) {
  const [employee, setEmployee] = useState(emp);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({
      ...prev, // Correct spreading of the previous state
      [id]: value,
    }));
  };
  const handleStoreChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      store_id: e.target.value, // Update the store_id value
    }));
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Edit Employee</Modal.Header>
      <Modal.Body>
        <form className="flex max-w-md mx-auto flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="user_id" value="Emp Id" />
            </div>
            <TextInput
              id="user_id"
              type="text"
              readOnly
              value={employee.user_id}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Name" />
            </div>
            <TextInput
              id="username"
              type="text"
              required
              value={employee.username}
              onChange={handleChange} // Add onChange handler
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Position" />
            </div>
            <TextInput
              id="role"
              type="text"
              required
              value={employee.role}
              onChange={handleChange} // Add onChange handler
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Mobile Number" />
            </div>
            <TextInput
              id="phone"
              type="text"
              required
              value={employee.phone}
              onChange={handleChange} // Add onChange handler
            />
          </div>
          <div className="my-2 block">
            <Label htmlFor="store" value="Store" />
            <Select
              id="store"
              value={employee.store_id}
              onChange={handleStoreChange} // Add onChange handler for store
              required
            >
              {shops.map((shop, index) => (
                <option value={shop.store_id} key={index}>
                  {shop.store_name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex gap-3 w-full my-3">
            <Button color="gray" className="flex-grow" onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue" className="flex-grow">
              Update
            </Button>
            <Button color="failure" className="flex-grow">
              Delete
            </Button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
