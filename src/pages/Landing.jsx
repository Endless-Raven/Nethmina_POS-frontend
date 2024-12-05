import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import bg from "../images/LandingBg.jpg";
const API_BASE_URL = process.env.API_BASE_URL;

export default function Landing() {

  const navigate = useNavigate();
  console.log(API_BASE_URL);
  return (
    <div className="flex flex-col justify-center items-center gap-6 text-white bg-cover bg-center bg-black h-screen relative]">
      <img className="w-full h-screen object-cover absolute opacity-50 z-0 " src={bg} alt="d" />
      <h1 className="ml-72 font-bold text-7xl text-cyan-500 cursor-default text-center z-20">
        Nethmina <span className="text-sky-600">Mobile</span>{" "}
      </h1>
      <div className="flex gap-6 ml-72">
        <Button
          gradientDuoTone="purpleToBlue"
          size="xl"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
