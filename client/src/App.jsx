import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import "./App.css";
import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import "./App.css";
import Home from "./Components/Home";

function App() {
  const { user } = useAuth();
  const [err, setErr] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
