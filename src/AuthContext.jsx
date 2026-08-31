
import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const login = (userData) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "furnitureUser",
      JSON.stringify(userData)
    );

    setIsLoggedIn(true);
  };

  const logout = () => {
    // Logout only
    // Do NOT delete the user account
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
