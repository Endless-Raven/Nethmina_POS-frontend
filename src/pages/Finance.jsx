import React, { useState } from 'react';
import { Button } from 'flowbite-react';

export default function Finance() {
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [incomeType, setIncomeType] = useState('selling');
  const [expenseType, setExpenseType] = useState('inventory cost');
  const [message, setMessage] = useState(''); // Message for success or error
  const [isSuccess, setIsSuccess] = useState(false); // To track if message is success

  // Function to handle adding new income
  const handleAddIncome = async (e) => {
    e.preventDefault();

    const newIncome = {
      category: incomeType, // Use the selected income type
      amount: parseFloat(incomeAmount),
      is_income: true,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    try {
      // Send POST request to add income
      const response = await fetch('/add-income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncome),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Set success message
        setIsSuccess(true); // Set success flag
        setIncomeAmount(''); // Clear the income amount after submission
      } else {
        setMessage('Error adding income. Please try again.');
        setIsSuccess(false); // Set error flag
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add income. Please check the server.');
      setIsSuccess(false); // Set error flag
    }
  };

  // Function to handle adding new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();

    const newExpense = {
      category: expenseType, // Use the selected expense type
      amount: parseFloat(expenseAmount),
      is_income: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    try {
      // Send POST request to add expense
      const response = await fetch('/add-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Set success message
        setIsSuccess(true); // Set success flag
        setExpenseAmount(''); // Clear the expense amount after submission
      } else {
        setMessage('Error adding expense. Please try again.');
        setIsSuccess(false); // Set error flag
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add expense. Please check the server.');
      setIsSuccess(false); // Set error flag
    }
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
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit" gradientDuoTone="purpleToBlue">
              Add Income
            </Button>
          </div>
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
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" gradientDuoTone="pinkToOrange">
              Add Expense
            </Button>
          </div>
        </form>
      </div>

      {/* Success/Error Message */}
      {message && (
        <p className={`mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
