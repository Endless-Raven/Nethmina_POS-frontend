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

export default function AddEmpAdmin({ show, onClose, shops }) {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    role: "cashier",
    phone: "",
    store_id: 1,
    password: "",
  });
  const { data, error, loading, postData } = usePost();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name) {
      newErrors.full_name = "Full name is required";
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.store_id) {
      newErrors.store_id = "Store must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      postData(`users`, formData);
      setFormData({
        full_name: "",
        username: "",
        role: "cashier",
        phone: "",
        store_id: 1,
        password: "",
      });
      setErrors({});
    }
  };

  return (
    <div>
      <Modal show={show} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add new Employee
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="full_name" value="Full Name" />
              </div>
              <TextInput
                id="full_name"
                placeholder="W.S.K.Saman Kumara"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm">{errors.full_name}</p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="text"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <TextInput
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <Select
                id="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="cashier">Cashier</option>
                <option value="manager">Manager</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="store_id" value="Store" />
              </div>
              <Select
                id="store_id"
                value={formData.store_id}
                onChange={handleChange}
                required
              >
                {shops &&
                  shops.length > 0 &&
                  shops.map((shop, index) => (
                    <option value={shop.store_id} key={index}>
                      {shop.store_name}
                    </option>
                  ))}
              </Select>
              {errors.store_id && (
                <p className="text-red-500 text-sm">{errors.store_id}</p>
              )}
            </div>
            <div className="w-full flex items-center gap-4">
              {!loading ? (
                <Button onClick={handleSubmit} color="blue">
                  Add Employee
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
