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
  const [totalPrice, setTotalPrice] = useState(cart.totalPrice);
  const [thisCart, setThisCart] = useState(cart);
  const [thisQuantity, setThisQuantity] = useState();

  useEffect(() => {
    setTotalPrice(cart.totalPrice);
    console.log("cart useEffect", cart);
    setThisCart(cart);
  }, [click]);

  //re-renders totalPrice and price
  function handleClick(e) {
    e.preventDefault();
    setClick(e.target.value);
    setThisCart(cart);
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

      setClick(e.target.value);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2> Total Price: $ {thisCart.totalPrice}</h2>
      <div>
        {thisCart.items.map((item) => {
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
