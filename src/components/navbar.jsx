import { Link, useLocation, useNavigate } from "react-router-dom";

import { Code2, Trophy, User, House, LogOut, LogIn, UserPlus} from "lucide-react";

import { useAuth } from "../context/authcontext";

import "../styles/navbar.css";

function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path
      ? "active-link"
      : "";
  };

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="logo">

        <Code2 size={28} />

        <h2>Learn2Code</h2>

      </div>

      <nav>

        {user ? (
          <>

            <Link
              className={isActive("/")}
              to="/"
            >
              <House size={18} />
              Home
            </Link>

            <Link
              className={isActive("/challenges")}
              to="/challenges"
            >
              <Code2 size={18} />
              Challenges
            </Link>

            <Link
              className={isActive("/ranking")}
              to="/ranking"
            >
              <Trophy size={18} />
              Ranking
            </Link>

            <Link
              className={isActive("/profile")}
              to="/profile"
            >
              <User size={18} />
              Profile
            </Link>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>

          </>
        ) : (
          <>

            <Link
              className={isActive("/login")}
              to="/login"
            >
              <LogIn size={18} />
              Login
            </Link>

            <Link
              className={isActive("/register")}
              to="/register"
            >
              <UserPlus size={18} />
              Register
            </Link>

          </>
        )}

      </nav>

    </header>
  );
}

export default Navbar;