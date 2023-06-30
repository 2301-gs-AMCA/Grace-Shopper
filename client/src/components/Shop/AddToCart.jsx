import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

export default function AddToCart({ item }) {
  const { cart, setCart } = useAuth();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    item.quantity = quantity;
    item.subtotal = item.cost * quantity;
  }, [quantity]);

  function handleSubmit(e) {
    e.preventDefault();
    if (cart.items.includes(item)) {
      cart.totalPrice += item.subtotal;
      cart.items[item].quantity = quantity;
      setCart(cart);
    } else {
      cart.items.push(item);
      cart.totalPrice += item.subtotal;
      setCart(cart);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        quantity:
        <input
          type="number"
          max="100"
          min="0"
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
        />
      </label>
      <br></br>
      <button>Add To Cart</button>
    </form>
  );
}
