import React from 'react';

function StatusAdminInventory() {
  const pendingTransfers = [
    { category: 'Phone', brand: 'Samsung', productName: 'Galaxy S21', qty: 5 },
    { category: 'Accessory', brand: 'Sony', productName: 'Headphones', qty: 10 },
  ];

  const confirmedTransfers = [
    { category: 'Phone', brand: 'Apple', productName: 'iPhone 14', qty: 3 },
    { category: 'Accessory', brand: 'Anker', productName: 'Charger', qty: 15 },
  ];

  return (
    <div className="p-4 ">
      {/* Pending Transfer Section */}
      <div className="flex justify-center">
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-2">Pending Transfer</h2>
          <div className="border p-2 mb-4 flex justify-between">
            <strong>From:</strong> Kurunegala
            <strong>To:</strong> Kandy
          </div>
          <table className="min-w-full border-collapse">
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
          <h2 className="text-lg font-bold mb-2">Confirmed Transfer</h2>
          <div className="border p-2 mb-4">
            <p><strong>From:</strong>  Kurunegala</p>
            <p><strong>To:</strong> Polonnaruwa</p>
          </div>
          <table className="min-w-full border-collapse">
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
