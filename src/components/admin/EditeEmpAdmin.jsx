import React, { useEffect, useState } from "react";
import { Modal, Select } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";
import { useDelete, useUpdateWithData } from "../../services/api";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function EditeEmpAdmin({ show, onClose, emp, shops }) {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    user_id: 1,
    username: "samantha",
    role: "cashier",
    phone: 712341234,
    store_id: 2,
  });

  useEffect(() => {
    setEmployee(emp);
  }, [emp]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleStoreChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      store_id: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const { data, error, loading, fetchData } = useUpdateWithData();
  const { data1, error1, loading1, deleteData } = useDelete();
  const [showToast, setShowToast] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetchData("users/update_employee", employee);
    if (error) {
      setShowToast(true);
      navigate(0);
    } else {
      setShowToast(false);
    }
  };

  const handeDelete = async () => {
    await deleteData(`users/delete_employee/${employee.user_id}`);
    if (!error1) {
      setOpenModal(false);
    } else {
      setOpenModal(false);
      onClose();
      navigate(0);
    }
  };
  
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Edit Employee</Modal.Header>
      <Modal.Body>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
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
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Position" />
              </div>
              <Select
                id="role"
                value={employee.role}
                onChange={handleRoleChange} // Add onChange handler for store
                required
              >
                <option value="cashier">cashier</option>
                <option value="manager">manager</option>
              </Select>
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
              <Button color="blue" className="flex-grow" onClick={handleUpdate}>
                Update
              </Button>
              <Button
                color="failure"
                className="flex-grow"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Delete
              </Button>
            </div>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        {showToast && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Employee updated successfully.
            </div>
            <Toast.Toggle />
          </Toast>
        )}
        {error1 && <p>{error1}</p>}
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
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
              Are you sure you want to remove this employee?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handeDelete} disabled={loading1}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Modal>
  );
}
