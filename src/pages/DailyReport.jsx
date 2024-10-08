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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA").replace(/-/g, "/")
  );
  useEffect(() => {
    fetchReport();
  }, [selectedDate]);

  const fetchReport = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/sales/daily-sales-report`,
        {
          params: {
            date: selectedDate,
          },
        }
      );
      setSalesData(response.data.report);
    } catch (error) {
      setSalesData({});
      setLoading(false);
      setError(error.message);
      console.error(error);
    }
    setLoading(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(
      new Date(e.target.value).toLocaleDateString("en-CA").replace(/-/g, "/")
    );
  };

  return (
    <div className="px-8 min-h-[90vh]">
      <h1 className="font-bold cursor-default text-3xl text-center text-sky-800">
        Daily Accounting Sales Report
      </h1>
      <div className="flex justify-between items-center gap-4 ">
        <div className="flex items-center mb-8 gap-4 cursor-default">
          <p className="font-semibold text-xl">Select Date</p>
          <input
            type="date"
            name=""
            id=""
            className="rounded-md p-2 w-9 cursor-pointer bg-slate-100"
            min={new Date(new Date().setDate(new Date().getDate() - 7))}
            max={new Date()}
            value={selectedDate}
            onSelect={selectedDate}
            disabled={loading}
            onChange={handleDateChange}
          />
          <p className="text-right text-lg ">{selectedDate}</p>
          {/* <Datepicker
            minDate={new Date(new Date().setDate(new Date().getDate() - 7))}
            maxDate={new Date()}
            value={selectedDate}
            onChange={handleDateChange}
          /> */}
        </div>
        {/* <div className="flex items-center gap-4 cursor-default font-semibold mt-4 text-xl">
          <p>
            Total Save: Rs <span>12000</span>
          </p>
        </div> */}
      </div>
      {loading ? (
        <div className="w-full h-[60vh] flex justify-center items-center text-2xl font-semibold">
          Loading ...
        </div>
      ) : error ? (
        <div className="w-full h-[60vh] flex justify-center items-center text-2xl font-semibold">
          Not Sales In that Day
        </div>
      ) : (
        <table className=" bg-slate-100 border rounded-md overflow-hidden shadow-md border-gray-400 w-full mb-16">
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
            { salesData ? salesData.map((store, storeIndex) => (
              <React.Fragment key={storeIndex}>
                {/* Store Name Row */}
                <tr>
                  <td
                    className="border border-gray-400 bg-sky-50 text-center font-semibold"
                    colSpan={5}
                  >
                    {store.store_name}
                  </td>
                  <td className="border border-gray-400 bg-sky-50 text-center font-semibold">
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
                      Rs :{" "}
                      {item.item_price
                        ? Number(item.item_price).toFixed(2)
                        : "-"}
                    </td>
                    <td className="border border-gray-400 text-center">
                      {item.item_quantity ? item.item_quantity : "-"}
                    </td>
                    <td className="border border-gray-400 p-2">
                      {item.discount ? `Rs : ${item.discount}` : "-"}
                    </td>
                    <td className="border border-gray-400 p-2 ">
                      Rs :{" "}
                      {item.total_amount
                        ? Number(item.total_amount).toFixed(2)
                        : "-"}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            )) : (
              <div className="text-center py-4 font-semibold">no sales for now</div>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-white">
              <td
                colSpan="5"
                className="border-gray-400 border-r-2 p-2 font-bold"
              >
                Total
              </td>
              <td className="border-gray-400 p-2 font-bold">
                Rs:
                {salesData ? salesData
                  .reduce((acc, item) => acc + item.total_sales, 0)
                  .toFixed(2) : 0.00 }
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default DailyReport;
