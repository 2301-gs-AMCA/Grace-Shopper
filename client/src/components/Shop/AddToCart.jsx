import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function AddToCart({ item, handleClick, setThisQuantity }) {
  const { pathname } = useLocation();
  const { itemId } = useParams();
  const { user, cart, setCart } = useAuth();
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [thisCart, setThisCart] = useState(cart);

  useEffect(() => {
    item.quantity = quantity;
    item.subtotal = item.cost * quantity;
    setCart(cart);
    console.log("item in useEffect", item);

    ////////////////////////////////////////////
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
      setThisQuantity(Number(quantity));
      console.log(cart);
      setThisCart(cart);
    }
    ////////////////////////////////////////////////

    console.log("cart end of useEffect", cart);
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
      return;
    }

    let found = thisCart.items.find((thisItem) => thisItem.id === item.id);
    if (found) {
      for (let thatItem of thisCart.items) {
        if (item.id === thatItem.id) {
          cart.totalPrice += item.subtotal;
          console.log("quantity", quantity);
          console.log("thatItem.quantity", thatItem.quantity);
          thatItem.quantity += quantity;
          thatItem.subtotal += item.subtotal;
          setCart(cart);
          return;
        }
      }
      console.log("console cart in if found:", cart);
      return;
    }

    cart.items.push(item);

    ////////////////////////////////////////////////

    /*if (cart.items.indexOf(item)) {
      cart.totalPrice += item.subtotal;
      console.log("cart", cart.items);
      console.log("thisCart", thisCart.items);
      setCart(cart);
    } else {
      cart.items.push(item);
      cart.totalPrice += item.subtotal;
      setCart(cart);
    }*/

    ////////////////////////////////////////////

    /*console.log("cart.items: ", cart.items);
    console.log("thisCart.items", thisCart.items);
    setCart(thisCart);
    for (let thatItem of cart.items) {
      console.log("item: ", item);
      console.log("thatItem: ", thatItem);
      if (item.id === thatItem.id) {
        cart.totalPrice += item.subtotal;
        thatItem.quantity = item.quantity + quantity;
        thatItem.subtotal += item.subtotal;
        item = null;
        setCart(cart);
        return;
      } else {
        cart.items.push(item);
        cart.totalPrice += item.subtotal;
        setCart(cart);
      }
      return;
    }*/
    ////////////////////////////////////////////

    /*if (cart.items.includes(item)) {
      cart.totalPrice += item.subtotal;
      cart.items[item].quantity = quantity;
      setCart(cart);
    } else {
      cart.items.push(item);
      cart.totalPrice += item.subtotal;
      setCart(cart);
    }*/
  }

  function handleChange(e) {
    e.preventDefault();
    setQuantity(Number(e.target.value));
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
