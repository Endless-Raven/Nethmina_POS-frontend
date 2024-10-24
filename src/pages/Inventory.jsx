import React, { useState } from "react";
import { Button } from "flowbite-react";
import UpcommingStockInv from "../components/UpcommingStockInv";
import RequestProduct from "../components/RequestProduct";

const Inventory = () => {
  const [openModalUpcomming, setOpenModalUpcomming] = useState(false);
  const [openModalRequest, setOpenModalRequest] = useState(false);

  return (
    <div className="p-6 bg-slate-100 min-h-[88vh]">
      <div className="flex justify-between fixed bottom-2 left-0 w-full px-6">
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          onClick={() => setOpenModalUpcomming(true)}
        >
          Upcoming Stocks
        </Button>
        <div className="flex gap-4">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={() => setOpenModalRequest(true)}
          >
            Request Product
          </Button>
          <Button gradientDuoTone="greenToBlue" outline>
            Pending Request
          </Button>
        </div>
      </div>
      <UpcommingStockInv
        show={openModalUpcomming}
        close={() => setOpenModalUpcomming(false)}
      />
      <RequestProduct
        show={openModalRequest}
        close={() => setOpenModalRequest(false)}
      />
    </div>
  );
};

export default Inventory;
