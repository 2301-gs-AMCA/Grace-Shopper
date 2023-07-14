import React from "react";
import { getMyOrders } from "../api/orders";
import { useState, useEffect } from "react";

export default function OrderHistory() {
  const [myOrders, setMyOrders] = useState([]);
  const [orderDate, setOrderDate] = useState();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(orderDate);
  async function getOrders() {
    let result = await getMyOrders();
    console.log("my orders", result.orders);
    setMyOrders(result.orders);
    myOrders.map((order) => {
      setOrderDate(order.order_date);
    });
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="order-history">
      <h1 className="userHeader">Order History</h1>
      {myOrders.map((order) => {
        return (
          <div className="order-details">
            <u>{formattedDate}</u>
            {order.items.map((item) => {
              return (
                <ul className="order-history-list">
                  <li>{item.name}</li>
                  <li>${item.cost}</li>
                </ul>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
