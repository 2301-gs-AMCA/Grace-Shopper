import { useEffect, useState } from "react";
import "../App.css";
import useAuth from "../hooks/useAuth";
import AddToCart from "./Shop/AddToCart";
import { postOrder } from "../api/orders";
import { postOrderItem } from "../api/order_items";

let cartImg =
  "https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png";

export default function Cart() {
  const { cart, setCart } = useAuth();
  const [item, setItem] = useState({});
  const [click, setClick] = useState();

  useEffect(() => {
    console.log(cart);
    setCart(cart);
  }, [click]);

  //re-renders totalPrice and price
  function handleClick(e) {
    e.preventDefault();
    setClick(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2> Total Price: ${cart.totalPrice}</h2>
      <div>
        {cart.items.map((item) => {
          return (
            <div key={item.id} className="item-card">
              <p>Item: {item.name}</p>
              <p>Price: ${item.subtotal}</p>
              <AddToCart item={item} handleClick={handleClick} />
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <button>Complete Order</button>
      </form>
    </div>
  );
}
