import React, { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

const DailyReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [columns, setColumns] = useState([
    "No",
    "Item Name",
    "Price",
    "Qty",
    "Discount",
    "Total",
  ]);

  // Load report for frontend
  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/sales/daily-sales-report`,
        {
          params: {
            date: "2024-10-04",
          },
        }
      );
      setSalesData(response.data.report);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-8">
      <h1 className="font-bold cursor-default text-2xl text-center text-sky-800">
        Daily Accounting Sales Report
      </h1>
      <div className="flex justify-between items-center gap-4 mb-12">
        <div className="">
          <p className="mb-2 cursor-default">Select Date</p>
          <Datepicker
            minDate={new Date(new Date().setDate(new Date().getDate() - 7))}
            maxDate={new Date()}
          />
        </div>
        <div className="flex items-center gap-4 cursor-default font-semibold mt-4 text-xl">
          <p>
            Total Save: Rs <span>12000</span>
          </p>
        </div>
      </div>

      <table className="bg-slate-100 border rounded-md overflow-hidden shadow-md border-gray-400 w-full mb-16">
        <thead>
          <tr className="bg-white">
            {columns.map((column, index) => (
              <th key={index} className="border-gray-400 border-r p-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        {/* Main Sales Table */}
        <tbody>
          {salesData.map((store, storeIndex) => (
            <React.Fragment key={storeIndex}>
              {/* Store Name Row */}
              <tr>
                <td
                  className="border border-gray-400 bg-slate-50 text-center font-semibold"
                  colSpan={5}
                >
                  {store.store_name}
                </td>
                <td
                  className="border border-gray-400 bg-slate-50 text-center font-semibold"
                >
                  Rs : {store.total_sales.toFixed(2)}
                </td>
              </tr>
              {/* Sales Data Rows */}
              {store.sales.map((item, itemIndex) => (
                <tr key={`${storeIndex}-${itemIndex}`}>
                  <td className="border border-gray-400 text-center">
                    {itemIndex + 1}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {item.product_name}
                  </td>
                  <td className="border border-gray-400 p-2">
                    Rs : {item.item_price ? Number(item.item_price).toFixed(2) : "-"}
                  </td>
                  <td className="border border-gray-400 text-center">
                    {item.item_quantity ? item.item_quantity : "-"}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {item.discount ? `Rs : ${item.discount}` : "-"}
                  </td>
                  <td className="border border-gray-400 p-2 ">
                    Rs : {item.total_amount
                      ? Number(item.total_amount).toFixed(2)
                      : "-"}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-white">
            <td colSpan="5" className="border-gray-400 border-r-2 p-2 font-bold">
              Total
            </td>
            <td className="border-gray-400 p-2 font-bold">
              Rs:{(salesData.reduce((acc, item) => acc + item.total_sales, 0)).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DailyReport;
