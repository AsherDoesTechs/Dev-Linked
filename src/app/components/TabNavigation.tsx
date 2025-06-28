"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({
  tabs,
  activeTab,
  setActiveTab,
}: TabNavigationProps) {
  return (
    <section className="flex justify-center gap-4 mb-10 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={clsx(
            "relative px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap cursor-pointer hover",
            activeTab === tab
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
          )}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 w-full h-1 bg-white dark:bg-black rounded-t-md"
            />
          )}
        </button>
      ))}
    </section>
  );
}
