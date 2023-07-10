import { createContext, useState, useEffect } from "react";
import { fetchMyCart, fetchUsersOrders } from "../../api/auth";
import {
  getCurrentOrder,
  getUsersOrders,
  patchOrder,
  postOrder,
} from "../../api/orders";
import useAuth from "../../hooks/useAuth";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user, setUser, loggedIn } = useAuth();
  const [orderId, setOrderId] = useState(null);
  const [cart, setCart] = useState({
    id: null,
    userId: user.id,
    isCart: true,
    isComplete: false,
    totalPrice: 0,
    items: [],
  });

  useEffect(() => {
    if (user) {
      async function getMyCart() {
        const result = await fetchMyCart();

        if (result.success) {
          console.log("result in getMyCart", result);
          setCart(result.order);
          return;
        } else {
          setCart({
            id: cart.id,
            userId: user.id,
            isCart: true,
            isComplete: false,
            totalPrice: 0,
            items: [],
          });
        }
      }

      /*let thisCart = JSON.parse(localStorage.getItem("cart"));
      console.log("thisCart from local:", thisCart);
      if (thisCart.id !== null) {
        if (thisCart.userId !== user.id) {
          thisCart.userId = user.id;
          async function updateOrder() {
            const result = await patchOrder(thisCart);
            setCart(result.order);
          }
          updateOrder();

          setCart(thisCart);
        } else {
          setCart(cart);
        }
        console.log(user);
        setCart(cart);
        return;
      }*/
      getMyCart();
    }
  }, [loggedIn, user, cart.isComplete, orderId]);

  const contextValue = {
    cart,
    setCart,
    orderId,
    setOrderId,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
