import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [activeHunts, setActiveHunts] = useState([]);
  const [completedHunts, setCompletedHunts] = useState([]);
  const [reload, setReload] = useState(false);
  const isAuthenticated = !!token;
  const authenticate = (token) => {
    setToken(token);
    AsyncStorage.setItem("appToken", token);
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("appToken");
  };

  const value = {
    token,
    isAuthenticated,
    authenticate,
    logout,
    username,
    setUsername,
    activeHunts,
    setActiveHunts,
    completedHunts,
    setCompletedHunts,
    reload,
    setReload,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
