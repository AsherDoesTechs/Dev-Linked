"use client";

import FollowerCard from "./FollowerCard";

interface User {
  id: number;
  name: string;
  username: string;
  avatarUrl?: string;
  isFollowing: boolean;
  isMutual?: boolean;
}

interface UserListProps {
  users: User[];
  isPrivate?: boolean;
  onFollowToggle?: (id: number) => void;
}

export default function UserList({
  users,
  isPrivate = false,
  onFollowToggle,
}: UserListProps) {
  if (isPrivate) {
    return (
      <div className="text-center text-neutral-500 italic">
        This profile is private.
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center text-neutral-500 italic">
        No users to display.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <FollowerCard
          key={user.id}
          name={user.name}
          username={user.username}
          avatarUrl={user.avatarUrl}
          isFollowing={user.isFollowing}
          isMutual={user.isMutual}
          onFollowToggle={() => onFollowToggle?.(user.id)}
        />
      ))}
    </div>
  );
}
