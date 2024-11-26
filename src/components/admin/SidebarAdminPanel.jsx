import React, { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiOutlineLogout } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineStock } from "react-icons/ai";
import { RiGpsLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaShop } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { TbReportMoney } from "react-icons/tb";
import { MdOutlineAssignmentReturn } from "react-icons/md";

const API_BASE_URL = process.env.API_BASE_URL;

export default function SidebarAdminPanel() {
  const { pathname } = useLocation();

  const [pendingCount, setPendingCount] = useState(0);

  // Fetch pending returns count
  useEffect(() => {
    const fetchPendingReturns = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/return/returns/pending-count`); // Replace with your API endpoint
        const data = await response.json();
        setPendingCount(data.count || 0); // Assume API returns { count: number }
      } catch (error) {
        console.error("Failed to fetch pending returns count:", error);
      }
    };

    fetchPendingReturns();
  }, []);

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
    {
      href: "AdminProductReturns",
      icon: MdOutlineAssignmentReturn,
      label: (
        <span className="flex items-center">
          Product Return
          {pendingCount > 0 && (
            <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {pendingCount}
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <Sidebar aria-label="Default sidebar example" className="shadow-md">
      <Sidebar.Items className="min-h-[95vh]">
        <Sidebar.ItemGroup>
          <Sidebar.Logo>
            <h1 className="font-bold text-2xl text-cyan-500">
              Nethmina <span className="text-sky-600">Mobile</span>
            </h1>
          </Sidebar.Logo>
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
          <Sidebar.Item href="/login" icon={HiOutlineLogout}>
            LOGOUT
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
