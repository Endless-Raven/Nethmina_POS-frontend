import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import { CiBarcode } from "react-icons/ci";
import { Button, Modal, Spinner } from "flowbite-react";
import ImeiNumberModel from "../admin/ImeiNumberModel";

export function ProductTable({ items, setitems }) {
  const [showImeiNumber, setShowImeiNumberModal] = useState("");
  const [selectedImeis, setSelectedImeis] = useState([]);
 

  return (
    <div className="overflow-x-auto border border-collapse rounded-lg">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Remove</TableHeadCell>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>Imeis</TableHeadCell>
          <TableHeadCell>QTY</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y ">
          {items.map((item, index) => (
            <TableRow key={index} className=" bg-slate-200 hover:bg-slate-300">
              <TableCell
                className="text-2xl"
                onClick={() => {
                  setitems(
                    items.filter(
                      (product) => product.product_id != item.product_id
                    )
                  );
                }}
              >
                <IoMdClose />
              </TableCell>
              <TableCell className="">{item.product_name}</TableCell>
              <TableCell
                className="text-3xl"
                onClick={() => {
                  setSelectedImeis(item.imei_number);
                  setShowImeiNumberModal(true);
                }}
              >
                <CiBarcode />
              </TableCell>
              <TableCell className="">{item.transfer_quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ImeiNumberModel
        showModel={showImeiNumber}
        imeiList={selectedImeis}
        close={() => {
          setShowImeiNumberModal(false);
        }}
      />
    </div>
  );
}
