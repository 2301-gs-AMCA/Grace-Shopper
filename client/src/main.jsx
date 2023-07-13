import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import AuthProvider from "./Components/AuthProvider.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import CartProvider from "./components/Cart/CartProvider.jsx";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);
