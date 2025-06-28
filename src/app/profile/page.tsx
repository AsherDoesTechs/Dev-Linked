"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import NavigationsLinks from "@/app/components/NavigationsLinks";
import ProfileHeader from "@/app/components/ProfileHeader";
import TabNavigation from "@/app/components/TabNavigation";
import AnalyticsDashboard from "@/app/components/AnalyticsDashboard";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("DevLogs");

  const tabs = [
    "DevLogs",
    "Projects",
    "Likes",
    "Followers",
    "Following",
    "Analytics",
    "Settings",
  ];

  const isPrivate = false; // Toggle for public/private profile view

  return (
    <main className="min-h-screen px-6 py-16 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300">
      <NavigationsLinks />

      {/* Profile Header */}
      <ProfileHeader />

      {/* Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Content */}
      <section className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "DevLogs" && (
            <motion.div
              key="DevLogs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
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
                    🚀 Just launched my portfolio built with Next.js and
                    Tailwind!
                  </p>
                  <div className="flex space-x-4 pt-2 text-neutral-500">
                    <span>💬 2</span>
                    <span>❤️ 10</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "Projects" && (
            <motion.div
              key="Projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-neutral-500"
            >
              Projects will be displayed here.
            </motion.div>
          )}

          {activeTab === "Likes" && (
            <motion.div
              key="Likes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-neutral-500"
            >
              Liked posts will show up here.
            </motion.div>
          )}

          {activeTab === "Followers" && (
            <motion.div
              key="Followers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {isPrivate ? (
                <div className="text-center text-neutral-500 italic">
                  This profile is private.
                </div>
              ) : (
                [1, 2, 3].map((user) => (
                  <div
                    key={user}
                    className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-900 px-4 py-3 rounded-lg shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500" />
                      <div>
                        <p className="font-medium">JaneDoe</p>
                        <p className="text-sm text-neutral-500">@janedoe</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition">
                      Follow
                    </button>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === "Following" && (
            <motion.div
              key="Following"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {[1, 2].map((user) => (
                <div
                  key={user}
                  className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-900 px-4 py-3 rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500" />
                    <div>
                      <p className="font-medium">DevGuy</p>
                      <p className="text-sm text-neutral-500">@devguy</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm rounded-full bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white hover:opacity-80 transition">
                    Unfollow
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "Analytics" && <AnalyticsDashboard />}

          {activeTab === "Settings" && (
            <motion.div
              key="Settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-neutral-500"
            >
              User settings (profile edit, etc.) coming soon.
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
