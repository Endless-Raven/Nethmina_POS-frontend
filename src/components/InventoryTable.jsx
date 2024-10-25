import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export function InventoryTable() {
  const productList = [
    {
      product_id: 1,
      product_name: "Samsung Galaxy S23",
      brand_name: "Samsung",
      product_type: "Mobile Phone",
      product_stock: 30,
      product_wholesale_price: 30000,
      product_price: 50000,
    },
    {
      product_id: 2,
      product_name: "Samsung Galaxy S23",
      brand_name: "Samsung",
      product_type: "Mobile Phone",
      product_stock: 30,
      product_wholesale_price: 30000,
      product_price: 50000,
    },
    {
      product_id: 3,
      product_name: "iPhone 14",
      brand_name: "Apple",
      product_type: "Mobile Phone",
      product_stock: 50,
      product_wholesale_price: 45000,
      product_price: 75000,
    },
    {
      product_id: 4,
      product_name: "Google Pixel 7",
      brand_name: "Google",
      product_type: "Mobile Phone",
      product_stock: 20,
      product_wholesale_price: 35000,
      product_price: 60000,
    },
    {
      product_id: 5,
      product_name: "OnePlus 11",
      brand_name: "OnePlus",
      product_type: "Mobile Phone",
      product_stock: 40,
      product_wholesale_price: 28000,
      product_price: 55000,
    },
    {
      product_id: 6,
      product_name: "Sony Xperia 5 IV",
      brand_name: "Sony",
      product_type: "Mobile Phone",
      product_stock: 25,
      product_wholesale_price: 32000,
      product_price: 52000,
    },
    {
      product_id: 7,
      product_name: "Xiaomi Mi 13",
      brand_name: "Xiaomi",
      product_type: "Mobile Phone",
      product_stock: 60,
      product_wholesale_price: 25000,
      product_price: 48000,
    },
  ];

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
          {productList.map((product, index) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index +1}
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product.product_name}
              </TableCell>
              <TableCell>{product.brand_name}</TableCell>
              <TableCell>{product.product_type}</TableCell>
              <TableCell>{product.product_stock}</TableCell>
              <TableCell>{product.product_wholesale_price}</TableCell>
              <TableCell>{product.product_price}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
