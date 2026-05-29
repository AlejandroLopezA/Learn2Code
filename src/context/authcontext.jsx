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

  const [loading, setLoading] =
    useState(true);

    
  console.log(
    "AUTH RENDER",
    { user, loading }
  );

useEffect(() => {

  const loadUser = async () => {

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (session) {

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

      if (profile) {

        setUser({
          ...profile,
            completedChallenges:
              profile.completed_challenges || []
        });
      }
    }

    setLoading(false);
  };

  loadUser();

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

const completeChallenge = async (
  challenge
) => {

  console.log("USER:", user);
  console.log("USER ID:", user?.id);

  if (
    user.completedChallenges.includes(
      challenge.id
    )
  ) {
    return;
  }

  const updatedChallenges = [
    ...user.completedChallenges,
    challenge.id
  ];

  const newPoints =
    user.points + challenge.points;

  const { error } =
    await supabase
      .from("profiles")
      .update({
        points: newPoints,

        completed_challenges:
          updatedChallenges
      })
      .eq("id", user.id);

  if (error) {

    console.log(error);

    return;
  }

  const updatedUser = {

    ...user,

    points: newPoints,

    completedChallenges:
      updatedChallenges
  };

  setUser(updatedUser);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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