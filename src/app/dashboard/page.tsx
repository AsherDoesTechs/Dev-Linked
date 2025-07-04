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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function DashboardPage() {
  const { user } = useUser();

  const [posts, setPosts] = useState<any[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editPreview, setEditPreview] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!filterTag) return posts;
    return posts.filter((post) => post.tags?.includes(filterTag));
  }, [posts, filterTag]);

  // Load posts
  useEffect(() => {
    const stored = localStorage.getItem("devlinked-posts");
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  // Save posts
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
    setShowToast("DevLog posted!");
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleDeletePost = (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this DevLog?");
    if (!confirmed) return;

    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    setShowToast("DevLog deleted.");
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleEditClick = (post: any) => {
    setEditingPost(post);
    setEditContent(post.content);
    setEditPreview(false);
  };

  const handleUpdatePost = () => {
    const min = 50;
    const max = 500;

    if (editContent.length < min) {
      setShowToast(
        `You're almost there! Write at least ${
          min - editContent.length
        } more characters.`
      );
      return;
    }

    if (editContent.length > max) {
      setShowToast(
        `Oops! You've exceeded the limit by ${
          editContent.length - max
        } characters. Try trimming it down.`
      );
      return;
    }

    const updated = posts.map((p) =>
      p.id === editingPost.id ? { ...p, content: editContent } : p
    );
    setPosts(updated);
    setEditingPost(null);
    setEditContent("");
    setShowToast("DevLog updated.");
    setTimeout(() => setShowToast(null), 3000);
  };

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
            onPost={({ content, tags }) => {
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
                  onEdit={() => handleEditClick(post)}
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
              {showToast}
            </div>
          )}
        </div>
      </section>

      {editingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-full max-w-2xl shadow space-y-4">
            <h2 className="text-xl font-bold">✏️ Edit DevLog</h2>

            <button
              onClick={() => setEditPreview(!editPreview)}
              className="text-sm text-blue-600 underline"
            >
              {editPreview ? "Back to Edit" : "Preview"}
            </button>

            {!editPreview ? (
              <>
                <textarea
                  rows={8}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 rounded-lg border dark:border-neutral-700 dark:bg-neutral-800 bg-neutral-100 resize-y"
                />
                <div className="text-right text-sm text-neutral-500">
                  {editContent.length} / 500 characters
                </div>
              </>
            ) : (
              <div className="prose dark:prose-invert p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border dark:border-neutral-700">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {editContent || "*Nothing to preview...*"}
                </ReactMarkdown>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 text-sm bg-neutral-200 dark:bg-neutral-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePost}
                className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
