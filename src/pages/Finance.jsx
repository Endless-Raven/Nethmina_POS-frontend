import React, { useState } from 'react';

export default function Finance() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [incomeType, setIncomeType] = useState('selling');
  const [expenseType, setExpenseType] = useState('inventory cost');
  const [message, setMessage] = useState('');

  // Function to handle adding new income
  const handleAddIncome = async (e) => {
    e.preventDefault();

    const newIncome = {
      category: incomeType, // Use the selected income type
      amount: parseFloat(amount),
      is_income: true,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    // Send POST request to add income
    const response = await fetch('/add-income', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIncome),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  // Function to handle adding new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();

    const newExpense = {
      category: expenseType, // Use the selected expense type
      amount: parseFloat(amount),
      is_income: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    // Send POST request to add expense
    const response = await fetch('/add-expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Finance Management</h2>

      {/* Add Income Form */}
      <div className="mb-6">
        <h3 className="text-xl mb-2">Add New Income</h3>
        <form onSubmit={handleAddIncome}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Income Type</label>
            <select
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="selling">Selling</option>
              <option value="phone number">Phone Number</option>
              <option value="service charge">Service Charge</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add Income
          </button>
        </form>
      </div>

      {/* Add Expense Form */}
      <div>
        <h3 className="text-xl mb-2">Add New Expense</h3>
        <form onSubmit={handleAddExpense}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expense Type</label>
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="inventory cost">Inventory Cost</option>
              <option value="emp_salaries">Employee Salaries</option>
              <option value="utilities">Utilities</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Success Message */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
