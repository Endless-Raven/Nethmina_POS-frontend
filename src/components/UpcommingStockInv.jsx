import { Button, Checkbox, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import React from "react";
import { useUpdateWithQuery } from "../services/api";

export default function UpcommingStockInv({ show, close }) {
  const {
    // data,
    error,
    loading,
    updateStatus,
  } = useUpdateWithQuery();

  const data = [
    {
      transfer_id: 1,
      from: "kurunegala",
      date: "2024/10/02",
      time: "10:50",
      products: [
        {
          product_id: 1,
          product_name: "iPhone 12",
          brand_name: "samsung",
          product_type: "mobile phone",
          transfer_quantity: 3,
        },
        {
          product_id: 2,
          product_name: "back-cover",
          brand_name: "samsung",
          product_type: "mobile phone",
          transfer_quantity: 14,
        },
      ],
    },
    {
      transfer_id: 2,
      from: "kandy",
      date: "2024/10/03",
      time: "10:50",
      products: [
        {
          product_id: 1,
          product_name: "iPhone 12",
          brand_name: "samsung",
          product_type: "mobile phone",
          transfer_quantity: 3,
        },
        {
          product_id: 2,
          product_name: "back-cover",
          brand_name: "samsung",
          product_type: "mobile phone",
          transfer_quantity: 14,
        },
      ],
    },
  ];

  const handleRecived = async (e, id) => {
    e.preventDefault();
    try {
      await updateStatus("transfer/update", id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} size="xl" onClose={close} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 capitalize">
          <h3 className="text-xl font-medium text-blue-700 dark:text-white">
            Upcomming Stocks
          </h3>
          {loading ? (
            <div className="min-h-[50vh] flex justify-center items-center">
              <div className="flex items-center gap-4">
                <Spinner size="lg" />
                <span className="pl-3 text-slate-400 text-3xl">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="min-h-[50vh] flex justify-center items-center">
              <div className="flex items-center gap-4">
                <span className="pl-3 text-red-400 text-3xl">
                  Something went wrong
                </span>
              </div>
            </div>
          ) : data.length > 0 ? (
            data.map((transfer, index) => (
              <div
                key={index}
                className="p-2 bg-white border rounded-md shadow-blue-300 shadow-md text-slate-600"
              >
                <p className="flex justify-between pb-1 mb-2 border-b-2 border-blue-200">
                  <span className="font-semibold">{transfer.from}</span>
                  <span className="text-sm">{transfer.date}</span>
                </p>
                {transfer.products.map((product, index2) => (
                  <p
                    key={index2}
                    className="flex justify-between items-center mb-1"
                  >
                    <span>{product.product_name}</span>
                    <span className="text-sm">{product.product_type}</span>
                    <span>{product.transfer_quantity}</span>
                  </p>
                ))}
                <div className="mt-2 flex justify-end">
                  <Button
                    color="blue"
                    size="xs"
                    onClick={(e) => {
                      handleRecived(e, transfer.transfer_id);
                    }}
                  >
                    Recived parcel
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-32 text-xl text-slate-400 font-semibold">
              No Upcomming Stocks
            </div>
          )}
          <div></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
