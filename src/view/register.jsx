import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { supabase } from "../lib/supabase";

import ThemeToggle from "../components/themeToggle";

import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  const { data, error } =
    await supabase.auth.signUp({

      email,

      password,

      options: {

        data: {

          username

        }

      }

    });

  if (error) {

    alert(error.message);

    return;
  }

  console.log("USER ID:", data.user.id);
  
  const { error: profileError } =
  await supabase
    .from("profiles")
    .insert({

      id: data.user.id,

      username,

      email,

      points: 0

    });

console.log("PROFILE ERROR:", profileError);

  if (profileError) {

    alert(profileError.message);

    return;
  }

  alert("Account created successfully");

  navigate("/login");
};

  return (

    <div className="auth-container">

      <div className="auth-theme-action">

        <ThemeToggle />

      </div>

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
