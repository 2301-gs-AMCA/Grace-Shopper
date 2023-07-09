import { useContext } from "react";
import { CartContext } from "../components/Cart/CartProvider";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
