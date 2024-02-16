import { createContext, useState, useContext } from "react";
import { loginUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    name: "",
    email: "",
    avatar_url: "",
    club: "",
  });

  const login = async (userInput) => {
    try {
      const user = {
        username: userInput.formattedUsername,
        password: userInput.password,
      };
      const response = await loginUser(user);
      if (response.status === true) {
        const user = response.user;
        setUser({
          userId: user.user_id,
          username: user.username,
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
          club: user.club,
        });
      }
      return response;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser({
      userId: "",
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
