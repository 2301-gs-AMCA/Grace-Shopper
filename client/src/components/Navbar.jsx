import { useNavigate } from "react-router";
import { logout } from "../api/auth";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const { user, setUser, loggedIn, setLoggedIn } = useAuth();
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
        window.scroll(0, 0);
      }
    }
    return resetTop();
  }, []);

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
                    style={{ width: "45px", height: "60px" }}
                  />
                </button>
              </li>
            </ul>
          </div>
        );
      } else {
        let adminhtml = "";
        //builds the DASHBOARD button for Admin in nav
        if (user.isadmin) {
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
                  {user.username} {/*profile*/}
                </button>
              </li>
              {adminhtml} {/*Dashboard*/}
              <li>
                <button className="link" onClick={() => nav("/shop")}>
                  Shop
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/cart")}>
                  <img
                    src="https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png"
                    style={{ width: "45px", height: "60px" }}
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
  return (
    <div className="navbar">
      <h1>A More Comfortable Area</h1>
      <div>{navButtons}</div>
    </div>
  );
}
