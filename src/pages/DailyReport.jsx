import React, { useState } from "react";

const DailyReport = () => {
  // Sample data set for demonstration purposes
  const salesData = [
    {
      id: 1,
      store: "Store 1",
      itemName: "Item A",
      brand: "Brand X",
      price: 10.0,
      qty: 2,
      discount: 2.0,
    },
    {
      id: 2,
      store: "Store 1",
      itemName: "Item B",
      brand: "Brand Y",
      price: 12.0,
      qty: 3,
      discount: 1.0,
    },
    {
      id: 3,
      store: "Store 1",
      itemName: "Item C",
      brand: "Brand Z",
      price: 8.0,
      qty: 1,
      discount: 0.5,
    },
    {
      id: 4,
      store: "Store 1",
      itemName: "Item D",
      brand: "Brand W",
      price: 15.0,
      qty: 1,
      discount: 1.5,
    },
    {
      id: 5,
      store: "Store 1",
      itemName: "Item E",
      brand: "Brand V",
      price: 20.0,
      qty: 2,
      discount: 3.0,
    },

    {
      id: 6,
      store: "Store 2",
      itemName: "Item F",
      brand: "Brand U",
      price: 18.0,
      qty: 1,
      discount: 2.0,
    },
    {
      id: 7,
      store: "Store 2",
      itemName: "Item G",
      brand: "Brand T",
      price: 25.0,
      qty: 2,
      discount: 4.0,
    },
    {
      id: 8,
      store: "Store 2",
      itemName: "Item H",
      brand: "Brand S",
      price: 10.0,
      qty: 5,
      discount: 5.0,
    },
    {
      id: 9,
      store: "Store 2",
      itemName: "Item I",
      brand: "Brand R",
      price: 30.0,
      qty: 1,
      discount: 3.0,
    },
    {
      id: 10,
      store: "Store 2",
      itemName: "Item J",
      brand: "Brand Q",
      price: 15.0,
      qty: 3,
      discount: 2.5,
    },

    {
      id: 11,
      store: "Store 3",
      itemName: "Item K",
      brand: "Brand P",
      price: 50.0,
      qty: 1,
      discount: 5.0,
    },
    {
      id: 12,
      store: "Store 3",
      itemName: "Item L",
      brand: "Brand O",
      price: 22.0,
      qty: 2,
      discount: 3.0,
    },
    {
      id: 13,
      store: "Store 3",
      itemName: "Item M",
      brand: "Brand N",
      price: 40.0,
      qty: 1,
      discount: 4.0,
    },
    {
      id: 14,
      store: "Store 3",
      itemName: "Item N",
      brand: "Brand M",
      price: 16.0,
      qty: 4,
      discount: 1.0,
    },
    {
      id: 15,
      store: "Store 3",
      itemName: "Item O",
      brand: "Brand L",
      price: 30.0,
      qty: 3,
      discount: 2.0,
    },
  ];

  const [cashiers, setCashiers] = useState({
    "Store 1": "Cashier 1",
    "Store 2": "Cashier 2",
    "Store 3": "Cashier 3",
  });

  const handleCashierChange = (store, value) => {
    setCashiers((prev) => ({
      ...prev,
      [store]: value,
    }));
  };

  // Calculating totals for each store and across all stores
  const storeTotals = salesData.reduce((acc, item) => {
    const totalAmount = item.price * item.qty - item.discount;
    acc[item.store] = (acc[item.store] || 0) + totalAmount;
    return acc;
  }, {});

  const allStoresTotal = Object.values(storeTotals).reduce(
    (acc, total) => acc + total,
    0
  );

  // Calculating total discount
  const totalDiscount = salesData.reduce((acc, item) => acc + item.discount, 0);

  return (
    <div className="p-5">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-4">
        {/* Title */}
        <h1 className="font-bold text-xl m-3 text-center">
          Daily Accounting Sales Report
        </h1>

        {/* Store and Cashier Info and Date/Sale Total */}
        <div className="flex justify-between items-start w-full">
          {/* Store and Cashier Info */}
          <div className="flex-1 mr-4">
            <table className="border border-separate border-gray-400 rounded-xl p-3">
              <thead>
                <tr>
                  <th className="border rounded-md border-gray-300 p-1">
                    Store
                  </th>
                  <th className="border rounded-md border-gray-300 p-1">
                    Cashier Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cashiers).map((store) => (
                  <tr key={store}>
                    <td className="border rounded-md border-gray-300 p-1">
                      {store}
                    </td>
                    <td className="rounded-md border-gray-300">
                      <input
                        type="text"
                        value={cashiers[store]}
                        onChange={(e) =>
                          handleCashierChange(store, e.target.value)
                        }
                        placeholder={"Enter Cashier Name"}
                        className="w-full p-1 border rounded-md bg-slate-200 ml-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Date and Sale Total */}
          <div className="flex flex-col items-end">
            <p className="font-bold">Date: {new Date().toLocaleDateString()}</p>
            <p className="font-bold">
              Sale Total: ${allStoresTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Sales Table */}
      <table className="border-separate bg-slate-200 border rounded-md border-gray-400 p-3 w-full">
        <thead>
          <tr className="bg-slate-50">
            <th className="border-gray-400 p-2">No</th>
            <th className="border-gray-400 p-2">Store</th>
            <th className="border-gray-400 p-2">Item Name</th>
            <th className="border-gray-400 p-2">Brand</th>
            <th className="border-gray-400 p-2">Price</th>
            <th className="border-gray-400 p-2">Qty</th>
            <th className="border-gray-400 p-2">Amount</th>
            <th className="border-gray-400 p-2">Discount</th>
            <th className="border-gray-400 p-2">Total</th>
            <th className="border-gray-400 p-2">Store Totals</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => {
            const totalAmount = item.price * item.qty - item.discount;
            const isFirstRowForStore =
              index === 0 || salesData[index - 1].store !== item.store;
            const isLastRowForStore =
              index === salesData.length - 1 ||
              salesData[index + 1].store !== item.store;

            return (
              <tr key={item.id}>
                <td className="border rounded-md border-gray-400 p-2">
                  {index + 1}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  {isFirstRowForStore ? item.store : ""}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  {item.itemName}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  {item.brand}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  ${item.price.toFixed(2)}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  {item.qty}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  ${item.price.toFixed(2) * item.qty}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  ${item.discount.toFixed(2)}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  ${totalAmount.toFixed(2)}
                </td>
                <td className="border rounded-md border-gray-400 p-2">
                  {isLastRowForStore ? storeTotals[item.store].toFixed(2) : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="border-gray-400 p-2 font-bold">
              Total
            </td>
            <td className="border-gray-400 p-2 font-bold">
              {salesData.reduce((acc, item) => acc + item.qty, 0)}
            </td>
            <td className="border-gray-400 p-2 font-bold">
              $
              {salesData
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </td>
            <td className="border-gray-400 p-2 font-bold">
              ${totalDiscount.toFixed(2)}
            </td>
            <td className="border-gray-400 p-2 font-bold">
              ${allStoresTotal.toFixed(2)}
            </td>
            <td className="border-gray-400 p-2 font-bold"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DailyReport;
