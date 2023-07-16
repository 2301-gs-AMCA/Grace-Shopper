import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { postOrder } from "../../api/orders";
import { patchOrderItem, postOrderItem } from "../../api/order_items";
import { fetchMyCart } from "../../api/auth";
import RemoveCartItem from "./RemoveCartItem";

export default function AddToCart({ item, handleClick, setThisQuantity }) {
  const { pathname } = useLocation();
  const { itemId, category } = useParams();
  const { user, setUser } = useAuth();
  const { cart, setCart, orderId, setOrderId, isCounted, setIsCounted } =
    useCart();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  function addNewCart() {
    console.log("user", user);
    if (!cart.id) {
      async function postNewOrder() {
        const result = await postOrder(user.id);
        setOrderId(result.order.id);
        cart.id === result.order.id;
        setCart(cart);
        if (cart.items.length === 0) {
          async function postNewOrderItem() {
            const result2 = await postOrderItem(
              result.order.id,
              item.id,
              item.quantity
            );
            return result2;
          }
          postNewOrderItem();
          setIsCounted(!isCounted);
          cart.items.push(item);
          cart.totalPrice = cart.totalPrice;
          updateCart();
        }
        return result;
      }
      postNewOrder();
    }
  }
  /////////////////////////////////////////////////////////////////
  function updateItems() {
    console.log("item update", item);
    console.log("cart update", cart);
    async function updateOrderItem() {
      const result = await patchOrderItem(
        item.order_item_id,
        cart.id,
        item.id,
        item.quantity
      );
      updateCart();
      setQuantity(1);
      if (result.success) {
        window.alert(result.message);
      }
      return result.order_item;
    }
    updateOrderItem();
  }
  //////////////////////////////////////////////////////////
  function addNewItems() {
    console.log("cart before addNewItems", cart);
    console.log("item.quantity", item.quantity);
    console.log("quantity", quantity);
    item.quantity = quantity;
    async function addOrderItem() {
      const result = await postOrderItem(cart.id, item.id, item.quantity);
      setIsCounted(!isCounted);
      setCart(cart);
      if (result.success) {
        window.alert(result.message);
      }
      item.order_item_id = result.orderItem.id;
      return result;
    }
    addOrderItem();
  }
  ////////////////////////////////////////////////////////
  function updateCart() {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  ///////////////////////////////////////////////////
  useEffect(() => {
    cart.userId = user.id;
    item.quantity = quantity;
    item.subtotal = item.cost * quantity;
    try {
      async function getMyCart() {
        const result = await fetchMyCart();
        if (result.success) {
          console.log("result in getMyCart", result);
          setCart(result.order);
          return;
        } else {
          setCart(cart);
        }
      }
      getMyCart();
    } catch (error) {
      console.error(error);
    }
  }, []);
  ///////////////////////////////////////////////////
  function handleSubmit(e) {
    e.preventDefault();

    if (!cart.id) {
      addNewCart();
      return;
    }

    let found = cart.items.find((thisItem) => thisItem.id === item.id);
    if (found) {
      for (let thatItem of cart.items) {
        if (item.id === thatItem.id) {
          cart.totalPrice += item.subtotal;
          //got the item to have order_item_id in shop if cart already has item
          item.order_item_id = thatItem.order_item_id;
          if (pathname === "/shop" || pathname === `/shop/${category}`) {
            console.log("thatItem.quantity", thatItem.quantity);
            console.log("item.quantity", item.quantity);
            console.log("quantity", quantity);
            item.quantity = thatItem.quantity + 1;
            item.subtotal = item.cost * item.quantity;
          } else if (pathname === `/shop/items/${itemId}`) {
            console.log("thatItem.quantity", thatItem.quantity);
            console.log("item.quantity", item.quantity);
            console.log("quantity", quantity);
            item.quantity = thatItem.quantity + quantity;
          } else {
            item.quantity = thatItem.quantity;
          }
          if (pathname === "/cart") {
            thatItem.quantity += quantity;
          }
          thatItem.subtotal += item.subtotal;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateItems();
          updateCart();
          return;
        }
      }
    }

    cart.items.push(item);
    addNewItems();
    setCart(cart);
  }
  function handleChange(e) {
    e.preventDefault();
    setQuantity(Number(e.target.value));

    item.quantity = Number(e.target.value);

    item.subtotal = item.cost * quantity;
    if (pathname === "/cart") {
      if (!user) {
        setUser();
      }
      cart.totalPrice = 0;
      for (let thisItem of cart.items) {
        cart.totalPrice += thisItem.cost * thisItem.quantity;
      }
      setThisQuantity(Number(quantity));
      localStorage.setItem("cart", JSON.stringify(cart));
      updateItems();
      updateCart();
    }
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
              min={1}
              value={item.quantity}
              onChange={handleChange}
              onClick={handleClick}
            />
          </label>
        </form>
      )}
    </div>
  );
}
