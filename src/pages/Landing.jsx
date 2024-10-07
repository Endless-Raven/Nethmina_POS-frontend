import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 ">
      Landing
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate("/home/billing");
        }}
      >
        Go To Billing
      </button>
    </div>
  );
}
