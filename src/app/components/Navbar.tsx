"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // You can use Heroicons or Lucide
import useUser from "@/app/lib/useUser";

export default function NavBar() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-neutral-950 shadow">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-black dark:text-white">
        Dev–Linked
      </Link>

      {/* Avatar & Dropdown */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none hover:bg-neutral-100 cursor-pointer hover dark:hover:bg-neutral-800 px-3 py-2 rounded-md transition"
          >
            <Image
              src={user.picture || "/default-avatar.png"}
              alt={user.name || "Avatar"}
              width={36}
              height={36}
              className="rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
            />
            <span className="hidden md:inline text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {user.name || "Dev"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50 animate-fadeIn">
              <Link
                href={`/profile/${user.username || "you"}`}
                className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                👤 Profile
              </Link>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                🧠 Dashboard
              </Link>
              <a
                href="/api/auth/logout"
                className="block px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
              >
                🚪 Logout
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
