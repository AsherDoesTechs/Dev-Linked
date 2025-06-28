"use client";

interface FollowerCardProps {
  name: string;
  username: string;
  isFollowing: boolean;
  onFollowToggle: () => void;
  avatarUrl?: string;
  isMutual?: boolean;
}

export default function FollowerCard({
  name,
  username,
  isFollowing = false,
  onFollowToggle,
  avatarUrl,
  isMutual = false,
}: FollowerCardProps) {
  return (
    <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-900 px-4 py-3 rounded-lg shadow">
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500" />
        )}
        <div>
          <p className="font-medium flex items-center gap-2">
            {name}
            {isMutual && (
              <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 px-2 py-0.5 rounded-full">
                Follows you
              </span>
            )}
          </p>
          <p className="text-sm text-neutral-500">@{username}</p>
        </div>
      </div>
      <button
        onClick={onFollowToggle}
        className={`px-3 py-1 text-sm rounded-full transition ${
          isFollowing
            ? "bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white"
            : "bg-black text-white dark:bg-white dark:text-black"
        } hover:opacity-80`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
