import React, { useEffect, useState } from "react";
import { Button, Modal, Label, Spinner, Table } from "flowbite-react";
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
      setImeiNumbers(response.data);
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
                {imeiNumbers.map((imei, index) => (
                  <Table.Row key={index} className="bg-white">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                      {imei}
                    </Table.Cell>
                  </Table.Row>
                ))}
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
