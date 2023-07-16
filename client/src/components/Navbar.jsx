import { useNavigate } from "react-router";
import { logout } from "../api/auth";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const { user, setUser, loggedIn, setLoggedIn } = useAuth();
  const { setCart, cart, isCounted } = useCart();

  const [navButtons, setNavButtons] = useState("");
  const [count, setCount] = useState(0);
  async function handleLogout() {
    await logout();
    //setUser({ id: 1, username: "Guest", iat: null });
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

  /*useEffect(() => {
    function headerButtons(loggedIn) {
      let html = "";

      if (user.isGuest) {
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
                  <p className="counter">{count}</p>
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
        //builds the DASHBOARD button for Admin in nav

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
              //{ Dashboard }
              <li>
                <button className="link" onClick={() => nav("/shop")}>
                  Shop
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/cart")}>
                  <p className="counter">{count}</p>
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
  }, [loggedIn, user]);*/

  return (
    <div id="navbar" className="navbar">
      <h1>A More Comfortable Area</h1>
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
            <li>
              <button className="link" onClick={() => nav("/dashboard")}>
                Dashboard
              </button>
            </li>
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
            <button className="link" onClick={() => nav("/shop")}>
              Shop
            </button>
          </li>
          <li>
            <button className="link" onClick={() => nav("/cart")}>
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
