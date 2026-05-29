import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { supabase } from "../lib/supabase";

import { useAuth } from "../context/authcontext";

import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  const { data, error } =
    await supabase.auth.signInWithPassword({

      email,

      password

    });

  console.log("DATA:", data);

  console.log("ERROR:", error);

  if (error) {

    alert(error.message);

    return;
  }

  alert("Login correcto");
  console.log("NAVEGANDO");
  navigate("/");
};

  return (

    <div className="auth-container">

      <div className="auth-left">

        <h1>Learn2Code</h1>

        <p>
          Improve your programming skills solving coding challenges.
        </p>

      </div>

      <div className="auth-right">

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Sign In
          </button>

          <p>

            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;