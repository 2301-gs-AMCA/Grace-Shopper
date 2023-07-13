import React from "react";
import { getMyOrders } from "../api/orders";
import { getOrderItems } from "../api/order_items";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function OrderHistory() {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [orderItems, setOrderItems] = useState();
  const [orderId, setOrderId] = useState(0);

  async function getOrders() {
    let result = await getMyOrders();
    console.log("my orders", result.orders);
    setMyOrders(result.orders);
    myOrders.map((order) => {
      setOrderId(order.id);
    });
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="order-history">
      {myOrders.map((order) => {
        return (
          <div>
            {order.id}
            {order.items.map((item) => {
              console.log(item.name);
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
