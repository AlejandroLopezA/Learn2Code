import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { supabase } from "../lib/supabase";

import { useAuth } from "../context/authcontext";

import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const { register } = useAuth();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  const { data, error } =
    await supabase.auth.signUp({

      email,

      password

    });

    if (error) {

      alert(error.message);

      return;
    }

    alert(
      "Account created successfully. Check your email if confirmation is enabled."
    );

    navigate("/login");
  };

  return (

    <div className="auth-container">

      <div className="auth-left">

        <h1>Learn2Code</h1>

        <p>
          Start your programming journey today.
        </p>

      </div>

      <div className="auth-right">

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <h2>Create Account</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

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
            Register
          </button>

          <p>

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;