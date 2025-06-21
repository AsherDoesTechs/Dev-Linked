"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") === "dark";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl p-2 rounded-full cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 ease-in-out active:scale-110 transform"
      aria-label="Toggle Theme"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
