import { Route, Routes } from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import "./App.css";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import "./App.css";

function App() {
  const { user } = useAuth();
  const [err, setErr] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<AuthForm />} />
        <Route path="/Register" element={<AuthForm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
