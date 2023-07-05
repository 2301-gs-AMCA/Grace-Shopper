import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import Profile from "./components/Profile";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart";
import AuthForm from "./Components/AuthForm";
import Dashboard from "./components/Dashboard";
import Reviews from "./ProfileLinks/Reviews";
import Settings from "./ProfileLinks/Settings";
import Security from "./ProfileLinks/Security";

import Items from "./components/Shop/Items";
import SingleItem from "./components/Shop/SingleItem";

import ItemPage from "./components/ItemPage";
import "./App.css";

import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import CategoryItems from "./components/Shop/CategoryItems";

function App() {
  const { user } = useAuth();
  const [err, setErr] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />

        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<CategoryItems />} />
        <Route path="/shop/items/:itemId" element={<SingleItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/reviews/:userId" element={<Reviews />} />
        <Route path="/dashboard/settings/:userId" element={<Settings />} />
        <Route path="/dashboard/security/:userId" element={<Security />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
