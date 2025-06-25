"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  LogIn,
  Newspaper,
  MessageSquareText,
  MonitorPlay,
  FolderGit2,
  Users2,
  UserPlus,
} from "lucide-react";

const allFeatures = [
  {
    title: "GitHub Auth",
    desc: "Login seamlessly using your GitHub account.",
    category: "Auth",
    icon: <Github className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: "Secure Route Protection",
    desc: "Guard sensitive routes with Auth0 middleware.",
    category: "Auth",
    icon: <LogIn className="w-6 h-6 text-emerald-500" />,
  },

  {
    title: "Post Dev Logs",
    desc: "Share progress updates and status like mini-tweets.",
    category: "Feed",
    icon: <Newspaper className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: "Like and Comment",
    desc: "Engage with other devs’ updates and discussions.",
    category: "Feed",
    icon: <MessageSquareText className="w-6 h-6 text-emerald-500" />,
  },

  {
    title: "Showcase Projects",
    desc: "Highlight and link your best work directly from GitHub.",
    category: "Showcase",
    icon: <MonitorPlay className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: "GitHub Integration",
    desc: "Display GitHub stats and pinned repositories.",
    category: "Showcase",
    icon: <FolderGit2 className="w-6 h-6 text-emerald-500" />,
  },

  {
    title: "Follow Developers",
    desc: "Build your dev circle by following like-minded peers.",
    category: "Social",
    icon: <Users2 className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: "Collaborate & Connect",
    desc: "Comment, like, and collaborate with fellow devs.",
    category: "Social",
    icon: <UserPlus className="w-6 h-6 text-emerald-500" />,
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
    <section className="mt-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
        Explore <span className="text-emerald-500">Dev–Linked</span> Features
      </h2>
      {/* Category Tabs */}
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer
              ${
                activeTab === cat
                  ? "bg-emerald-500 text-white"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feature Cards */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center px-4"
      >
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
              <p className="text-neutral-300 text-sm leading-snug">{f.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
