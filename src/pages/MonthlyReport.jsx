import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "flowbite-react";
import { useMobileForImei } from "../services/api";
import DailyReportAdmin from "../components/admin/DailyReportAdmin";

export default function MonthlyReport() {
  const {
    // data,                                              need to uncomment after connecting to the backend
    // error,
    loading,
    fetchMobileData,
  } = useMobileForImei();

  const data = {
    total_income: 123000,
    total_expense: 23000,
    is_profit: true,
    difference: 10000,
    report: [
      {
        store: "kurunegala",
        sales: [
          { date: "2024/10/1", income: 20000, expense: 12000 },
          { date: "2024/10/2", income: 20000, expense: 12000 },
          { date: "2024/10/30", income: 20000, expense: 12000 },
        ],
      },
      {
        store: "kandy",
        sales: [
          { date: "2024/10/1", income: 20000, expense: 12000 },
          { date: "2024/10/2", income: 20000, expense: 12000 },
          { date: "2024/10/30", income: 20000, expense: 12000 },
        ],
      },
    ],
  }; // need to remove after connect
  const error = "";

  const [openModal, setOpenModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedMonthName = selectedMonth.toLocaleDateString("en-US", {
    month: "long",
  });
  const month = selectedMonth.getMonth() + 1;
  const year = selectedMonth.getFullYear();

  useEffect(() => {
    fetchMobileData("report/get_month_report", { month, year });
  }, [selectedMonth]);

  const handleClick = (sale) => {
    setOpenModal(true);
    setSelectedDate(sale.date);
  };

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="border px-2 py-1 rounded-md"
        />
        <p className="text-2xl font-bold">
          {selectedMonthName} {selectedMonth.getFullYear()}
        </p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : data ? (
        <div className="overflow-x-auto shadow-md mb-6">
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="bg-slate-400">Month</Table.HeadCell>
              <Table.HeadCell className="bg-slate-400">Income</Table.HeadCell>
              <Table.HeadCell className="bg-slate-400">Expense</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.report.map((shop, index) => (
                <React.Fragment key={index}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900">
                    <Table.Cell
                      colSpan={3}
                      className="text-center font-semibold bg-slate-200"
                    >
                      {shop.store}
                    </Table.Cell>
                  </Table.Row>
                  {shop.sales.map((sale, index2) => (
                    <Table.Row
                      key={index2}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900"
                      onClick={() => handleClick(sale)}
                    >
                      <Table.Cell>{sale.date}</Table.Cell>
                      <Table.Cell>{sale.income}</Table.Cell>
                      <Table.Cell>{sale.expense}</Table.Cell>
                    </Table.Row>
                  ))}
                </React.Fragment>
              ))}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900 font-bold">
                <Table.Cell>Total</Table.Cell>
                <Table.Cell>{data.total_income}</Table.Cell>
                <Table.Cell>{data.total_expense}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900 font-bold">
                <Table.Cell className="bg-slate-300 text-center" colSpan={2}>
                  {data.is_profit ? "Profit" : "Loss "}
                </Table.Cell>
                <Table.Cell className="bg-slate-400 text-slate-700">
                  {data.difference}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
      {/* to open daily report popup */}
      {openModal && <DailyReportAdmin show={openModal} onClose={() => setOpenModal(false)} date={selectedDate}/>   }      
    </div>
  );
}
