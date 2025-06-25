interface Post {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 mb-6 shadow">
      <div className="flex justify-between items-center mb-2">
        <strong className="text-lg">@{post.username}</strong>
        <span className="text-sm text-neutral-500">{post.timestamp}</span>
      </div>
      <p className="text-base">{post.content}</p>
      <div className="text-sm text-neutral-500 mt-2">❤️ {post.likes} Likes</div>
    </div>
  );
}
