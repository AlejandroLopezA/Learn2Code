import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";

function getInitialTheme() {

  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme) {

    return savedTheme;
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {

  document.body.classList.toggle(
    "dark-mode",
    theme === "dark"
  );

  document.documentElement.dataset.theme = theme;
}

function ThemeToggle() {

  const [theme, setTheme] =
    useState(getInitialTheme);

  const isDark = theme === "dark";

  useEffect(() => {

    applyTheme(theme);

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  const toggleTheme = () => {

    setTheme(
      isDark ? "light" : "dark"
    );
  };

  return (

    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Light mode"
          : "Dark mode"
      }
    >

      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}

    </button>
  );
}

export default ThemeToggle;
