import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export function InventoryTable() {
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
          <TableHeadCell>Store</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              1
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple iPhone 14 Pro"'}
            </TableCell>
            <TableCell>Apple</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>15</TableCell>
            <TableCell>$950</TableCell>
            <TableCell>$1200</TableCell>
            <TableCell>Store 1</TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              2
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </TableCell>
            <TableCell>White</TableCell>
            <TableCell>Laptop PC</TableCell>
            <TableCell>15</TableCell>
            <TableCell>$950</TableCell>
            <TableCell>$1200</TableCell>
            <TableCell>Store 1</TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              3
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>$999</TableCell>
            
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              4
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Google Pixel Phone
            </TableCell>
            <TableCell>Gray</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>$799</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>$999</TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              5
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Apple Watch 5
            </TableCell>
            <TableCell>Red</TableCell>
            <TableCell>Wearables</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>$999</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
