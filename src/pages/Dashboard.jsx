import React, { useEffect } from "react";
import TopSellingPieAdmin from "../components/admin/TopSellingPieAdmin";
import SalesStaticsChartAdmin from "../components/admin/SalesStaticsChartAdmin";
import { useGetWithoutQuery } from "../services/api";
import { Button, Spinner } from "flowbite-react";

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
        date: "10/7",
        sale: 1020,
      },
      {
        date: "10/8",
        sale: 1400,
      },
      {
        date: "10/9",
        sale: 1300,
      },
      {
        date: "10/10",
        sale: 1350,
      },
      {
        date: "10/11",
        sale: 1200,
      },
      {
        date: "10/12",
        sale: 1100,
      },
      {
        date: "10/13",
        sale: 1150,
      },
      {
        date: "10/14",
        sale: 1100,
      },
      {
        date: "10/15",
        sale: 1200,
      },
      {
        date: "10/16",
        sale: 1300,
      },
      {
        date: "10/17",
        sale: 1360,
      },
      {
        date: "10/18",
        sale: 1410,
      },
      {
        date: "10/19",
        sale: 1370,
      },
      {
        date: "10/20",
        sale: 1460,
      },
      {
        date: "10/21",
        sale: 1432,
      },
      {
        date: "10/22",
        sale: 1350,
      },
      {
        date: "10/23",
        sale: 1420,
      },
      {
        date: "10/24",
        sale: 1400,
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

  const {
    data,
    //  error,
    loading,
    fetchData,
  } = useGetWithoutQuery();
  const error = "";
  useEffect(() => {
    fetchData("report/dashboard");
  }, []);

  return (
    <div className="mt-16 cursor-default">
      {loading ? (
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="flex items-center gap-4">
            <Spinner size="lg" />
            <span className="pl-3 text-slate-400 text-3xl">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="flex items-center gap-4">
            <span className="pl-3 text-red-400 text-3xl">
              Something went wrong
            </span>
          </div>
        </div>
      ) : (
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
                    <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                      {dashboardData.sales.monthly_sales || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2">Monthly Profit</p>
                    <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                      {dashboardData.sales.daily_profit || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2">Daily Sales</p>
                    <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                      {dashboardData.sales.daily_sales || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2">Daily Profit</p>
                    <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                      {dashboardData.sales.daily_profit || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-3 bg-blue-200 rounded-md shadow-md h-full">
              <TopSellingPieAdmin pieData={dashboardData.top_sales} />
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center h-[41vh]">
            <div className="flex-1 p-3 bg-sky-200 rounded-md shadow-md h-full overflow-hidden">
              <p className="text-xl font-semibold text-sky-700 mb-4">
                Low Stock
              </p>
              <ul>
                {dashboardData.low_stock &&
                  dashboardData.low_stock.map((itm, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center cursor-pointer hover:shadow-md hover:scale-105 transition-all py-1 px-2 rounded-md border border-sky-400 bg-sky-300 mb-2"
                    >
                      <span className="font-semibold text-slate-600">
                        {itm.product_name}
                      </span>{" "}
                      <span className="text-slate-500 text-xs">
                        {itm.product_type}{" "}
                      </span>{" "}
                      <span>{itm.stock_quantity}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="w-[50%] p-3 bg-teal-200 rounded-md shadow-md h-full overflow-hidden">
              <p className="text-xl font-semibold text-teal-700 mb-4">
                Sales Statistics
              </p>
              <div className="max-h-[85%] flex justify-center items-center">
                {dashboardData.last_month_sales && (
                  <SalesStaticsChartAdmin
                    chartData={dashboardData.last_month_sales}
                  />
                )}
              </div>
            </div>
            <div className="flex-1 p-3 bg-indigo-200 rounded-md shadow-md h-full">
              <p className="text-xl font-semibold text-indigo-700 mb-4">
                Pending Transfers
              </p>
              <ul>
                {dashboardData.pending_transfers &&
                  dashboardData.pending_transfers.map((itm, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center cursor-pointer hover:shadow-md hover:scale-105 transition-all py-1 px-2 rounded-md border border-indigo-400 bg-indigo-300 mb-2"
                    >
                      <span className="font-semibold text-slate-600">
                        {itm.transfer_to}
                      </span>{" "}
                      <span>{itm.date}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  
  );
}
