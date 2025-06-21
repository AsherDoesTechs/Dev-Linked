"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Newspaper, MonitorPlay, Users } from "lucide-react";

const allFeatures = [
  {
    title: "GitHub Auth",
    category: "Auth",
    icon: <Github className="w-6 h-6 text-emerald-500" />,
    desc: "Secure login using your GitHub account.",
  },
  {
    title: "Dev Feed",
    category: "Feed",
    icon: <Newspaper className="w-6 h-6 text-emerald-500" />,
    desc: "Browse developer logs, updates, and projects.",
  },
  {
    title: "Showcase Projects",
    category: "Showcase",
    icon: <MonitorPlay className="w-6 h-6 text-emerald-500" />,
    desc: "Display your GitHub work and portfolio.",
  },
  {
    title: "Dev Connections",
    category: "Social",
    icon: <Users className="w-6 h-6 text-emerald-500" />,
    desc: "Connect with other developers and grow your network.",
  },
];

const categories = ["All", "Auth", "Feed", "Showcase", "Social"];

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? allFeatures
      : allFeatures.filter((f) => f.category === activeTab);

  return (
    <section className="py-12 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
          Explore <span className="text-emerald-500">Dev–Linked</span> Features
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`cursor-pointer px-4 py-1.5 rounded-full border text-sm font-medium transition duration-200 ${
                activeTab === cat
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                  : "bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feature Cards */}
        <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((f) => (
              <motion.div
                key={f.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white/10 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-2">{f.icon}</div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {f.title}
                </h3>
                <p className="text-neutral-300 text-sm leading-snug">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
