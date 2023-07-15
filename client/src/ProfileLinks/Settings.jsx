import React from "react";
import "../App.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <div className="settings">
      <h1>Settings</h1>
      <ul className="personal-information">
        <h2>Personal Information</h2>
        <br></br>
        <li>Current Username: {user.username} </li>
        <button className="p-info-buttons">Change Username</button>
        <br></br>
        <li>Current Password: {user.password} </li>
        <button className="p-info-buttons">Change Password</button>
        <br></br>
        <li>Email Address: </li>
      </ul>
      <ul className="billing-information">
        <h2>Billing Information</h2>
        <li>First Name: </li>
        <li>Last Name: </li>
        <li>Billing Address: </li>
        <li>Card Number: </li>
        <li>Security Code: </li>
        <button className="p-info-buttons" onClick={() => nav("/billing")}>
          Update Billing Information
        </button>
      </ul>
    </div>
  );
}
