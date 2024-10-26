import React, { useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { useMobileForImei } from "../../services/api";
import { Table } from "flowbite-react";
import { useReactToPrint } from "react-to-print";

export default function DailyReportAdmin({ show, onClose, date }) {
  // const data = {
  //   total_income: 123000,
  //   total_expense: 23000, // Fixed the typo from "expence" to "expense"
  //   is_profit: true,
  //   difference: 100000,
  //   report: [
  //     {
  //       store: "kurunegala",
  //       sales: [
  //         {
  //           time: "10:20",
  //           category: "sales",
  //           is_income: true,
  //           amount: 12000,
  //         },
  //         {
  //           time: "11:10",
  //           category: "transport",
  //           is_income: false,
  //           amount: 12000,
  //         },
  //         {
  //           time: "12:30",
  //           category: "sales",
  //           is_income: true,
  //           amount: 12000,
  //         },
  //       ],
  //     },
  //     {
  //       store: "kandy",
  //       sales: [
  //         {
  //           time: "10:20",
  //           category: "sales",
  //           is_income: true,
  //           amount: 12000,
  //         },
  //         {
  //           time: "11:10",
  //           category: "transport",
  //           is_income: false,
  //           amount: 12000,
  //         },
  //         {
  //           time: "12:30",
  //           category: "sales",
  //           is_income: true,
  //           amount: 12000,
  //         },
  //       ],
  //     },
  //   ],
  // };
  // const error = "";

  const {
    data,                                             // need to uncomment after connecting to the backend
    error,
    loading,
    fetchMobileData,
  } = useMobileForImei();

  useEffect(() => {
    fetchMobileData("report/daily-report", { date });
  }, [date]);

  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${date} income expence report`,
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>{date} Income Expense Report</Modal.Header>
      <Modal.Body>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : data ? (
          <div className="overflow-x-auto" ref={componentRef}>
            <Table hoverable>
              <Table.Head >
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Income</Table.HeadCell>
                <Table.HeadCell>Expence</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data.report.map((shop, index) => (
                  <React.Fragment key={index}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900">
                      <Table.Cell
                        colSpan={4}
                        className="text-center font-semibold bg-slate-200"
                      >
                        {shop.store}
                      </Table.Cell>
                    </Table.Row>
                    {shop.sales.map((sale, index2) => (
                      <Table.Row
                        key={index2}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900"
                      >
                        <Table.Cell>{sale.time}</Table.Cell>
                        <Table.Cell>{sale.category}</Table.Cell>
                        {sale.is_income ? (
                          <>
                            <Table.Cell>{sale.amount}</Table.Cell>
                            <Table.Cell></Table.Cell>
                          </>
                        ) : (
                          <>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>{sale.amount}</Table.Cell>
                          </>
                        )}
                      </Table.Row>
                    ))}
                  </React.Fragment>
                ))}
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900 font-bold">
                  <Table.Cell>Total</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>{data.total_income}</Table.Cell>
                  <Table.Cell>{data.total_expense}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900 font-bold">
                  <Table.Cell className="bg-slate-300 text-center" colSpan={3}>
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
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={printFn}>Print</Button>
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
