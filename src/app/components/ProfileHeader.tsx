"use client";

import { FileText, MessageSquare, Heart } from "lucide-react";

export default function ProfileHeader() {
  return (
    <section className="text-center mb-10">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
      <h1 className="text-2xl font-bold">AsherDoesTechs</h1>
      <p className="text-neutral-600 dark:text-neutral-400">@asher</p>
      <p className="mt-4 text-sm max-w-md mx-auto">
        Frontend developer passionate about building clean UI, cool tools, and
        contributing to dev communities. 🌱
      </p>

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
