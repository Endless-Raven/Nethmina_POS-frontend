import {Checkbox,Table,TableBody,TableCell,TableHead,TableHeadCell,TableRow,}from "flowbite-react";

export function ProductTable({ items }) {
  return (
    <div className="overflow-x-auto border border-collapse rounded-lg">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>QTY</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {items.map((item, index) => (
            <TableRow
              key={index}
              className=" bg-slate-200 hover:bg-slate-300"
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
