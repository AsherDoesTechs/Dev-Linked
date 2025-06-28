"use client";

import { FileText, MessageSquare, Heart, Pencil } from "lucide-react";

interface ProfileHeaderProps {
  profile: {
    name: string;
    username: string;
    bio: string;
    avatarUrl?: string;
  };
  onEdit: () => void;
}

export default function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  return (
    <section className="text-center mb-6 relative">
      {/* Avatar */}
      {profile.avatarUrl ? (
        <img
          src={profile.avatarUrl}
          alt="Avatar"
          className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
      )}

      {/* Name & Username */}
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        @{profile.username}
      </p>

      {/* Bio */}
      <p className="mt-4 text-sm max-w-md mx-auto">{profile.bio}</p>

      {/* Stats */}
      <div className="mt-6 flex justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-1 hover:scale-105 transition">
          <FileText className="w-4 h-4" /> 12 DevLogs
        </div>
        <div className="flex items-center gap-1 hover:scale-105 transition">
          <MessageSquare className="w-4 h-4" /> 32 Comments
        </div>
        <div className="flex items-center gap-1 hover:scale-105 transition">
          <Heart className="w-4 h-4" /> 75 Likes
        </div>
      </div>
    </section>
  );
}
