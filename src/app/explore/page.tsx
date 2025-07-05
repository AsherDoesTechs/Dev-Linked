"use client";

import NavigationsLinks from "@/app/components/NavigationsLinks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchDevlogs } from "@/app/lib/fetchDevLogs";
import { fetchGitHubProjects } from "@/app/lib/fetchGithubRepos"; // add this
import { motion } from "framer-motion";

const filters = ["Trending", "Newest", "Developers", "Projects"];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [devlogs, setDevlogs] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const username = "AsherDoesTechs"; // 👈 Replace with real GitHub username

  // Infinite scroll for devlogs
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
    if (activeFilter === "Projects") {
      setLoading(true);
      fetchGitHubProjects(username).then((data) => {
        setRepos(data);
        setFilteredRepos(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      fetchDevlogs(page).then((newData) => {
        setDevlogs((prev) => (page === 0 ? newData : [...prev, ...newData]));
        setLoading(false);
      });
    }
  }, [activeFilter, page]);

  useEffect(() => {
    setFilteredRepos(
      repos.filter((repo: any) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, repos]);

  const mockDevlogs = [
    {
      id: 1,
      user: "AsherDoesTech",
      avatar: "/avatar1.png",
      timestamp: "2h ago",
      tags: ["Next.js", "Tailwind"],
      content: "🚀 Just added dark mode toggle with Tailwind CSS!",
    },
    {
      id: 2,
      user: "DevWizard",
      avatar: "/avatar2.png",
      timestamp: "5h ago",
      tags: ["React", "Open Source"],
      content: "Contributed to an open-source React hook library today 🔥",
    },
    {
      id: 3,
      user: "CodeNinja",
      avatar: "/avatar3.png",
      timestamp: "1d ago",
      tags: ["TypeScript", "Node.js"],
      content: "Refactored my Node.js backend to use TypeScript strictly 💪",
    },
  ];

  const filteredDevlogs = mockDevlogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTag = activeTag ? log.tags.includes(activeTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen px-6 py-16 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Explore</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover developers, projects, and devlogs from the community.
        </p>
      </section>

      <NavigationsLinks />
      {/* DevLog Search */}
      {activeFilter !== "Projects" && (
        <>
          <section className="max-w-xl mx-auto mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search DevLogs..."
              spellCheck={false}
              className="w-full px-4 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-900 dark:text-white shadow"
            />
          </section>

          {/* Tag Filter Pills */}
          <section className="flex flex-wrap justify-center gap-3 mb-8">
            {["Next.js", "Tailwind", "React", "Node.js", "Open Source"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    activeTag === tag
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white"
                  }`}
                >
                  #{tag}
                </button>
              )
            )}
          </section>
        </>
      )}

      <section className="flex justify-center gap-4 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setDevlogs([]);
              setRepos([]);
              setPage(0);
              setSearch("");
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

      {/* DevLogs View */}
      {activeFilter !== "Projects" && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredDevlogs.map((log, i) => (
              <motion.div
                key={log.id}
                className="p-6 rounded-xl shadow-md bg-neutral-100 dark:bg-neutral-900 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={log.avatar}
                    alt={log.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{log.user}</p>
                    <p className="text-sm text-neutral-500">{log.timestamp}</p>
                  </div>
                </div>

                <p>{log.content}</p>

                <div className="flex gap-2 flex-wrap text-sm">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 text-xl text-neutral-500 pt-2">
                  <span>🔥</span>
                  <span>❤️</span>
                  <span>💬</span>
                </div>
              </motion.div>
            ))}
          </section>
          <div ref={loaderRef} className="text-center py-10">
            {loading && <p className="text-neutral-500">Loading more...</p>}
          </div>
        </>
      )}

      {/* GitHub Projects View */}
      {activeFilter === "Projects" && (
        <section className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <input
              type="text"
              placeholder="Search GitHub projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border rounded-lg bg-white dark:bg-neutral-900 dark:border-neutral-700 text-black dark:text-white"
            />
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredRepos.map((repo: any, i) => (
              <motion.a
                href={repo.html_url}
                target="_blank"
                key={repo.id}
                className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow-md hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <h3 className="text-xl font-semibold">{repo.name}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  {repo.description || "No description"}
                </p>
                <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <span>⭐ {repo.stargazers_count}</span>
                  {repo.language && <span>🛠 {repo.language}</span>}
                  <span>📦 {repo.visibility}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {loading && (
            <p className="text-center text-neutral-500 mt-8">Loading...</p>
          )}
        </section>
      )}
    </main>
  );
}
