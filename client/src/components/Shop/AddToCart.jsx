import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function AddToCart({ item, handleClick }) {
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const { user, cart, setCart } = useAuth();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  useEffect(() => {
    item.quantity = quantity;
    item.subtotal = item.cost * quantity;

    if (pathname === "/cart") {
      setCart(cart);
      if (!user) {
        cart.items.userId === 0;
      }
      cart.totalPrice = 0;
      for (let thisItem of cart.items) {
        cart.totalPrice += thisItem.subtotal;
      }

      item.quantity = quantity;

      console.log(cart);
    }
    setCart(cart);
  }, [quantity]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      cart.items.userId === 0;
    }

    for (let thatItem of cart.items) {
      if (item.id === thatItem.id) {
        cart.totalPrice += item.subtotal;
        item.quantity = thatItem.quantity + quantity;
        cart.items.pop(thatItem);
        setCart(cart);
      }
    }

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

  function handleChange(e) {
    e.preventDefault();
    setQuantity(Number(e.target.value));

    setCart(cart);
  }

  return (
    <div>
      {pathname === "/shop" && (
        <form onSubmit={handleSubmit}>
          <button>Quick Add</button>
        </form>
      )}
      {pathname === `/shop/items/${itemId}` && (
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
      )}
      {pathname === "/cart" && (
        <form>
          <label>
            quantity:
            <input
              type="number"
              max={100}
              min={0}
              value={quantity}
              onChange={handleChange}
              onClick={handleClick}
            />
          </label>
        </form>
      )}
    </div>
  );
}
