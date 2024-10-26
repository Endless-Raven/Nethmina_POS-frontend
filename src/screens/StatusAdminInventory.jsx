import React, { useEffect } from "react";
import { useGetWithoutQuery } from "../services/api";

function StatusAdminInventory() {
  const { data, error, loading, fetchData } = useGetWithoutQuery();
  // const data = [
  //   {
  //     products: [
  //       {
  //         product_id: 1,
  //         product_name: "iPhone 12",
  //         stock_quantity: 34,
  //         transfer_quantity: 3,
  //         imei_number: [123456789012345, 123456789012345, 123456789012345],
  //       },
  //       {
  //         product_id: 2,
  //         product_name: "back-cover",
  //         stock_quantity: 34,
  //         transfer_quantity: 14,
  //       },
  //     ],
  //     from: "kurunegala",
  //     to: "kandy",
  //     date: "2024/10/02",
  //     time: "10:50",
  //     completed: false,
  //   },
  //   {
  //     products: [
  //       {
  //         product_id: 1,
  //         product_name: "iPhone 12",
  //         stock_quantity: 34,
  //         transfer_quantity: 3,
  //         imei_number: [123456789012345, 123456789012345, 123456789012345],
  //       },
  //       {
  //         product_id: 2,
  //         product_name: "back-cover",
  //         stock_quantity: 34,
  //         transfer_quantity: 14,
  //       },
  //     ],
  //     from: "kurunegala",
  //     to: "kandy",
  //     date: "2024/10/02",
  //     time: "10:50",
  //     completed: true,
  //   },
  // ];

  useEffect(() => {
    fetchData("stock/getTransferDetails");
  }, []);

  // console.log(data);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        {/* Pending Transfer Section */}
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-10 text-green-500">
            Pending Transfers
          </h2>
          {data &&
            data
              .filter((t) => !t.completed)
              .slice(-10)
              .map((transfer, index) => (
                <div key={index} className="mb-6">
                  <div className="p-2 flex justify-start gap-4 bg-green-200 text-green-600">
                    <strong>From:</strong> {transfer.from}
                    <strong>To:</strong> {transfer.to}
                  </div>
                  <table className="min-w-full border-collapse bg-green-100 hover:bg-green-50">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Product ID</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Transfer Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transfer.products.map((item, i) => (
                        <tr key={i}>
                          <td className="border px-4 py-2">
                            {item.product_id}
                          </td>
                          <td className="border px-4 py-2">
                            {item.product_name}
                          </td>
                          <td className="border px-4 py-2">
                            {item.transfer_quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
        </div>

        {/* Confirmed Transfer Section */}
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-10 text-blue-500">
            Confirmed Transfers
          </h2>
          {data &&
            data
              .filter((t) => t.completed)
              .slice(-10)
              .map((transfer, index) => (
                <div key={index} className="mb-6">
                  <div className="p-2 flex justify-start gap-4 bg-blue-200 text-blue-600">
                    <strong>From:</strong> {transfer.from}
                    <strong>To:</strong> {transfer.to}
                  </div>
                  <table className="min-w-full border-collapse bg-blue-100 hover:bg-blue-50">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Product ID</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Transfer Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transfer.products.map((item, i) => (
                        <tr key={i}>
                          <td className="border px-4 py-2">
                            {item.product_id}
                          </td>
                          <td className="border px-4 py-2">
                            {item.product_name}
                          </td>
                          <td className="border px-4 py-2">
                            {item.transfer_quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default StatusAdminInventory;
