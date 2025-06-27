"use client";

import Link from "next/link";

const NavigationLinks = () => {
  return (
    <nav className="flex flex-wrap justify-center gap-4 mb-10">
      <Link href="/dashboard">
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition">
          🧭 Dashboard
        </button>
      </Link>

      <Link href="/profile">
        <button className="px-4 py-2 bg-neutral-800 text-white dark:bg-neutral-100 dark:text-black rounded-lg font-medium hover:opacity-90 transition">
          👤 Profile
        </button>
      </Link>

      <Link href="/devlog">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:opacity-90 transition">
          📝 New DevLog
        </button>
      </Link>

      <Link href="/">
        <button className="px-4 py-2 bg-gray-300 text-black dark:bg-neutral-700 dark:text-white rounded-lg font-medium hover:opacity-90 transition">
          🏠 Home
        </button>
      </Link>
    </nav>
  );
};

export default NavigationLinks;
