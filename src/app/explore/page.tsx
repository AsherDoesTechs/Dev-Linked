"use client";

import { useEffect, useRef, useState } from "react";
import { fetchDevlogs } from "@/app/lib/fetchDevLogs";
import { motion } from "framer-motion";

const filters = ["Trending", "Newest", "Developers", "Projects"];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [devlogs, setDevlogs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Load more on scroll to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    fetchDevlogs(page).then((newData) => {
      setDevlogs((prev) => [...prev, ...newData]);
      setLoading(false);
    });
  }, [page]);

  return (
    <main className="min-h-screen px-6 py-16 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Explore</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover developers, projects, and devlogs from the community.
        </p>
      </section>

      <section className="flex justify-center gap-4 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setDevlogs([]);
              setPage(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeFilter === filter
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {devlogs.map((log, i) => (
          <motion.div
            key={log.id}
            className="p-6 rounded-xl shadow-md bg-neutral-100 dark:bg-neutral-900 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div>
                <p className="font-semibold">{log.user}</p>
                <p className="text-sm text-neutral-500">DevLog</p>
              </div>
            </div>
            <p>{log.content}</p>
            <div className="flex space-x-3 text-neutral-500">
              <span>💬 3</span>
              <span>❤️ 12</span>
            </div>
          </motion.div>
        ))}
      </section>

      <div ref={loaderRef} className="text-center py-10">
        {loading && <p className="text-neutral-500">Loading more...</p>}
      </div>
    </main>
  );
}
