import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../api/auth";
// Create the context
export const AuthContext = createContext();

// Create our Provider (wrapper component)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState({
    id: null,
    userId: 0,
    totalPrice: null,
    items: [],
  });

  useEffect(() => {
    async function getFetchMe() {
      try {
        const result = await fetchMe();

        if (result.success) {
          setLoggedIn(true);
          setUser(result.user);
        } else {
          setUser({ username: "Guest" });
          setLoggedIn(false);
        }
      } catch (error) {
        setUser({ username: "Guest" });
        setLoggedIn(false);
      }
    }
    getFetchMe();
  }, [loggedIn]);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
    cart,
    setCart,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
