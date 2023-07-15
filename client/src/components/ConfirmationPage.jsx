import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCart from "../hooks/useCart";

export default function ConfirmationPage() {
  const nav = useNavigate();
  const { isCounted, setIsCounted } = useCart();

  useEffect(() => {
    setIsCounted(!isCounted);
  }, []);

  return (
    <div className="confirmation">
      <h1>Your order has been placed!</h1>
      <p>Thank you for shopping with AMCA! </p>
      <p>
        If you wish to continue shopping,{" "}
        <button
          onClick={() => {
            nav("/shop");
          }}
        >
          click here
        </button>
        .
      </p>
    </div>
  );
}
