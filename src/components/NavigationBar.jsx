import { Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import { signOut } from "../redux/features/userSlice";
import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

export default function NavigationBar() {
  const userData = useSelector((state) => state.user.data); // store_id
  const [store, setStore] = useState("shop");
  const [active, setActive] = useState("billing");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/login");
  };

  useEffect(() => {
    getStoreName();
  }, []);

  async function getStoreName() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stores/getstorename/${userData.store_id}`
      );
      setStore(response.data.store_name);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand onClick={() => navigate("/")} className="cursor-pointer">
        <h1 className="font-bold text-2xl text-cyan-500">
          Nethmina <span className="text-sky-600">Mobile</span>
        </h1>
      </Navbar.Brand>

      <div className="flex md:order-2 gap-4 items-center">
        {userData.store_id && (
          <p className="text-blue-800 font-bold cursor-default">{store}</p>
        )}
        <Button gradientDuoTone="purpleToBlue" onClick={handleLogout}>
          {userData.store_id ? <span>Logout</span> : <span>Login</span>}
        </Button>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          active={active === "billing"}
          className="cursor-pointer"
          onClick={() => {
            setActive("billing");
            navigate("/home/billing");
          }}
        >
          Billing
        </Navbar.Link>
        <Navbar.Link
          active={active === "inventory"}
          className={`cursor-pointer ${
            userData.role === "cashier" && "hidden"
          }`}
          onClick={() => {
            setActive("inventory");
            navigate("/home/inventory");
          }}
        >
          Inventory
        </Navbar.Link>
        <Navbar.Link
          active={active === "product"}
          className={`cursor-pointer ${
            userData.role === "cashier" && "hidden"
          }`}
          onClick={() => {
            setActive("product");
            navigate("/home/product");
          }}
        >
          Product
        </Navbar.Link>
        <Navbar.Link
          active={active === "ShareStockAdminInventory"}
          className={`cursor-pointer ${
            userData.role === "cashier" && "hidden"
          }`}
          onClick={() => {
            setActive("ShareStockAdminInventory");
            navigate("/home/ShareStockAdminInventory");
          }}
        >
          Shere Stock
        </Navbar.Link>
        <Navbar.Link
          active={active === "ManagerFinance"}
          className={`cursor-pointer ${
            userData.role === "cashier" && "hidden"
          }`}
          onClick={() => {
            setActive("ManagerFinance");
            navigate("/home/ManagerFinance");
          }}
        >
          Finance
        </Navbar.Link>
        <Navbar.Link
          active={active === "daily report"}
          className={`cursor-pointer ${
            (userData.role === "cashier" || userData.role === "manager") &&
            "hidden"
          }`}
          onClick={() => {
            setActive("daily report");
            navigate("/home/daily_report");
          }}
        >
          Daily Report
        </Navbar.Link>
        <Navbar.Link
          active={active === "admin panel"}
          className={`cursor-pointer ${
            (userData.role === "cashier" || userData.role === "manager") &&
            "hidden"
          }`}
          onClick={() => {
            setActive("admin panel");
            navigate("/adminpanel/dashboard");
          }}
        >
          Admin Panel
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
