import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { getMyOrders } from "../api/orders";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  let adminhtml = "";

  if (user.isAdmin) {
    adminhtml = (
      <Link to={"/dashboard"} style={{ cursor: "pointer" }}>
        Dashboard
      </Link>
    );
  }

  const [myOrders, setMyOrders] = useState([]);

  async function getOrders() {
    let order = await getMyOrders();
    console.log("my orders", order);
    setMyOrders(order.orders);
  }
  useEffect(() => {
    getOrders();
  }, []);
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
        <br></br>
        <Link
          to={`/dashboard/orderHistory/${user.id}`}
          style={{ cursor: "pointer" }}
        >
          Order History
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
          <li>[Under Construction]</li>
        </ul>
      </div>
      {/*//ORDER HISTORY TABLE///*/}
      <div className="buy-again">
        <h2>Buy Again</h2>
        <ul className="buy-back">
          <li>Your Recently Ordered Items</li>
          <li>[Under Construction]</li>
        </ul>
      </div>
    </m.div>
  );
}
