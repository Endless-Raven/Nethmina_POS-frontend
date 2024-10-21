import React from "react";
import TopSellingPieAdmin from "../components/admin/TopSellingPieAdmin";

export default function Dashboard() {
  const dashboardData = {
    sales: {
      monthly_sales: 18500,
      monthly_profit: 3500,
      daily_sales: 13500,
      daily_profit: 3500,
    },
    top_sales: [
      {
        name: "samsung s2",
        percentage: "13",
      },
      {
        name: "samsung s20",
        percentage: "20",
      },
      {
        name: "samsung s21",
        percentage: "25",
      },
      {
        name: "samsung s24",
        percentage: "25",
      },
      {
        name: "samsung s25",
        percentage: "20",
      },
    ],
    last_month_sales: [
      {
        date: "2024/10/7",
        sale: 1020,
      },
      {
        date: "2024/10/8",
        sale: 1100,
      },
      {
        date: "2024/10/9",
        sale: 900,
      },
      // Add up to 30 days as needed
    ],
    low_stock: [
      {
        product_name: "google 6",
        product_type: "mobile phone",
        stock_quantity: 4,
      },
      {
        product_name: "google 4",
        product_type: "mobile phone",
        stock_quantity: 9,
      },
      {
        product_name: "google 3",
        product_type: "mobile phone",
        stock_quantity: 2,
      },
    ],
    pending_transfers: [
      {
        transfer_to: "kandy",
        date: "2024/12/10",
      },
      {
        transfer_to: "galle",
        date: "2024/12/10",
      },
    ],
  };

  return (
    <div className="mt-16 cursor-default">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between gap-4 mb-4 items-center h-[41vh]">
          <div className="flex-1 p-3 bg-cyan-200 rounded-md shadow-md h-full">
            <p className="text-xl font-semibold text-cyan-700 mb-4">
              Sales Overview
            </p>
            <div className="grid grid-cols-2 gap-4 h-[80%] text-lg text-white font-bold drop-shadow-md">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-2">Monthly Sales</p>
                  <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1">
                    {dashboardData.sales.monthly_sales || "0"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-2">Monthly Profit</p>
                  <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1">
                    {dashboardData.sales.daily_profit || "0"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-2">Daily Sales</p>
                  <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1">
                    {dashboardData.sales.daily_sales || "0"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="mb-2">Daily Profit</p>
                  <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1">
                    {dashboardData.sales.daily_profit || "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden p-3 bg-blue-200 rounded-md shadow-md h-full">
          
              <TopSellingPieAdmin pieData={dashboardData.top_sales}/>
           
          </div>
        </div>
        <div className="flex justify-between gap-4 items-center h-[41vh]">
          <div className="flex-1 p-3 bg-sky-200 rounded-md shadow-md h-full">
            <p className="text-xl font-semibold text-sky-700">Low Stock</p>
          </div>
          <div className="w-[50%] p-3 bg-teal-200 rounded-md shadow-md h-full">
            <p className="text-xl font-semibold text-teal-700">
              Sales Statistics
            </p>
          </div>
          <div className="flex-1 p-3 bg-indigo-200 rounded-md shadow-md h-full">
            <p className="text-xl font-semibold text-indigo-700">
              Pending Transfers
            </p>
          </div>
        </div>
      </div>
    </div>
    // mama oyata kamathi .oya mata kamthida.adrei mn.ummmmmmmmmmma.
  );
}
