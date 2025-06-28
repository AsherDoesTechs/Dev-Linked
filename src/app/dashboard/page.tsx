// DashboardPage.tsx
"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import PostCard from "@/app/components/PostCard";
import PostComposer from "@/app/components/PostComposer";
import useUser from "@/app/lib/useUser";
import { v4 as uuid } from "uuid";

export default function DashboardPage() {
  const { user } = useUser();

  const [posts, setPosts] = useState<any[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Load posts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("devlinked-posts");
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem("devlinked-posts", JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = (content: string, tags: string[]) => {
    const newPost = {
      id: uuid(),
      username: user?.username || "you",
      avatarUrl: user?.picture || "/placeholder-avatar.png",
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      tags,
    };
    setPosts([newPost, ...posts]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDeletePost = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("devlinked-posts", JSON.stringify(updated));
  };

  const filteredPosts = useMemo(() => {
    if (!filterTag) return posts;
    return posts.filter((post) => post.tags?.includes(filterTag));
  }, [posts, filterTag]);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans transition-colors duration-300">
      <NavBar />

      <section className="max-w-7xl mx-auto flex gap-8 px-6 py-16">
        <Sidebar />

        <div className="flex-1 max-w-3xl">
          <motion.h1
            className="text-4xl font-bold mb-10 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🧠 Your Dev Feed
          </motion.h1>

          {user && (
            <motion.div
              className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow mb-10 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  @{user.username || "you"} • DevLog Explorer
                </p>
              </div>
            </motion.div>
          )}

          <PostComposer
            onPost={({
              content,
              tags,
            }: {
              content: string;
              tags: string[];
            }) => {
              const newDevLog = {
                id: uuid(),
                username: user?.username || "you",
                avatarUrl: user?.picture || "/placeholder-avatar.png",
                content,
                timestamp: new Date().toISOString(),
                likes: 0,
                tags,
              };
              const updatedPosts = [newDevLog, ...posts];
              setPosts(updatedPosts);
              localStorage.setItem(
                "devlinked-posts",
                JSON.stringify(updatedPosts)
              );
            }}
          />

          {filterTag && (
            <div className="mb-4 text-sm text-blue-600">
              Showing posts with tag:{" "}
              <span className="font-semibold">#{filterTag}</span>
              <button
                onClick={() => setFilterTag(null)}
                className="ml-2 text-red-500 hover:underline"
              >
                Clear
              </button>
            </div>
          )}

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onTagClick={setFilterTag}
                  onDelete={handleDeletePost}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-500 text-lg mb-4">
                  No posts found. Try clearing the filter or creating a new
                  post.
                </p>
              </div>
            )}
          </motion.div>

          {showToast && (
            <div className="fixed bottom-6 right-6 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg shadow-lg text-sm z-50">
              DevLog posted!
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
