interface PostCardProps {
  post: {
    id: string;
    username: string;
    content: string;
    timestamp: string;
    likes: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 shadow flex gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />

      {/* Post Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <strong className="text-lg">@{post.username}</strong>
          <span className="text-sm text-neutral-500">{post.timestamp}</span>
        </div>
        <p className="text-base text-neutral-800 dark:text-neutral-200">
          {post.content}
        </p>

        {/* Actions */}
        <div className="flex space-x-4 text-neutral-500 text-sm mt-3">
          <button className="hover:text-red-600">❤️ {post.likes}</button>
          <button className="hover:text-blue-600">💬 Comment</button>
        </div>
      </div>
    </div>
  );
}
