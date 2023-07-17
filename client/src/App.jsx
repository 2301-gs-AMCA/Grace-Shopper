import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Reviews from "./ProfileLinks/Reviews";
import Settings from "./ProfileLinks/Settings";
import OrderHistory from "./ProfileLinks/OrderHistory";
import Checkout from "./components/Checkout";
import Billing from "./components/Billing";

import SingleItem from "./components/Shop/SingleItem";
import Searchbar from "./components/SearchBar";

import ItemPage from "./components/ItemPage";
import "./App.css";

import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import CategoryItems from "./components/Shop/CategoryItems";
import ConfirmationPage from "./components/ConfirmationPage";
import ErrorPage from "./components/Error";
import CheckoutForm from "./components/CheckoutForm";
import { motion as m } from "framer-motion";
function App() {
  const { user } = useAuth();
  const [err, setErr] = useState(null);

  return (
    <m.div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<CategoryItems />} />
        <Route path="/shop/items/:itemId" element={<SingleItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/reviews/:userId" element={<Reviews />} />
        <Route path="/dashboard/settings/:userId" element={<Settings />} />
        <Route
          path="/dashboard/orderHistory/:userId"
          element={<OrderHistory />}
        />
        <Route path="/billing" element={<Billing />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </m.div>
  );
}

export default App;
