import { useNavigate } from "react-router";
import { logout } from "../api/auth";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const { user, setLoggedIn } = useAuth();
  const { setCart, cart, isCounted } = useCart();

  const [count, setCount] = useState(0);
  async function handleLogout() {
    await logout();

    cart.id = 0;
    setCart(cart);
    setLoggedIn(false);
    nav("/");
  }
  useEffect(() => {
    function resetTop() {
      if (nav) {
        window.scrollTo(0, 0);
      }
    }
    return resetTop();
  }, [nav]);

  useEffect(() => {
    if (cart.items) {
      setCount(cart.items.length);
    } else {
      setCount(0);
    }
  }, [isCounted, cart]);

  return (
    <div id="navbar" className="navbar">
      <h1 className="nav-header">A More Comfortable Area</h1>
      <div>
        <ul className="navlinks">
          <li>
            <button className="link" onClick={() => nav("/")}>
              Home
            </button>
          </li>
          {user.isGuest ? (
            <li>
              <button className="link" onClick={() => nav("/login")}>
                Login/Register
              </button>
            </li>
          ) : (
            <li>
              <button className="link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
          {user.isAdmin ? (
            <>
              <li>
                <button
                  className="link"
                  onClick={() => nav("/dashboard/profile")}
                >
                  Profile
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/dashboard")}>
                  Dashboard
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                className="link"
                onClick={() => nav("/dashboard/profile")}
              >
                Profile
              </button>
            </li>
          )}
          <li>
            <button className="shop-navlinks" onClick={() => nav("/shop")}>
              Shop
            </button>
          </li>
          <li>
            <button className="navlinks" onClick={() => nav("/cart")}>
              <p className="counter">{count}</p>
              <img
                src="https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png"
                style={{ width: "30px", height: "40px" }}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
