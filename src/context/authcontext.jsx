import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] = useState(
    storedUser || null
  );

  const login = (userData) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const register = (userData) => {

    const newUser = {
      ...userData,

      points: 0,

      completedChallenges: []
    };

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  };

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);
  };

  const completeChallenge = (challenge) => {

    if (
      user.completedChallenges.includes(challenge.id)
    ) {
      return;
    }

    const updatedUser = {

      ...user,

      points:
        user.points + challenge.points,

      completedChallenges: [
        ...user.completedChallenges,
        challenge.id
      ]
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        completeChallenge
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}