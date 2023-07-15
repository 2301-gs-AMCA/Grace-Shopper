import React from "react";
import { useState } from "react";

export default function Billing() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState(0);
  const [cardNumber, setCardNumber] = useState(0);
  const [code, setCode] = useState(0);
  return (
    <div className="payment-information">
      <h1>Billing</h1>
      <form className="billing-form">
        <label>First Name: </label>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br></br>
        <label>Last Name: </label>
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br></br>
        <label>Street Address: </label>
        <input
          type="text"
          placeholder="Street Address"
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <label>Apt</label>
        <input
          type="text"
          placeholder="1234"
          onChange={(e) => setApt(e.target.value)}
        ></input>
        <br></br>
        <label>Card Number: </label>
        <input
          type="text"
          placeholder="123456789"
          onChange={(e) => setCardNumber(e.target.value)}
        ></input>
        <label>Security Code: </label>
        <input
          type="text"
          placeholder="123"
          onChange={(e) => setCode(e.target.value)}
        ></input>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}
