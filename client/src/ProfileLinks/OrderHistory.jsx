import React from "react";
import { getMyOrders } from "../api/orders";
import { useState, useEffect } from "react";

export default function OrderHistory() {
  const [myOrders, setMyOrders] = useState([]);

  async function getOrders() {
    let order = await getMyOrders();
    console.log("my orders", order);
    setMyOrders(order);
  }
  useEffect(() => {
    getOrders();
  }, []);
  // myOrders.map((orders) => {
  //   return (
  //     <div className="order-history" key="order.id">
  //       order.name
  //     </div>
  //   );
  // });
}
