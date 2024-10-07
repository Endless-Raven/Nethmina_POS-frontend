import React from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Billing from "./Billing";
import Inventory from "./Inventory";
import DailyReport from "./DailyReport";
import AdminPanel from "./AdminPanel";
import NotFoundPage from "./NotFoundPage";

export default function Home() {

  const { section } = useParams(); // Destructure to get the section (or whatever your route parameter is named)

  return (
    <div>
      <NavigationBar />
      {section === "billing" ? (
        <Billing />
      ) : section === "inventory" ? (
        <Inventory />
      ) : section === "daily_report" ? (
        <DailyReport />
      ) : section === "admin_panel" ? (
        <AdminPanel />
      ) : (
        <NotFoundPage/>
      )}
    </div>
  );
}
