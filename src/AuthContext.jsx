import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const login = (user) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("furnitureUser", JSON.stringify(user));

    setIsLoggedIn(true);
  };

  const logout = () => {
    // IMPORTANT:
    // We only remove the login session.
    // furnitureUser stays saved.
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