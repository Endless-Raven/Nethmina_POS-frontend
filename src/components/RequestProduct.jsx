import React from "react";
import { Modal, Button, Table } from "flowbite-react";
import { CiSearch } from "react-icons/ci";

export default function RequestProduct({ show, close }) {
  return (
    <div>
      {/* Modal */}
      <Modal show={show} onClose={close} size="xl" popup={true}>
        <Modal.Header>
          <h2 className="text-xl font-semibold text-green-500 mx-2 mb-5">
            Request Product
          </h2>
        </Modal.Header>
        <Modal.Body>
          {/* Search Bar */}
          <div className="relative">
            <CiSearch className="text-gray-600 mr-2 absolute left-2 top-3 text-xl" />
            <input
              type="search"
              placeholder="Search product"
              className="mb-5 w-full rounded-lg pl-8 pr-2 py-2 border  bg-gray-50"
            />
          </div>

          {/* Product Table */}
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Qty</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Product 1</Table.Cell>
                <Table.Cell>10</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Product 2</Table.Cell>
                <Table.Cell>5</Table.Cell>
              </Table.Row>
              {/* Add more rows as needed */}
            </Table.Body>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <Button gradientDuoTone="greenToBlue" outline>
              Create Request
            </Button>
            <Button gradientDuoTone="pinkToOrange" outline onClick={close}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
