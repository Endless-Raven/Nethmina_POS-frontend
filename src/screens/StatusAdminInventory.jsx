import React from 'react';

function StatusAdminInventory() {
  const pendingTransfers = [
    { from: 'Kurunegala', to: 'Kandy', products: [
      { category: 'Phone', brand: 'Samsung', productName: 'Galaxy S21', qty: 5 },
      { category: 'Accessory', brand: 'Sony', productName: 'Headphones', qty: 10 },
    ]},
    { from: 'Kurunegala', to: 'Polonnaruwa', products: [
      { category: 'Phone', brand: 'Xiaomi', productName: 'Redmi Note 10', qty: 8 },
      { category: 'Accessory', brand: 'JBL', productName: 'Speaker', qty: 6 },
    ]}
  ];

  const confirmedTransfers = [
    { from: 'Kurunegala', to: 'Polonnaruwa', products: [
      { category: 'Phone', brand: 'Apple', productName: 'iPhone 12', qty: 3 },
      { category: 'Accessory', brand: 'Anker', productName: 'Charger', qty: 15 },
    ]},
    { from: 'Kurunegala', to: 'Kandy', products: [
      { category: 'Phone', brand: 'OnePlus', productName: 'OnePlus 9', qty: 4 },
      { category: 'Accessory', brand: 'Belkin', productName: 'Power Bank', qty: 7 },
    ]}
  ];

  return (
    <div className="p-4">
      <div className="flex gap-4">
        {/* Pending Transfer Section */}
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-2 text-green-500">Pending Transfers</h2>
          {pendingTransfers.map((transfer, index) => (
            <div key={index} className="mb-6">
              <div className="p-2 mb-4 flex justify-start gap-4 bg-green-100 text-green-400 ">
                <strong>From:</strong> {transfer.from}
                <strong>To:</strong> {transfer.to}
              </div>
              <table className="min-w-full border-collapse bg-green-100 hover:bg-green-50">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Brand</th>
                    <th className="border px-4 py-2">Product Name</th>
                    <th className="border px-4 py-2">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {transfer.products.map((item, i) => (
                    <tr key={i}>
                      <td className="border px-4 py-2">{item.category}</td>
                      <td className="border px-4 py-2">{item.brand}</td>
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Confirmed Transfer Section */}
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-2 text-blue-500">Confirmed Transfers</h2>
          {confirmedTransfers.map((transfer, index) => (
            <div key={index} className="mb-6">
              <div className="p-2 mb-4 flex justify-start gap-4 bg-blue-100 text-blue-400">
                <strong>From:</strong> {transfer.from}
                <strong>To:</strong> {transfer.to}
              </div>
              <table className="min-w-full border-collapse bg-blue-100 hover:bg-blue-50">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Brand</th>
                    <th className="border px-4 py-2">Product Name</th>
                    <th className="border px-4 py-2">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {transfer.products.map((item, i) => (
                    <tr key={i}>
                      <td className="border px-4 py-2">{item.category}</td>
                      <td className="border px-4 py-2">{item.brand}</td>
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{item.qty}</td>
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