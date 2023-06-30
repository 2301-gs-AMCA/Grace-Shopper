import { useEffect } from "react";
import "../App.css";
import useAuth from "../hooks/useAuth";
let cartImg =
  "https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png";

export default function Cart() {
  const { cart } = useAuth();

  useEffect(() => {
    console.log(cart);
  }, []);
  return <div className="cart">Cart</div>;
}
