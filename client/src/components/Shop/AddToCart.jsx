import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function AddToCart({ item, handleClick, setThisQuantity }) {
  const { pathname } = useLocation();
  const { itemId, category } = useParams();
  const { user, cart, setCart } = useAuth();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  useEffect(() => {
    item.quantity = quantity;
    item.subtotal = item.cost * quantity;
    setCart(cart);

    ////////////////////////////////////////////
    if (pathname === "/cart") {
      if (!user) {
        cart.items.userId === 0;
      }
      cart.totalPrice = 0;
      for (let thisItem of cart.items) {
        cart.totalPrice += thisItem.subtotal;
      }

      setThisQuantity(Number(quantity));
      setCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    ///////////////////////////////////////////////
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [quantity]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      cart.items.userId === 0;
    }

    if (cart.items.length === 0) {
      cart.items.push(item);
      cart.totalPrice = cart.totalPrice;
      setCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }

    let found = cart.items.find((thisItem) => thisItem.id === item.id);
    if (found) {
      for (let thatItem of cart.items) {
        if (item.id === thatItem.id) {
          cart.totalPrice += item.subtotal;
          thatItem.quantity += quantity;
          thatItem.subtotal += item.subtotal;
          setCart(cart);
          localStorage.setItem("cart", JSON.stringify(cart));
          return;
        }
      }
    }
    cart.items.push(item);
  }
  function handleChange(e) {
    e.preventDefault();
    setQuantity(Number(e.target.value));
  }

  return (
    <div>
      {(pathname === "/shop" || pathname === `/shop/${category}`) && (
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
