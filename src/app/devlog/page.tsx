"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function EditDevLogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Toast states
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/devlogs/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError("Failed to load DevLog.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const min = 50;
  const max = 500;

  const handleUpdate = async () => {
    if (!title || !content) {
      setError("Title and content cannot be empty.");
      return;
    }
    if (content.length < min) {
      setError(
        `You're almost there! Write at least ${
          min - content.length
        } more characters.`
      );
      return;
    }

    if (content.length > max) {
      setError(
        `Oops! You've exceeded the limit by ${
          content.length - max
        } characters. Try trimming it down.`
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/devlogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error();

      triggerToast("DevLog updated successfully!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setError("Failed to update DevLog.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="min-h-screen px-6 py-12 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">✏️ Edit DevLog</h1>

        {error && (
          <p className="text-red-600 bg-red-100 dark:bg-red-900 p-2 rounded">
            {error}
          </p>
        )}

        <input
          type="text"
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
          <>
            <textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-neutral-700 dark:bg-neutral-800 bg-neutral-100 resize-y"
            />
            <div className="text-right text-sm text-neutral-500">
              {content.length} / 500 characters
            </div>
          </>
        ) : (
          <div className="prose dark:prose-invert bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg border dark:border-neutral-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content || "*Nothing to preview...*"}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={submitting}
            className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-semibold disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ✅ Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg shadow-lg text-sm z-50 transition-opacity duration-300 animate-fade-in">
          {toastMessage}
        </div>
      )}
    </main>
  );
}
