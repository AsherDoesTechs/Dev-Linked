import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { formatDistanceToNow } from "date-fns";

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
}

export default function PostCard({ post, onTagClick }: PostCardProps) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow flex gap-4 transition hover:shadow-lg">
      {/* Avatar */}
      {post.avatarUrl ? (
        <div className="min-w-[3rem]">
          <Image
            src={post.avatarUrl}
            alt={post.username}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      )}

      {/* Post Body */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <strong className="text-lg font-semibold">@{post.username}</strong>
          <span className="text-sm text-neutral-500">
            {post.timestamp && !isNaN(new Date(post.timestamp).getTime())
              ? formatDistanceToNow(new Date(post.timestamp), {
                  addSuffix: true,
                })
              : "Invalid time"}
          </span>
        </div>

        {/* Markdown with Syntax Highlight */}
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

        {/* Actions */}
        <div className="flex space-x-4 text-neutral-500 text-sm mt-4">
          <button className="hover:text-red-600 transition">
            ❤️ {post.likes}
          </button>
          <button className="hover:text-blue-600 transition">💬 Comment</button>
        </div>
      </div>
    </div>
  );
}
