"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const features = [
  {
    title: "Post Developer Logs (DevLogs)",
    icon: "📝",
    description:
      "Share your progress, challenges, and learning with others in real-time.",
  },
  {
    title: "Follow & Connect with Other Devs",
    icon: "🔗",
    description:
      "Grow your network and collaborate with like-minded developers.",
  },
  {
    title: "Showcase Your GitHub Projects",
    icon: "📁",
    description:
      "Display your top repositories and pin highlights from GitHub.",
  },
  {
    title: "Like, Comment, and Collaborate",
    icon: "💬",
    description: "Engage with the community and spark collaboration.",
  },
];

export default function FeatureSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const feature = features[index];

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-20 h-56 md:h-48 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full text-center px-4"
        >
          <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            {feature.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
            {feature.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
