import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Or any preferred highlight.js theme

interface PostCardProps {
  post: {
    id: string;
    username: string;
    content: string;
    timestamp: string;
    likes: number;
    tags?: string[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow flex gap-4 transition hover:shadow-lg">
      {/* Avatar Placeholder */}
      <div className="w-12 h-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />

      {/* Post Body */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <strong className="text-lg font-semibold">@{post.username}</strong>
          <span className="text-sm text-neutral-500">{post.timestamp}</span>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
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
