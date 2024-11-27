import React, { useEffect } from "react";
import TopSellingPieAdmin from "../components/admin/TopSellingPieAdmin";
import SalesStaticsChartAdmin from "../components/admin/SalesStaticsChartAdmin";
import { useGetWithoutQuery } from "../services/api";
import { Button, Spinner } from "flowbite-react";

export default function Dashboard() {
  const { data, error, loading, fetchData } = useGetWithoutQuery();
  useEffect(() => {
    fetchData("dashboard/getDashboard");
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
                      {data?.sales?.monthly_sales || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2">Monthly Profit</p>
                    <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                      {data?.sales?.monthly_profit?.profit || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2">Daily Sales</p>
                    <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                      {data?.sales?.daily_sales || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2">Daily Profit</p>
                    <p className="w-32 font-semibold bg-cyan-700 rounded-md p-1 cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                      {data?.sales.daily_profit?.profit || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-3 bg-blue-200 rounded-md shadow-md h-full">
              {data?.sales && <TopSellingPieAdmin pieData={data?.top_sales} />}
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center h-[41vh]">
            <div className="flex-1 p-3 bg-sky-200 rounded-md shadow-md h-full overflow-hidden overflow-y-scroll">
              <p className="text-xl font-semibold text-sky-700 mb-4">
                Low Stock
              </p>
              <ul>
                {data?.low_stock && data.low_stock.length > 0 ? (
                  data.low_stock.slice(0, 5).map((itm, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center cursor-pointer hover:shadow-md hover:scale-105 transition-all py-1 px-2 rounded-md border border-sky-400 bg-sky-300 mb-2"
                    >
                      <span className="font-semibold text-slate-600">
                        {itm.store_name}
                      </span>{" "}
                      <span className="font-semibold text-slate-600">
                        {itm.product_name}
                      </span>{" "}
                      <span className="text-slate-500 text-xs">
                        {itm.product_type}{" "}
                      </span>{" "}
                      <span>{itm.stock_quantity}</span>
                    </li>
                  ))
                ) : (
                  <div className="text-center text-slate-500 mt-4">
                    No items available.
                  </div>
                )}
              </ul>
            </div>
            <div className="w-[50%] p-3 bg-teal-200 rounded-md shadow-md h-full overflow-hidden">
              <p className="text-xl font-semibold text-teal-700 mb-4">
                Sales Statistics
              </p>
              <div className="max-h-[85%] flex justify-center items-center">
                {data?.last_month_sales && (
                  <SalesStaticsChartAdmin chartData={data?.last_month_sales} />
                )}
              </div>
            </div>
            <div className="flex-1 p-3 bg-indigo-200 rounded-md shadow-md h-full overflow-y-scroll">
              <p className="text-xl font-semibold text-indigo-700 mb-4">
                Pending Transfers
              </p>
              <ul>
                {data?.pending_transfers &&
                  data.pending_transfers.map((itm, index) => (
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
