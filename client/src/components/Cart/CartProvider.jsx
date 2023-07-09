import { createContext, useState, useEffect } from "react";
import { fetchMyCart, fetchUsersOrders } from "../../api/auth";
import { getCurrentOrder, getUsersOrders, postOrder } from "../../api/orders";
import useAuth from "../../hooks/useAuth";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user, loggedIn } = useAuth();
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
        } else {
          setCart({
            id: orderId,
            userId: user.id,
            isCart: true,
            isComplete: false,
            totalPrice: 0,
            items: [],
          });
        }
      }
      /*let thisCart = JSON.parse(localStorage.getItem("cart"));
      if (thisCart !== null) {
        setCart(thisCart);
      } else {
        setCart(cart);
      }*/
      cart.userId = user.id;
      if (cart.userId) {
        console.log("cart", cart);
        getMyCart();
      }
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
