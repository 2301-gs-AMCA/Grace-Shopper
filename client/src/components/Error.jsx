import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const nav = useNavigate();
  return (
    <div className="error">
      <h1>Oh No! You've reached a dead end!</h1>
      <p>
        The product you've clicked on is either no longer available or does not
        exist.
      </p>
      <p>
        To return to the shop,{" "}
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
