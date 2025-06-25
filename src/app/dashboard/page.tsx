"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "@/app/components/Navbar";
import PostCard from "@/app/components/PostCard";
import Sidebar from "@/app/components/Sidebar";
import useUser from "@/app/lib/useUser";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function DashboardPage() {
  const { user } = useUser();
  const [newPost, setNewPost] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showMyPostsOnly, setShowMyPostsOnly] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: "1",
      username: "asherdev",
      content: "Just implemented GitHub Auth with Auth0 in Next.js! 🚀",
      tags: ["nextjs", "auth"],
      timestamp: "2 hours ago",
      likes: 7,
    },
    {
      id: "2",
      username: "silentgrinder",
      content: "Designing the dashboard layout before diving into MongoDB. 🔧",
      tags: ["design", "planning"],
      timestamp: "5 hours ago",
      likes: 5,
    },
  ]);

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now().toString(),
        username: user?.username || "you",
        content: newPost,
        tags,
        timestamp: "Just now",
        likes: 0,
      },
      ...posts,
    ]);
    setNewPost("");
    setTags([]);
    setTagInput("");
  };

  const filteredPosts = showMyPostsOnly
    ? posts.filter((p) => p.username === (user?.username || "you"))
    : posts;

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans transition-colors duration-300">
      <NavBar />

      <section className="max-w-7xl mx-auto flex gap-8 px-6 py-16">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Feed */}
        <div className="flex-1 max-w-3xl">
          <motion.h1
            className="text-4xl font-bold mb-10 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🧠 Your Dev Feed
          </motion.h1>

          {/* User Profile */}
          {user && (
            <motion.div
              className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow mb-10 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div>
                <h2 className="text-xl font-bold">
                  {user.name || "Developer"}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  @{user.username || "you"} • DevLog Explorer
                </p>
              </div>
            </motion.div>
          )}

          {/* DevLog Composer */}
          <motion.div
            className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Write your DevLog with Markdown! (Use ```ts or ```js for code)"
              rows={6}
              className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />

            {/* Tag Input */}
            <div className="mt-4">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim()) {
                    e.preventDefault();
                    if (!tags.includes(tagInput.trim())) {
                      setTags([...tags, tagInput.trim()]);
                    }
                    setTagInput("");
                  }
                }}
                placeholder="Add tags like nextjs or devlog (press Enter)"
                className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right mt-3">
              <button
                onClick={handlePost}
                className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                Post DevLog
              </button>
            </div>

            {/* Markdown Preview */}
            {newPost.trim() && (
              <div className="mt-6 border-t pt-4">
                <p className="text-sm font-semibold mb-2 text-neutral-500">
                  Preview:
                </p>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {newPost}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </motion.div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">DevLogs</h2>
            <button
              onClick={() => setShowMyPostsOnly(!showMyPostsOnly)}
              className="text-sm bg-neutral-200 dark:bg-neutral-800 px-4 py-2 rounded-lg hover:opacity-80 transition"
            >
              {showMyPostsOnly ? "Show All Posts" : "Show My Posts"}
            </button>
          </div>

          {/* Feed */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-500 text-lg mb-4">
                  No posts yet. Follow some devs or write your first DevLog!
                </p>
                <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Explore Devs
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
