import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

export default function TableBilling({ orderedList, setTotal }) {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // calculate total of all products
  useEffect(() => {
    const totalAmount = orderedList.reduce((acc, product) => {
      const productTotal = product.price * product.quantity - product.discount;
      return acc + productTotal;
    }, 0);
    setTotal(Number(totalAmount));
  }, [orderedList]);

  return (
    <div className="min-h-[40%] overflow-x-auto">
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>warranty</Table.HeadCell>
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
                <Table.Cell>{item.product_id}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.product_name}
                </Table.Cell>
                <Table.Cell>{item.warranty_period}</Table.Cell>
                <Table.Cell>Rs: {item.price}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>Rs: {item.discount}</Table.Cell>
                <Table.Cell>
                  Rs:{" "}
                  {Number(item.price) * Number(item.quantity) -
                    Number(item.discount)}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
