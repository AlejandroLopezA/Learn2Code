import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {

    const fakeUser = {
      username: "Alejandro",
      email: email,
      points: 0,
    };

    setUser(fakeUser);

    localStorage.setItem(
      "user",
      JSON.stringify(fakeUser)
    );
  };

  const register = (username, email, password) => {

    const fakeUser = {
      username,
      email,
      points: 0,
    };

    setUser(fakeUser);

    localStorage.setItem(
      "user",
      JSON.stringify(fakeUser)
    );
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
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