import { useState } from "react";
import { registerUser, login } from "../api/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setUser, setLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result;
      if (pathname === "/register") {
        result = await registerUser(username, password);
      } else {
        result = await login(username, password);
      }

      console.log(result);

      result.success
        ? (alert(result.message),
          setLoggedIn(true),
          setUser(result.user),
          setUsername(""),
          setPassword(""),
          navigate("/profile"))
        : alert(result.error.message);
    } catch (error) {
      setError(result.error.message);
    }
  }

  return (
    <div className="login">
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        {pathname === "/register" ? <h2>Register</h2> : <h2>Login</h2>}
        <br></br>
        <label>Username: </label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="text"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button>Submit</button>
        <br></br>
        {pathname === "/register" ? (
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        )}
      </form>
    </div>
  );
}
