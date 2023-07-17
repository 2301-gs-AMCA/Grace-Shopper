import { createContext, useState, useEffect } from "react";
import { fetchMyCart, fetchUsersOrders } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState(null);
  const [isCounted, setIsCounted] = useState(false);
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

      getMyCart();
    }
  }, [user.id, cart.id, cart.isComplete, orderId, isCounted]);

  const contextValue = {
    cart,
    setCart,
    orderId,
    setOrderId,
    isCounted,
    setIsCounted,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
