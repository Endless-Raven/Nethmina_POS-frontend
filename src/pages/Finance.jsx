import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { usePost } from "../services/api";

export default function Finance() {
  const [incomeAmount, setIncomeAmount] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [incomeType, setIncomeType] = useState("selling");
  const [expenseType, setExpenseType] = useState("inventory cost");

  const { data, error, loading, postData } = usePost();
  const userData = useSelector((state) => state.user.data);

  const [formData, setFormData] = useState({
    income_category: "Selling",
    income_amount: "",
    user_id: "",
    store_id: "",
    income_type: "Selling",
    approval_status: "confirmed",
  });

  const [formDataExpence, setFormDataExpence] = useState({
    expense_category: "Utilities",
    expense_amount: "",
    user_id: "",
    store_id: "",
    expense_type: "Utilities",
    approval_status: "confirmed",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user_id: userData.user_id,
      store_id: userData.store_id,
    }));
    setFormDataExpence((prev) => ({
      ...prev,
      user_id: userData.user_id,
      store_id: userData.store_id,
    }));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "income_category") {
      setFormData((prev) => ({
        ...prev,
        income_type: e.target.value,
      }));
    }
  };

  const handleChangeExpence = (e) => {
    setFormDataExpence((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "income_category") {
      setFormData((prev) => ({
        ...prev,
        income_type: e.target.value,
      }));
    }
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    await postData("income/AddIncome", formData);
  };

  const handleAddExpence = async (e) => {
    e.preventDefault();
    await postData("expense/AddExpense", formDataExpence);
  };
  // console.log(formData);
  // console.log(data?.message);
  // console.log(error);

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
              value={formData.income_category}
              onChange={handleChange}
              name="income_category"
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="selling">Selling</option>
              <option value="phone repair">Phone repair</option>
              <option value="service charge">Service Charge</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={formData.income_amount}
              onChange={handleChange}
              name="income_amount"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              disabled={loading}
            >
              Add Income
            </Button>
          </div>
        </form>
      </div>

      {/* Add Expense Form */}
      <div>
        <h3 className="text-xl mb-2">Add New Expense</h3>
        <form onSubmit={handleAddExpence}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Expense Type</label>
            <select
              value={formDataExpence.expense_category}
              onChange={handleChangeExpence}
              name="expense_category"
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="inventory cost">Inventory Cost</option>
              <option value="emp_salaries">Employee Salaries</option>
              <option value="utilities">Utilities</option>
              <option value="service charge">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={formDataExpence.expense_amount}
              onChange={handleChangeExpence}
              name="expense_amount"
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
      {data?.message && (
        <p className={`my-2 text-green-600 `}>{data.message}</p>
      )}
      {error && <p className={`my-2 text-red-600 `}>{error}</p>}
    </div>
  );
}
