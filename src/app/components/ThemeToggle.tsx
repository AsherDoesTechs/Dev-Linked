"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // prevent hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-xl p-2 rounded-full cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 ease-in-out active:scale-110 transform"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
