"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("DevLogs");

  const tabs = ["DevLogs", "Projects", "Likes", "Settings"];

  return (
    <main className="min-h-screen px-6 py-16 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300">
      {/* Profile Header */}
      <section className="text-center mb-10">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        <h1 className="text-2xl font-bold">AsherDoesTechs</h1>
        <p className="text-neutral-600 dark:text-neutral-400">@asher</p>
        <p className="mt-4 text-sm max-w-md mx-auto">
          Frontend developer passionate about building clean UI, cool tools, and
          contributing to dev communities. 🌱
        </p>

        {/* Profile Stats */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          <span>📝 12 DevLogs</span>
          <span>💬 32 Comments</span>
          <span>❤️ 75 Likes</span>
        </div>
      </section>

      {/* Tabs */}
      <section className="flex justify-center gap-4 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto">
        {activeTab === "DevLogs" && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-sm text-neutral-400 mb-2">2 days ago</p>
                <p>
                  🚀 Just launched my portfolio built with Next.js and Tailwind!
                </p>
                <div className="flex space-x-4 pt-2 text-neutral-500">
                  <span>💬 2</span>
                  <span>❤️ 10</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "Projects" && (
          <div className="text-center text-neutral-500">
            Projects will be displayed here.
          </div>
        )}

        {activeTab === "Likes" && (
          <div className="text-center text-neutral-500">
            Liked posts will show up here.
          </div>
        )}

        {activeTab === "Settings" && (
          <div className="text-center text-neutral-500">
            User settings (profile edit, etc.) coming soon.
          </div>
        )}
      </section>
    </main>
  );
}
