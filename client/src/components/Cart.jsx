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
  const [click, setClick] = useState();
  const [thisQuantity, setThisQuantity] = useState();

  useEffect(() => {
    async function getCart() {
      let thatCart = JSON.parse(localStorage.getItem("cart"));
      if (thatCart !== null) {
        await setCart(thatCart);
      } else {
        await setCart(cart);
      }
    }
    getCart();
    if (!cart) {
      cart.userId === 1;
      cart.totalPrice === 0;
    }
  }, [click]);

  //re-renders totalPrice and price
  function handleClick(e) {
    e.preventDefault();
    setClick(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await postOrder(cart.userId, cart.totalPrice);

      for (let item of cart.items) {
        async function postPostOrderItem() {
          try {
            const orderItem = await postOrderItem(
              result.order.id,
              item.id,
              item.quantity,
              item.subtotal
            );
            return orderItem;
          } catch (error) {
            console.error(error);
          }
        }
        postPostOrderItem();
      }

      cart.items = [];
      cart.totalPrice = 0;
      setCart(cart);

      localStorage.removeItem("cart");

      setClick(!click);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2> Total Price: $ {cart.totalPrice ? cart.totalPrice : 0}</h2>
      <div>
        {cart.items.map((item) => {
          return (
            <div key={item.id} className="item-card">
              <p>Item: {item.name}</p>
              <p>Price: ${item.subtotal}</p>
              <AddToCart
                item={item}
                handleClick={handleClick}
                setThisQuantity={setThisQuantity}
              />
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
