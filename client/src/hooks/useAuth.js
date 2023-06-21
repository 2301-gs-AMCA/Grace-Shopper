import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
