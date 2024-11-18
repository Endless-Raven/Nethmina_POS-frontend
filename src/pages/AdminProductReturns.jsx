import React, { useEffect } from "react";
import { useGetWithoutQuery } from "../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.API_BASE_URL;


function AdminProductReturns() {
  const { data, error, loading, fetchData } = useGetWithoutQuery();
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const returnData = data || [];

  useEffect(() => {
    fetchData("return/returns");
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error.message || "Failed to fetch returns."}</div>;
  }

  if (!loading && !error && returnData.length === 0) {
    return <div className="text-center text-gray-500">No returns found.</div>;
  }

  const handleReturnToStock = (return_id) => {
    // Call the API to process return to stock
    fetch(`${API_BASE_URL}/return/Tostock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_id, 
        user: userData.user_id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Return added to stock!");
        fetchData("return/returns"); // Refresh the data after processing
      })
      .catch((error) => {
        console.error("Error processing return to stock:", error);
        alert("Error adding return to stock.");
      });
  };

  const handleConfirmReturn = (return_id) => {
    // Call the API to confirm the return
    fetch(`${API_BASE_URL}/return/confirm/Return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ return_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Return confirmed!");
        fetchData("return/returns"); // Refresh the data after processing
      })
      .catch((error) => {
        console.error("Error confirming return:", error);
        alert("Error confirming return.");
      });
  };

  const renderTable = (title, filterCondition, bgColor, textColor, showActions = true) => {
    const filteredData = returnData.filter(filterCondition);
    return (
      <div className="w-full pt-6">
        <h2 className={`text-lg font-bold mb-6 ${textColor}`}>{title}</h2>
        {filteredData.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className={`bg-${bgColor}-100`}>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">IMEI</th>
                <th className="border px-4 py-2">Return ID</th>
                <th className="border px-4 py-2">Date</th>
                {showActions && <th className="border px-4 py-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((returnRecord) => (
                <tr key={returnRecord.return_id}>
                  <td className="border px-4 py-2">
                    {returnRecord.product_name || `ID: ${returnRecord.product_id}`}
                  </td>
                  <td className="border px-4 py-2">{returnRecord.description}</td> 
                  <td className="border px-4 py-2">{returnRecord.amount}</td>
                  <td className="border px-4 py-2">{returnRecord.imei_number}</td>
                  <td className="border px-4 py-2">{returnRecord.return_id}</td>
                  <td className="border px-4 py-2">
                    {new Date(returnRecord.created_at).toLocaleString()}
                  </td>
                  {showActions && (
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        onClick={() =>{ handleReturnToStock(returnRecord.return_id);}}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Add to Stock
                      </button>
                      <button
                        onClick={() =>{ handleConfirmReturn(returnRecord.return_id); }}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Confirm Return
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No {title.toLowerCase()} returns.</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="space-y-8">
        {/* Pending Returns Table with Buttons */}
        {renderTable(
          "Pending Returns",
          (r) => r.status === "pending",
          "red",
          "text-red-600",
          true // Show actions in this table
        )}

        {/* Confirmed Returns Table without Actions */}
        {renderTable(
          "Confirmed Returns",
          (r) => r.status === "confirmed",
          "blue",
          "text-blue-600",
          false // Hide actions in this table
        )}

        {/* Stock Returns Table without Actions */}
        {renderTable(
          "Stock Returns",
          (r) => r.status === "stock",
          "green",
          "text-green-600",
          false // Hide actions in this table
        )}
      </div>
    </div>
  );
}

export default AdminProductReturns;
