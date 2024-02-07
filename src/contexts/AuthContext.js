import { createContext, useState, useContext } from "react";
import { loginUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    avatar_url: "",
    club: "",
  });

  const login = async (userInput) => {
    try {
      const response = await loginUser(userInput);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser({
      username: "",
      name: "",
      email: "",
      avatar_url: "",
      club: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
