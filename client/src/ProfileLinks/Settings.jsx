import React from "react";
import "../App.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
export default function Settings() {
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <div className="settings">
      <h1>Settings</h1>
      <ul className="personal-information">
        <h2>Personal Information</h2>
        <li>Current Username: {user.username} </li>
        <li>Current Password: {user.password} </li>
        <li>Email Address: </li>
        <button className="p-info-buttons">Update Personal Information</button>
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
