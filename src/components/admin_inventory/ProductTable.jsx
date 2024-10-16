import {Checkbox,Table,TableBody,TableCell,TableHead,TableHeadCell,TableRow,}from "flowbite-react";

export function ProductTable({ items }) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>QTY</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {items.map((item, index) => (
            <TableRow
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.product}
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.qty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
