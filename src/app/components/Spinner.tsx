"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Spinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-white dark:bg-neutral-950"
    >
      <div className="relative w-24 h-24">
        {/* Spinning Border */}
        <div className="absolute inset-0 rounded-full border-4 border-t-green-500 border-green-200 dark:border-green-800 dark:border-t-green-400 animate-spin" />

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo/Logo.png"
            alt="DevLinked Logo"
            width={58}
            height={58}
            className="animate-pulse-glow"
          />
        </div>
      </div>
    </motion.div>
  );
}
