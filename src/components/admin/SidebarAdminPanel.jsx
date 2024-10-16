import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineStock } from "react-icons/ai";
import { RiGpsLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaShop } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { TbReportMoney } from "react-icons/tb";

export default function SidebarAdminPanel() {
  const { pathname } = useLocation();

  const routes = [
    { href: "dashboard", icon: HiChartPie, label: "Dashboard" },
    { href: "product", icon: AiFillProduct, label: "Product" },
    { href: "inventory", icon: AiOutlineStock, label: "Inventory" },
    { href: "track_phone", icon: RiGpsLine, label: "Track Phone" },
    { href: "daily_report", icon: TbReportMoney, label: "Daily Sales" },
    {
      href: "monthly_report",
      icon: HiOutlineDocumentReport,
      label: "Monthly Report",
    },
    { href: "manage_shops", icon: FaShop, label: "Manage Shops" },
    { href: "finance", icon: GiReceiveMoney, label: "Finance" },
  ];

  return (
    <Sidebar aria-label="Default sidebar example" className="shadow-md">
      <Sidebar.Items className="min-h-[95vh]">
        <Sidebar.ItemGroup>
          {routes.map((route) => (
            <Sidebar.Item
              key={route.href}
              href={route.href}
              icon={route.icon}
              active={pathname === `/adminpanel/${route.href}`}
            >
              {route.label}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
