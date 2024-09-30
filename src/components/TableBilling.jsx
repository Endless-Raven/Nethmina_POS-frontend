import React, { useState } from "react";
import { Table } from "flowbite-react";

export default function TableBilling({ orderedList }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-[40%] overflow-x-auto">
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Warrenty</Table.HeadCell>
          <Table.HeadCell>Unit Price</Table.HeadCell>
          <Table.HeadCell>No of Units</Table.HeadCell>
          <Table.HeadCell>Discount</Table.HeadCell>
          <Table.HeadCell>Total Cost</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orderedList.length === 0 ? (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
              <Table.Cell>0</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Add product to order
              </Table.Cell>
              <Table.Cell>0 year</Table.Cell>
              <Table.Cell>Rs: 0.00</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Rs: 0.00</Table.Cell>
              <Table.Cell>Rs: 0.00</Table.Cell>
            </Table.Row>
          ) : (
            orderedList.map((item, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                key={index}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.name}
                </Table.Cell>
                <Table.Cell>{item.warranty}</Table.Cell>
                <Table.Cell>Rs: {item.unitPrice}</Table.Cell>
                <Table.Cell>{item.noOfUnits}</Table.Cell>
                <Table.Cell>Rs: {item.discount}</Table.Cell>
                <Table.Cell>
                  Rs: {item.unitPrice * item.noOfUnits - item.discount}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
