import React from "react";
import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { usePost } from "../../services/api";

export default function AddShopAdmin({ show, onClose, shops }) {
  const [formData, setFormData] = useState({
    store_name: "",
    store_address: "",
    store_phone_number: "",
  });
  const { data, error, loading, postData } = usePost();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.store_name) {
      newErrors.store_name = "store name is required";
    }
    if (!formData.store_address) {
      newErrors.store_address = "store address is required";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (
      !formData.store_phone_number ||
      !phoneRegex.test(formData.store_phone_number)
    ) {
      newErrors.store_phone_number =
        "Please enter a valid 10-digit phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await postData(`stores/`, formData);
        setFormData({
          store_name: "",
          store_address: "",
          store_phone_number: "",
        });
        setErrors({});
      } catch (err) {
        console.log("Error:", err); 
      }
    }
  };
  

  return (
    <div>
      <Modal show={show} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add new Shop
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="store_name" value="Name" />
              </div>
              <TextInput
                id="store_name"
                placeholder="Kurunegala"
                value={formData.store_name}
                onChange={handleChange}
                required
              />
              {errors.store_name && (
                <p className="text-red-500 text-sm">{errors.store_name}</p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="store_address" value="Address" />
              </div>
              <TextInput
                id="store_address"
                type="text"
                value={formData.store_address}
                onChange={handleChange}
                required
              />
              {errors.store_address && (
                <p className="text-red-500 text-sm">{errors.store_address}</p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="store_phone_number" value="Phone number" />
              </div>
              <TextInput
                id="store_phone_number"
                type="text"
                value={formData.store_phone_number}
                onChange={handleChange}
                required
              />
              {errors.store_phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.store_phone_number}
                </p>
              )}
            </div>
            <div className="w-full flex items-center gap-4">
              {!loading ? (
                <Button onClick={handleSubmit} color="blue">
                  Add Shop
                </Button>
              ) : (
                <Button color="gray">
                  <Spinner
                    aria-label="Alternate spinner button example"
                    size="sm"
                  />
                  <span className="pl-3">Loading...</span>
                </Button>
              )}
              {error && (
                <p className="text-red-500">
                  <span className="font-medium text-red-700">Oops!</span>{" "}
                  Something went wrong!
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
