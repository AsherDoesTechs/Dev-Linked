"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import NavBar from "@/app/components/Navbar";
import PostCard from "@/app/components/PostCard";
import Sidebar from "@/app/components/Sidebar";
import useUser from "@/app/lib/useUser";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { v4 as uuid } from "uuid";

export default function DashboardPage() {
  const { user } = useUser();

  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: "1",
      username: "asherdev",
      avatarUrl: "https://avatars.githubusercontent.com/u/114223650?v=4",
      content: "Just implemented GitHub Auth with Auth0 in Next.js! 🚀",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hrs ago
      likes: 7,
      tags: ["nextjs", "auth0"],
    },
    {
      id: "2",
      username: "silentgrinder",
      avatarUrl: "https://avatars.githubusercontent.com/u/114223650?v=4",
      content: "Designing the dashboard layout before diving into MongoDB. 🔧",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hrs ago
      likes: 5,
      tags: ["dashboard", "mongodb"],
    },
  ]);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: uuid(),
        username: user?.username || "you",
        avatarUrl: user?.picture || "/placeholder-avatar.png",
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        tags,
      },
      ...posts,
    ]);
    setNewPost("");
    setTags([]);
    setTagInput("");
  };

  const filteredPosts = useMemo(() => {
    if (!filterTag) return posts;
    return posts.filter((post) => post.tags?.includes(filterTag));
  }, [posts, filterTag]);

  const suggestedTags = ["nextjs", "devlog", "typescript", "mongodb", "auth0"];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white font-sans transition-colors duration-300">
      <NavBar />

      <section className="max-w-7xl mx-auto flex gap-8 px-6 py-16">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed Area */}
        <div className="flex-1 max-w-3xl">
          <motion.h1
            className="text-4xl font-bold mb-10 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🧠 Your Dev Feed
          </motion.h1>

          {/* User Profile (Top) */}
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
              placeholder="Write your DevLog with Markdown! (```js for code blocks)"
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
                placeholder="Add tags (e.g. nextjs, mongodb)..."
                className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Autocomplete Suggestions */}
              {tagInput && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {suggestedTags
                    .filter((t) => t.includes(tagInput.toLowerCase()))
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (!tags.includes(tag)) {
                            setTags([...tags, tag]);
                          }
                          setTagInput("");
                        }}
                        className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </button>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-3 py-1 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Button */}
            <div className="text-right mt-3">
              <button
                onClick={handlePost}
                className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                Post DevLog
              </button>
            </div>

            {/* Live Markdown Preview */}
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

          {/* Feed Filter Indicator */}
          {filterTag && (
            <div className="mb-4 text-sm text-blue-600">
              Showing posts with tag:{" "}
              <span className="font-semibold">#{filterTag}</span>{" "}
              <button
                onClick={() => setFilterTag(null)}
                className="ml-2 text-red-500 hover:underline"
              >
                Clear
              </button>
            </div>
          )}

          {/* Posts Feed */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onTagClick={setFilterTag} />
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
        </div>
      </section>
    </main>
  );
}
