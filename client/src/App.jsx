import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import "./App.css";
import Home from "./Components/Home";

function App() {
  const { user } = useAuth();
  const [err, setErr] = useState(null);

  return (
    <div>
      <div id="header">
        <Link to="/" className="link">
          Home
        </Link>
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
