import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useMobileForImei } from "../services/api";
import { TbTruckDelivery } from "react-icons/tb";

function TrackPhone() {
  const [imei_number, setImeiNumber] = useState("");
  const { data, error, loading, fetchMobileData } = useMobileForImei();

  const handleImeiChange = (e) => {
    setImeiNumber(e.target.value);
  };

  const handleSearch = () => {
    if (!imei_number) {
      alert("IMEI number cannot be empty.");
      return;
    }
    fetchMobileData("product/track/ProductDetails", { imei_number });
  };

  const handleClear = () => {
    setImeiNumber("");
  };


  return (
    <div className="pt-16">
      <div className="flex w-full justify-center gap-2">
        <TextInput
          id="imei"
          type="text"
          rightIcon={IoMdSearch}
          placeholder="Enter IMEI number"
          className="w-64"
          value={imei_number}
          maxLength={15}
          onChange={handleImeiChange}
          required
        />
        <Button
          onClick={handleSearch}
          className="w-20"
          gradientDuoTone="purpleToBlue"
        >
          Search
        </Button>
        <Button
          className="w-20"
          outline
          gradientDuoTone="pinkToOrange"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      {loading ? (
        <div className="mt-16 ml-6">Loading...</div>
      ) : error ? (
        <div className="mt-16 ml-6 text-red-500">Error: {error}</div>
      ) : data ? (
        <div
          className={`mt-16 ml-6 mx-auto max-w-4xl flex flex-col gap-6 text-lg border-2 bg-white rounded-md p-6 shadow-md ${
            data.sold
              ? "border-rose-300"
              : data.transfer
              ? "border-yellow-300"
              : "border-sky-300"
          }`}
        >
          <div>{data.sold ? "Out Of Stock" : "In Stock"}</div>
          <div>
            <span className="font-semibold">Product:</span> {data.product_name}
          </div>
          <div className="flex">
            <div className="w-64">
              <span className="font-semibold">Brand:</span> {data.brand_name}
            </div>
            <div className="w-64">
              <span className="font-semibold">Color:</span> {data.color}
            </div>
            <div className="w-64">
              <span className="font-semibold">Capacity:</span> {data.capacity}
            </div>
            <div className="w-64">
              <span className="font-semibold">Grade:</span> {data.grade}
            </div>
          </div>
            <div>
              <span className="font-semibold">Category:</span>{" "}
              {data.product_type}
            </div>
          {data?.store_name && (
            <div>
              <span className="font-semibold">Shop:</span> {data.store_name}
            </div>
          )}
          <div className="flex">
            <div className="w-64">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(data.date).toLocaleDateString("en-GB")}
            </div>
            <div>
              <span className="font-semibold">Price:</span> {data.product_price}
            </div>
          </div>
          <div>
            <span className="font-semibold">Transfer Status:</span>{" "}
            {data.transfer ? "Transferred" : "Not Transferred"}
          </div>
          {data.transfer && (
            <div className="flex gap-5 items-center" >
              <span className="font-semibold">Transfer To:</span>{" "}
              {data.transfer_from}  <span className="text-2xl text-yellow-300"><TbTruckDelivery /> </span> {data.transfer_to}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-16 ml-6">Please enter a valid IMEI.</div>
      )}
    </div>
  );


}

export default TrackPhone;
