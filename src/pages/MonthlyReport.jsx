import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "flowbite-react";

export default function MonthlyReport() {
  const monthly_report = {
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
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const monthlyData = {
    January: { income: 20000, expense: 1000 },
    February: { income: 18000, expense: 800 },
    March: { income: 22000, expense: 1500 },
  };

  const selectedMonthName = selectedMonth.toLocaleDateString("en-US", {
    month: "short",
  });

  const dataForSelectedMonth = monthlyData[selectedMonthName];

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
      <div className="overflow-x-auto shadow-md mb-6">
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="bg-slate-400">Month</Table.HeadCell>
            <Table.HeadCell className="bg-slate-400">Income</Table.HeadCell>
            <Table.HeadCell className="bg-slate-400">Expense</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {monthly_report.report.map((shop, index) => (
              <React.Fragment key={index}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900">
                  <Table.Cell colSpan={3} className="text-center font-semibold bg-slate-200">
                    {shop.store}
                  </Table.Cell>
                </Table.Row>
                {shop.sales.map((sale, index2) => (
                  <Table.Row
                    key={index2}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900"
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
              <Table.Cell>{monthly_report.total_income}</Table.Cell>
              <Table.Cell>{monthly_report.total_expense}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900 font-bold">
              <Table.Cell className="bg-slate-300 text-center" colSpan={2}>
                {monthly_report.is_profit ? "Profit" : "Loss "}
              </Table.Cell>
              <Table.Cell className="bg-slate-400 text-slate-700">
                {monthly_report.difference}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

// <Table.Row>
//   <Table.Cell colSpan={3} className="text-center">
//     No data available for {selectedMonthName}
//   </Table.Cell>
// </Table.Row>
