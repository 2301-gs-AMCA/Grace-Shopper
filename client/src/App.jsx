import { Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar";
import Navbar  from  "./components/Navbar"
import Home from "./components/Home";
import Footer from "./components/Footer";

// import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import "./App.css";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [healthMsg, setHealthMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw {
            message: "Api is Down 😭",
          };
        }
        const { message } = await response.json();
        setHealthMsg(message);
      } catch (error) {
        setErr(error.message);
      }
    }
    checkHealth();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Logout" element={<Logout />} /> */}
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
