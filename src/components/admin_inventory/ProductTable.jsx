import {Checkbox,Table,TableBody,TableCell,TableHead,TableHeadCell,TableRow,}from "flowbite-react";

export function ProductTable({ items }) {
  return (
    <div className="overflow-x-auto border border-collapse">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>QTY</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {items.map((item, index) => (
            <TableRow
              key={index}
              className=" bg-white"
            >
              <TableCell className="">
                {item.product}
              </TableCell>
              <TableCell className="">
                {item.qty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
