"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function NewDevLogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Please fill out both fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    // No backend yet, just simulate
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">📝 Create New DevLog</h1>

        {error && (
          <p className="text-red-600 bg-red-100 dark:bg-red-900 p-2 rounded">
            {error}
          </p>
        )}

        <input
          ref={titleRef}
          type="text"
          placeholder="DevLog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border dark:border-neutral-700 dark:bg-neutral-800 bg-neutral-100"
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">
            Use Markdown for formatting
          </p>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="text-sm underline hover:opacity-80 transition"
          >
            {previewMode ? "Edit" : "Preview"}
          </button>
        </div>

        {!previewMode ? (
          <textarea
            placeholder="What's your progress update?"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-lg border dark:border-neutral-700 dark:bg-neutral-800 bg-neutral-100 resize-y"
          />
        ) : (
          <div className="prose dark:prose-invert bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg border dark:border-neutral-700">
            <ReactMarkdown>
              {content || "*Nothing to preview...*"}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex justify-between">
          <Link href="/dashboard">
            <button className="px-4 py-2 rounded bg-neutral-300 dark:bg-neutral-700 text-sm">
              Cancel
            </button>
          </Link>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-semibold disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post DevLog"}
          </button>
        </div>
      </div>
    </main>
  );
}
