import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../api/auth";
// Create the context
export const AuthContext = createContext();

// Create our Provider (wrapper component)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    username: "Guest",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState({
    id: null,
    userId: 1,
    totalPrice: null,
    items: [],
  });

  useEffect(() => {
    async function getFetchMe() {
      try {
        const result = await fetchMe();

        if (result.success && result.user.id > 1) {
          setLoggedIn(true);
          setUser(result.user);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
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
