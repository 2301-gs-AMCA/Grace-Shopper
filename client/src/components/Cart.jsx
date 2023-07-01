import { useEffect, useState } from "react";
import "../App.css";
import useAuth from "../hooks/useAuth";
import AddToCart from "./Shop/AddToCart";

let cartImg =
  "https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png";

export default function Cart() {
  const { cart } = useAuth();

  useEffect(() => {
    console.log(cart);
  }, []);
  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2> Total Price: ${cart.totalPrice}</h2>
      <div className="items-container">
        {cart.items.map((item) => {
          return (
            <div key={item.id} className="item-card">
              <p>Item: {item.name}</p>
              <p>Price: ${item.subtotal}</p>
              <AddToCart item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
