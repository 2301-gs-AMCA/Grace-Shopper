import { useNavigate } from "react-router";
import "../App.css";

export default function Navbar() {
  const nav = useNavigate();

  return (
    <div className="navbar">
      <h1>A More Comfortable Area</h1>
      <ul className="navlinks">
        <li>
          <button className="link" onClick={() => nav("/")}>
            Home
          </button>
        </li>
        <li>
          <button className="link" onClick={() => nav("/LoginReg")}>
            Login/Register
          </button>
        </li>
        <li>
          <button className="link" onClick={() => nav("/Profile")}>
            Profile
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
}
