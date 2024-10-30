import React, { useEffect, useState } from "react";
import { Modal, Select } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";
import { useDelete, useUpdateWithData } from "../../services/api";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function EditeShopAdmin({ show, onClose, shop}) {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({
    store_id: 1,
    store_name: "",
    store_address: "",
    store_phone_number: 1234567890,
  });

  useEffect(() => {
    setShopData(shop);
  }, [shop]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setShopData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { data, error, loading, fetchData } = useUpdateWithData();
  const { data1, error1, loading1, deleteData } = useDelete();
  const [showToast, setShowToast] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetchData("stores/updateStore", shopData);
    if (error) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  };

  const handeDelete = async () => {
    await deleteData(`stores/deleteStore/${shopData.store_id}`);
    if (!error1) {
      setOpenModal(false);
      navigate(0);
    } else {
      setOpenModal(false);
      onClose();
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
                <Label htmlFor="store_id" value="Store Id" />
              </div>
              <TextInput
                id="store_id"
                type="text"
                readOnly
                value={shopData.store_id}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="store_name" value="Store Name" />
              </div>
              <TextInput
                id="store_name"
                type="text"
                required
                value={shopData.store_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="store_address" value="Store Address" />
              </div>
              <TextInput
                id="store_address"
                type="text"
                required
                value={shopData.store_address}
                onChange={handleChange} // Add onChange handler
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="store_phone_number" value="Store Phone Number" />
              </div>
              <TextInput
                id="store_phone_number"
                type="text"
                required
                value={shopData.store_phone_number}
                onChange={handleChange} // Add onChange handler
              />
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
              Are you sure you want to remove this Shop?
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
