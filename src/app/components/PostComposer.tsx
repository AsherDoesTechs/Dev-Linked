"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface PostComposerProps {
  onPost: (post: { content: string; tags: string[] }) => void;
}

export default function PostComposer({ onPost }: PostComposerProps) {
  const [newPost, setNewPost] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const suggestedTags = ["nextjs", "devlog", "typescript", "mongodb", "auth0"];

  const handleSubmit = () => {
    if (!newPost.trim()) return;
    onPost({ content: newPost, tags });
    setNewPost("");
    setTags([]);
    setTagInput("");
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow mb-10">
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

      <div className="text-right mt-3">
        <button
          onClick={handleSubmit}
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Post DevLog
        </button>
      </div>

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
    </div>
  );
}
