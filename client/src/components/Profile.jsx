import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  let adminhtml = ""

  if (user.isAdmin) {
    adminhtml = (
      <Link
         to={"/dashboard"}
         style={{ cursor: "pointer" }}
         >
          Dashboard
        </Link>
    );
  }

  return (
    <m.div
      className="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <h1 className="userHeader">Welcome, {user.username}!</h1>
      <div className="userInfo">
        <u>USER INFO</u>
        <br></br>
        <Link
          to={`/dashboard/security/${user.id}`}
          style={{ cursor: "pointer" }}
        >
          Security Info
        </Link>
        <br></br>
        <Link
          to={`/dashboard/settings/${user.id}`}
          style={{ cursor: "pointer" }}
        >
          Settings
        </Link>
        <br></br>
        <Link
          to={`/dashboard/reviews/${user.id}`}
          style={{ cursor: "pointer" }}
        >
          Reviews
        </Link>
        <br></br>
        {adminhtml}
        
      </div>
      {/*//SUGGESTION TABLE///*/}
      <div className="itemsULike">
        <h2>Items You May Like</h2>
        <ul className="likedItems">
          <li>List of items based on your search history</li>
        </ul>
      </div>
      {/*//ORDER HISTORY TABLE///*/}
      <div className="orderHistory">
        <h2>Order History</h2>
        <h3 className="historyItems">Your Recently Ordered Items</h3>
        <ul className="history"></ul>
      </div>
    </m.div>
  );
}
