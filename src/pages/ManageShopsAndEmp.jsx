import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import EditeEmpAdmin from "../components/admin/EditeEmpAdmin";
import { useGetWithoutQuery } from "../services/api";
import { useEffect } from "react";
import EditeShopAdmin from "../components/admin/EditeShopAdmin";
import AddEmpAdmin from "../components/admin/AddEmpAdmin";
import AddShopAdmin from "../components/admin/AddShopAdmin";

function ManageShopsAndEmp() {
  const { data, error, loading, fetchData } = useGetWithoutQuery();
  useEffect(() => {
    fetchData("employee_and_shop/get_all");
  }, []);
  const [openModelShop, setOpenModelShop] = useState(false);
  const [selectedShop, setSelectedShop] = useState({
    store_id: 1,
    store_name: "",
    store_address: "",
    store_phone_number: 1234567890,
  });
  const [openModalEmp, setOpenModalEmp] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [openModelAddEmp, setOpenModelAddEmp] = useState(false);
  const [openModelAddShop, setOpenModelAddShop] = useState(false);

  // console.log(data);

  return (
    <div className="pt-16">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : data ? (
        <div className="">
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="bg-slate-400">Emp_Id</Table.HeadCell>
              <Table.HeadCell className="bg-slate-400">Emp_name</Table.HeadCell>
              <Table.HeadCell className="bg-slate-400">Phone</Table.HeadCell>
              <Table.HeadCell className="bg-slate-400">Position</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.shop_data?.map((shop, index) => (
                <React.Fragment key={index}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:text-slate-900">
                    <Table.Cell
                      onClick={() => {
                        setOpenModelShop(true);
                        let { employees, ...rest } = shop;
                        setSelectedShop(rest);
                      }}
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
          <div className="mt-10 flex gap-4 items-center justify-end">
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              onClick={() => setOpenModelAddShop(true)}
            >
              Add Shop
            </Button>
            <Button
              gradientDuoTone="greenToBlue"
              onClick={() => setOpenModelAddEmp(true)}
            >
              Add Employee
            </Button>
          </div>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
      {data?.shop_list && (
        <EditeEmpAdmin
          show={openModalEmp}
          onClose={() => setOpenModalEmp(false)}
          emp={selectedEmp}
          shops={data?.shop_list}
        />
      )}
      <EditeShopAdmin
        show={openModelShop}
        onClose={() => setOpenModelShop(false)}
        shop={selectedShop}
      />
      {/* <AddEmpAdmin
        show={openModelAddEmp}
        shops={data?.shop_list}
        onClose={() => setOpenModelAddEmp(false)}
      /> */}
      {/* <AddShopAdmin
        show={openModelAddShop}
        onClose={() => setOpenModelAddShop(false)}
      /> */}
    </div>
  );
}

export default ManageShopsAndEmp;
