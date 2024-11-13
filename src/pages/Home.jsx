import React from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Billing from "./Billing";
import Inventory from "./Inventory";
import DailyReport from "./DailyReport";
import AdminPanel from "./AdminPanel";
import NotFoundPage from "./NotFoundPage";
import ManagerProduct from "./ManagerProduct";
import ShareStockAdminInventory from "./ShareStockManagerInventory";
import {
  PrivateRouteAdmin,
  PrivateRouteManager,
} from "../components/PrivateRoute";

export default function Home() {
  const { section } = useParams(); // Destructure to get the section (or whatever your route parameter is named)

  return (
    <div>
      <NavigationBar />
      {section === "billing" ? (
        <Billing />
      ) : section === "inventory" ? (
        <PrivateRouteManager>
          <Inventory />
        </PrivateRouteManager>
      ) : section === "product" ? (
        <PrivateRouteManager>
          <ManagerProduct />
        </PrivateRouteManager>
      ): section === "ShareStockAdminInventory" ? (
        <PrivateRouteManager>
          <ShareStockAdminInventory />
        </PrivateRouteManager>
      ): section === "daily_report" ? (
        <PrivateRouteAdmin>
          <DailyReport />
        </PrivateRouteAdmin>
      )  : (
        <NotFoundPage />
      )}
    </div>
  );
}
