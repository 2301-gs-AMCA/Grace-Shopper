import { useNavigate } from "react-router";

import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const { user, loggedIn, setLoggedIn } = useAuth();
  const [navButtons, setNavButtons] = useState("");

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
                <button className="link" onClick={() => nav("/Login")}>
                  Login/Register
                </button>
              </li>
              <li>
                <button
                  className="link"
                  onClick={() => nav("/dashboard/Profile")}
                >
                  {user.username}
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/Shop")}>
                  Shop
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/Cart")}>
                  Cart
                </button>
              </li>
            </ul>
          </div>
        );
      } else {
        let adminhtml = "";
        if (user.isadmin) {
          adminhtml = (
            <li>
              <button className="link" onClick={() => nav("/Dashboard")}>
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
                <button className="link" onClick={() => nav("/Login")}>
                  Login
                </button>
              </li>
              <li>
                <button
                  className="link"
                  onClick={() => nav("/dashboard/Profile")}
                >
                  {user.username}
                </button>
              </li>
              {adminhtml}
              <li>
                <button className="link" onClick={() => nav("/Shop")}>
                  Shop
                </button>
              </li>
              <li>
                <button className="link" onClick={() => nav("/Cart")}>
                  Cart
                </button>
              </li>
            </ul>
          </div>
        );
      }
      return setNavButtons(html);
    }
    headerButtons(loggedIn);
  }, [loggedIn]);

  return (
    <div className="navbar">
      <h1>A More Comfortable Area</h1>
      <div>{navButtons}</div>
    </div>
  );
}
