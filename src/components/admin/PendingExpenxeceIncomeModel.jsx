import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;


export default function PendingExpenseIncomeModel({ show, close }) {
  const userData = useSelector((state) => state.user.data);

  // States for incomes and expenses
  const [pendingIncomes, setPendingIncomes] = useState([]);
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch pending incomes and expenses
  async function fetchPendingFinanceData() {
    setLoading(true);
    setError(null);
    try {
      const incomeResponse = await axios.get(`${API_BASE_URL}/income/getPendingIncomes`, {
  
      });
      setPendingIncomes(incomeResponse.data);

      const expenseResponse = await axios.get(`${API_BASE_URL}/expense/getPendingExpenses`, {
     
      });
      setPendingExpenses(expenseResponse.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchPendingFinanceData();
  }, []);

  // Function to approve or delete pending data (example implementation)
  const handleApprove = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/income/approve`, {
        request_id: id,
      });
      // Refresh data after approval
      fetchPendingFinanceData();
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

    // Function to approve or delete pending data (example implementation)
    const handleApproveExpense = async (id) => {
        try {
          await axios.post(`${API_BASE_URL}/expense/approve`, {
            request_id: id,
          });
          // Refresh data after approval
          fetchPendingFinanceData();
        } catch (err) {
          console.error("Approval failed:", err);
        }
      };

  return (
    <Modal show={show} onClose={close}>
      <Modal.Header>
        <h2 className="text-green-600">Pending Finance Requests</h2>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spinner size="lg" />
            <span className="text-3xl pl-3 text-slate-400">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <span className="text-3xl text-red-400">{error}</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pending Incomes */}
            <div className="border rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold text-green-500">Pending Incomes</h3>
              {pendingIncomes.length > 0 ? (
                pendingIncomes.map((income) => (
                  <div key={income.id} className="relative mt-4 pb-4 border-b-2 border-green-400 space-y-2">
                    <p>
                      <strong>Income ID:</strong> {income.income_id}
                    </p>
                    <p>
                      <strong>Store Name:</strong> {income.store_name}
                    </p>
                    <p>
                      <strong>Added by:</strong> {income.username}
                    </p>
                    <p>
                      <strong>Category:</strong> {income.income_category}
                    </p>
                    
                    <p>
                      <strong>Amount:</strong> {income.income_amount}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(income.created_at).toLocaleDateString()}
                    </p>
                    <Button
                      className="absolute top-0 right-0"
                      gradientDuoTone="greenToBlue"
                      onClick={() => handleApprove(income.income_id)}
                    >
                      Approve
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No pending incomes.</p>
              )}
            </div>

            {/* Pending Expenses */}
            <div className="border rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-semibold text-red-500">Pending Expenses</h3>
              {pendingExpenses.length > 0 ? (
                pendingExpenses.map((expense) => (
                  <div key={expense.id} className="relative mt-4 pb-4 border-b-2 border-red-400 space-y-2">
                    <p>
                      <strong>Expense ID:</strong> {expense.expense_id}
                    </p>
                    <p>
                      <strong>Store Name:</strong> {expense.store_name}
                    </p>
                    <p>
                      <strong>Added by:</strong> {expense.username}
                    </p>
                    <p>
                      <strong>Category:</strong> {expense.expense_category}
                    </p>
                    <p>
                      <strong>Amount:</strong> {expense.expense_amount}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(expense.created_at).toLocaleDateString()}
                    </p>
                    <Button
                      className="absolute top-0 right-0"
                      gradientDuoTone="pinkToOrange"
                      onClick={() => handleApproveExpense(expense.expense_id)}
                    >
                      Approve
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No pending expenses.</p>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
