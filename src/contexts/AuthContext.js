import { createContext, useState, useContext } from "react";
import { loginUser } from "../utils/api";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    name: "",
    email: "",
    avatar_url: "",
    club: "",
    exp: 0,
    iat: 0,
  });

  const storeToken = async (token) => {
    await SecureStore.setItemAsync("accessToken", token);
  };

  const login = async (userInput) => {
    try {
      const user = {
        username: userInput.formattedUsername,
        password: userInput.password,
      };
      const response = await loginUser(user);
      if (response.status === "success") {
        storeToken(response.token);
        const user = response.data;
        setUser({
          userId: user.user_id,
          username: user.username,
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
          club: user.club_id,
          exp: user.exp,
          iat: user.iat,
        });
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      setUser({
        userId: "",
        username: "",
        name: "",
        email: "",
        avatar_url: "",
        club: "",
      });
    } catch (error) {
      console.error("error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
