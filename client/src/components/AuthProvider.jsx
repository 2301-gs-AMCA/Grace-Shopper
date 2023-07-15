import { createContext, useState, useEffect } from "react";
import { fetchGuest, fetchMe, registerUser } from "../api/auth";
// Create the context
export const AuthContext = createContext();

// Create our Provider (wrapper component)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getFetchMe() {
      try {
        const result = await fetchMe();
        if (result.success) {
          setLoggedIn(true);
          setUser(result.user);
        } else {
          const result2 = await fetchGuest();
          console.log("result2", result2);
          setUser(result2.user);

          setLoggedIn(true);
        }
      } catch (error) {
        setLoggedIn(false);
      }
    }
    getFetchMe();
  }, [loggedIn, setUser, user.isGuest]);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
