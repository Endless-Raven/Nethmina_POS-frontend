import React from "react";
import Dashboard from "./Dashboard";
import MonthlyReport from "./MonthlyReport";
import Product from "./Product";
import TrackPhone from "./TrackPhone";
import InventoryAdmin from "./InventoryAdmin";
import ManageShopsAndEmp from "./ManageShopsAndEmp";
import SidebarAdminPanel from "../components/admin/SidebarAdminPanel";
import { useParams } from "react-router-dom";
import Finance from "./Finance";
import DailyReport from "./DailyReport";

export default function AdminPanel() {
  const { section } = useParams();
  return (
    <div className="flex">
      <SidebarAdminPanel />
      <div className="m-3 relative shadow-md bg-slate-50 rounded-md flex-grow p-3 max-h-screen overflow-y-scroll">
        <p className="text-4xl font-bold absolute right-5 top-3 text-slate-500 uppercase cursor-default hover:drop-shadow-md">
          {section}
        </p>
        {section === "dashboard" ? (
          <Dashboard />
        ) : section === "product" ? (
          <Product />
        ) : section === "inventory" ? (
          <InventoryAdmin />
        ) : section === "track_phone" ? (
          <TrackPhone />
        ) : section === "monthly_report" ? (
          <MonthlyReport />
        ) : section === "daily_report" ? (
          <DailyReport />
        ) : section === "manage_shops" ? (
          <ManageShopsAndEmp />
        ) : section === "finance" ? (
          <Finance />
        ) : (
          <NotFoundPage />
        )}
      </div>
    </div>
  );
}
