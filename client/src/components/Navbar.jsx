import { useNavigate } from "react-router";
import { logout } from "../api/auth";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const { cart, user, setUser, loggedIn, setLoggedIn } = useAuth();
  const [navButtons, setNavButtons] = useState("");

  async function handleLogout() {
    await logout();
    setUser({ id: 1, username: "Guest", iat: null });
    console.log("user", user);
    setLoggedIn(!loggedIn);
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
    function headerButtons(loggedIn) {
      let html = "";
      if (!loggedIn) {
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
                  {user.username}
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
  console.log("current user:", user);
  console.log("cart", cart);
  return (
    <div className="navbar">
      <h1>A More Comfortable Area</h1>
      <div>{navButtons}</div>
    </div>
  );
}
