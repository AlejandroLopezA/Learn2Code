import {createContext, useContext, useState, useEffect} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] = useState(
    storedUser || null
  );

  useEffect(() => {

  const getSession = async () => {

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (session) {

      setUser({
        email: session.user.email,

        username:
          session.user.email
            .split("@")[0],

        points: 0,

        completedChallenges: []
      });
    }
  };

  getSession();

}, []);

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

  const logout = async () => {

    await supabase.auth.signOut();

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