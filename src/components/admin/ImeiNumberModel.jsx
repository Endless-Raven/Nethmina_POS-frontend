import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "flowbite-react";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default function ImeiNumberModel({ productID, showModel, close, shop }) {
  const [imeiNumbers, setImeiNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModel) {
      fetchImeis();
    }
  }, [showModel]);

  // Fetch IMEI numbers based on selected product and shop
  const fetchImeis = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/product/Imeinumber/list`,
        {
          shop: shop,
          Product_id: productID,
        }
      );
      const imeiList = response.data[0].split(","); // Split the string into an array of IMEI numbers
      setImeiNumbers(imeiList);
    } catch (error) {
      console.error("Error fetching IMEI numbers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModel} onClose={close}>
      <Modal.Header>IMEI Numbers</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          {loading ? (
            <Spinner aria-label="Loading IMEI numbers" />
          ) : imeiNumbers.length > 0 ? (
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>IMEI Numbers</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    <div className="grid grid-cols-3 gap-4">
                      {imeiNumbers.map((imei, index) => (
                        <div key={index} className="border p-2 rounded text-center">
                          {imei}
                        </div>
                      ))}
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          ) : (
            <p>No IMEI numbers found for this product.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
