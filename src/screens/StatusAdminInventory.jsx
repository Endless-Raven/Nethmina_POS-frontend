import React from 'react';

function StatusAdminInventory() {
  const pendingTransfers = [
    { category: 'Phone', brand: 'Samsung', productName: 'Galaxy S21', qty: 5 },
    { category: 'Accessory', brand: 'Sony', productName: 'Headphones', qty: 10 },
  ];

  const confirmedTransfers = [
    { category: 'Phone', brand: 'Apple', productName: 'iPhone 12', qty: 3 },
    { category: 'Accessory', brand: 'Anker', productName: 'Charger', qty: 15 },
  ];

  return (
    <div className="p-4  ">
      {/* Pending Transfer Section */}
      <div className="flex justify-center gap-4">
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-2 text-green-500 ">Pending Transfer</h2>
          <div className="p-2 mb-4 flex justify-start gap-4 bg-green-100 text-green-400">
            <strong>From:</strong> Kurunegala
            <strong>To:</strong> Kandy
          </div>
          <table className="min-w-full border-collapse bg-green-100">
            <thead>
              <tr>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Qty</th>
              </tr>
            </thead>
            <tbody>
              {pendingTransfers.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">{item.brand}</td>
                  <td className="border px-4 py-2">{item.productName}</td>
                  <td className="border px-4 py-2">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmed Transfer Section */}
         <div className="w-1/2">
          <h2 className="text-lg font-bold mb-2 text-blue-500">Confirmed Transfer</h2>
          <div className=" p-2 mb-4 flex justify-start gap-4 bg-blue-100 text-blue-400">
            <strong>From:</strong>  Kurunegala
            <strong>To:</strong> Polonnaruwa
          </div>
          <table className="min-w-full border-collapse bg-blue-100">
            <thead>
              <tr>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Qty</th>
              </tr>
            </thead>
            <tbody>
              {confirmedTransfers.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">{item.brand}</td>
                  <td className="border px-4 py-2">{item.productName}</td>
                  <td className="border px-4 py-2">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatusAdminInventory;
