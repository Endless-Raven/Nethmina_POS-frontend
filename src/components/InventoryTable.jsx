import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export function InventoryTable({productList}) {

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableHeadCell>No</TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Brand</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Qty</TableHeadCell>
          <TableHeadCell>Wholesale Price</TableHeadCell>
          <TableHeadCell>Retail Price</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {productList &&
            productList.map((product, index) => (
              <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.product_name}
                </TableCell>
                <TableCell>{product.brand_name}</TableCell>
                <TableCell>{product.product_type}</TableCell>
                <TableCell>{Number(product.stock_quantity).toFixed()}</TableCell>
                <TableCell>{product.product_wholesale_price}</TableCell>
                <TableCell>{product.product_price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
