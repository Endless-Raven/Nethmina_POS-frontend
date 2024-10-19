import { Table } from "flowbite-react";
import React, { useState } from "react";
import EditeEmpAdmin from "../components/admin/EditeEmpAdmin";

function ManageShopsAndEmp() {
  const data = {
    shop_list: [
      {
        store_name: "kurunegala",
        store_id: 1,
      }, {
        store_name: "kandy",
        store_id: 2,
      },
    ],
    shop_data: [
      {
        store_id: 1,
        store_name: "kurunegala",
        store_address: "periyamulla, baththaramulla",
        store_phone_number: 371522231,
        employees: [
          {
            user_id: 1,
            username: "samantha",
            role: "cashier",
            phone: 712341234,
            store_id: 1,
          },
          {
            user_id: 2,
            username: "samantha",
            role: "manager",
            phone: 712341234,
            store_id: 1,
          },
        ],
      },
      {
        store_id: 2,
        store_name: "kandy",
        store_address: "periyamulla, baththaramulla",
        store_phone_number: 371522231,
        employees: [
          {
            user_id: 1,
            username: "samantha",
            role: "cashier",
            phone: 712341234,
            store_id: 2,
          },
          {
            user_id: 2,
            username: "samantha",
            role: "manager",
            phone: 712341234,
            store_id: 2,
          },
        ],
      },
    ],
  };

  const [openModalEmp, setOpenModalEmp] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState({});
  return (
    <div className="pt-16">
      <Table striped>
        <Table.Head>
          <Table.HeadCell className="bg-slate-400">Emp_Id</Table.HeadCell>
          <Table.HeadCell className="bg-slate-400">Emp_name</Table.HeadCell>
          <Table.HeadCell className="bg-slate-400">Phone</Table.HeadCell>
          <Table.HeadCell className="bg-slate-400">Position</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.shop_data.map((shop, index) => (
            <React.Fragment key={index}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900">
                <Table.Cell
                  colSpan={4}
                  className="text-center font-semibold bg-slate-200"
                >
                  {shop.store_name}
                </Table.Cell>
              </Table.Row>
              {shop.employees.map((emp, index2) => (
                <Table.Row
                  key={index2}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900"
                  onClick={() => {
                    setOpenModalEmp(true);
                    setSelectedEmp(emp);
                  }}
                >
                  <Table.Cell>{emp.user_id}</Table.Cell>
                  <Table.Cell>{emp.username}</Table.Cell>
                  <Table.Cell>{emp.phone}</Table.Cell>
                  <Table.Cell>{emp.role}</Table.Cell>
                </Table.Row>
              ))}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
      <EditeEmpAdmin
        show={openModalEmp}
        onClose={() => setOpenModalEmp(false)}
        emp={selectedEmp}
        shops={data.shop_list}
      />
    </div>
  );
}

export default ManageShopsAndEmp;
