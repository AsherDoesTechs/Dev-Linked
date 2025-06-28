"use client";

import Image from "next/image";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Undo2 } from "lucide-react";
import "highlight.js/styles/github-dark.css";

interface PostCardProps {
  post: {
    id: string;
    username: string;
    avatarUrl: string;
    content: string;
    timestamp: string | Date;
    likes: number;
    tags?: string[];
  };
  onTagClick?: (tag: string) => void;
  onDelete?: (postId: string) => void;
}

export default function PostCard({
  post,
  onTagClick,
  onDelete,
}: PostCardProps) {
  const [confirming, setConfirming] = useState(false);
  const [showUndo, setShowUndo] = useState(false);

  const handleDelete = () => {
    setConfirming(false);
    onDelete?.(post.id);
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 4000);
  };

  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow flex gap-4 transition hover:shadow-lg">
      {/* Avatar */}
      <div className="min-w-[3rem]">
        <Image
          src={post.avatarUrl}
          alt={post.username}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="flex-1">
        {/* Top Bar: Timestamp + Delete */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-neutral-500">
            {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
          </span>

          {onDelete && !confirming && (
            <button
              onClick={() => setConfirming(true)}
              title="Delete post"
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {onDelete && confirming && (
            <div className="flex gap-1">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="text-xs px-2 py-1 text-neutral-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Username */}
        <div className="mb-1">
          <strong className="text-lg font-semibold">@{post.username}</strong>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {(post.tags ?? []).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {(post.tags ?? []).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium hover:opacity-80"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex space-x-4 text-neutral-500 text-sm mt-4">
          <button className="hover:text-red-600 transition">
            ❤️ {post.likes}
          </button>
          <button className="hover:text-blue-600 transition">💬 Comment</button>
        </div>
      </div>

      {/* Undo Toast */}
      {showUndo && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3">
          <Undo2 className="w-4 h-4" />
          Post deleted.
          <button
            className="ml-auto text-blue-400 hover:text-blue-600 text-sm"
            onClick={() => setShowUndo(false)}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
