import React from "react";
import { Tabs } from "flowbite-react";
import { SiCashapp } from "react-icons/si";
import Billing from "./Billing";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineStock } from "react-icons/ai";
import Inventory from "./Inventory";

export default function Home() {
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
      </Tabs>
      <div className="absolute top-2 right-4">
        <h1 className="font-bold text-2xl text-cyan-500 cursor-default">
          Nethmina <span className="text-sky-600">Mobile</span>{" "}
        </h1>
      </div>
    </div>
  );
}
