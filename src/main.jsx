import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { AuthProvider } from "./context/authcontext";

import "./styles/global.css";

const savedTheme =
  localStorage.getItem("theme");

const prefersDark =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

if (
  savedTheme === "dark" ||
  (!savedTheme && prefersDark)
) {

  document.body.classList.add("dark-mode");
  document.documentElement.dataset.theme = "dark";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>
      <App />
    </AuthProvider>

  </React.StrictMode>
);
