import { useNavigate } from "react-router";
import { logout } from "../api/auth";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const { user, setUser, loggedIn, setLoggedIn } = useAuth();
  const { setCart, cart } = useCart();

  const [navButtons, setNavButtons] = useState("");

  async function handleLogout() {
    await logout();
    //setUser({ id: 1, username: "Guest", iat: null });
    setCart(cart);
    setLoggedIn(false);
    nav("/");
  }
  useEffect(() => {
    function resetTop() {
      if (nav) {
        window.scroll(0, 0);
      }
    }
    return resetTop();
  }, []);

  useEffect(() => {
    function headerButtons(loggedIn) {
      let html = "";

      if (!loggedIn && user.isGuest) {
        html = (
          <div>
            <ul className="navlinks">
              <li>
                <button className="link" onClick={() => nav("/")}>
                  Home
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/login")}>
                  Login/Register
                </button>
              </li>
              <li>
                <button
                  className="link"
                  onClick={() => nav("/dashboard/profile")}
                >
                  Profile
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/shop")}>
                  Shop
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/cart")}>
                  <img
                    src="https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png"
                    style={{ width: "30px", height: "40px" }}
                  />
                </button>
              </li>
            </ul>
          </div>
        );
      } else {
        let adminhtml = "";
        //builds the DASHBOARD button for Admin in nav
        if (user.isAdmin) {
          adminhtml = (
            <li>
              <button className="link" onClick={() => nav("/dashboard")}>
                Dashboard
              </button>
            </li>
          );
        }
        html = (
          <div>
            <ul className="navlinks">
              <li>
                <button className="link" onClick={() => nav("/")}>
                  Home
                </button>
              </li>
              <li>
                <button className="link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li>
                <button
                  className="link"
                  onClick={() => nav("/dashboard/profile")}
                >
                  Profile
                </button>
              </li>
              {/* Dashboard */}
              <li>
                <button className="link" onClick={() => nav("/shop")}>
                  Shop
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/cart")}>
                  <img
                    src="https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png"
                    style={{ width: "30px", height: "40px" }}
                  />
                </button>
              </li>
            </ul>
          </div>
        );
      }
      return setNavButtons(html);
    }
    headerButtons(loggedIn);
  }, [loggedIn, user]);

  return (
    <div className="navbar">
      <h1>A More Comfortable Area</h1>
      <div>{navButtons}</div>
    </div>
  );
}
