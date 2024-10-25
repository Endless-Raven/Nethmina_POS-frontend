import React from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import ItemAdminInventory from "../screens/ItemAdminInventory";
import ShareStockAdminInventory from "../screens/ShareStockAdminInventory";
import StatusAdminInventory from "../screens/StatusAdminInventory";

function InventoryAdmin() {
  return (
    <div>
      <Tabs aria-label="Tabs with icons" variant="underline">
        <Tabs.Item active title="item" icon={HiUserCircle}>
          <ItemAdminInventory />
        </Tabs.Item>
        <Tabs.Item title="share stock" icon={MdDashboard}>
          <ShareStockAdminInventory />
        </Tabs.Item>
        <Tabs.Item title="status" icon={HiAdjustments}>
          <StatusAdminInventory />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default InventoryAdmin;
