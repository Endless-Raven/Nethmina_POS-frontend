import React from "react";
import { Tabs,Tooltip } from "flowbite-react";
import { SiCashapp } from "react-icons/si";
import Billing from "./Billing";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineStock } from "react-icons/ai";
import Inventory from "./Inventory";
import { CiLogin } from "react-icons/ci";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/features/userSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/login");
  };

  return (
    <div className="">
      <Tabs aria-label="Default tabs" variant="underline" className="bg-white">
        <Tabs.Item active title="Billing" icon={SiCashapp}>
          <Billing />
        </Tabs.Item>
        <Tabs.Item active title="Inventory" icon={AiOutlineStock}>
          <Inventory />
        </Tabs.Item>
        <Tabs.Item disabled title="Admin Panel" icon={GrUserAdmin}>
          Disabled content
        </Tabs.Item>
        <Tabs.Item active title="Login" icon={CiLogin}>
          <Login />
        </Tabs.Item>
      </Tabs>
      <div className="absolute top-2 right-4">
      <Tooltip content="Click to Logout" style="dark">
        <h1
          className="font-bold text-2xl text-cyan-500 cursor-pointer"
          onClick={handleLogout}
        >
          Nethmina <span className="text-sky-600">Mobile</span>{" "}
        </h1>
        </Tooltip>
      </div>
    </div>
  );
}
