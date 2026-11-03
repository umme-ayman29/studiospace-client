"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("studiolight");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current) setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "studiolight" ? "studiodark" : "studiolight";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="btn btn-ghost btn-circle">
      {theme === "studiolight" ? <FaMoon /> : <FaSun />}
    </button>
  );
}