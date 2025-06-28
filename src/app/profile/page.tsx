"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationsLinks from "@/app/components/NavigationsLinks";
import ProfileHeader from "@/app/components/ProfileHeader";
import TabNavigation from "@/app/components/TabNavigation";
import AnalyticsDashboard from "@/app/components/AnalyticsDashboard";
import ProfileEditModal from "@/app/components/ProfileEditModal";
import FollowerCard from "@/app/components/FollowerCard";
import UserList from "@/app/components/UserList";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("DevLogs");
  const [isEditing, setIsEditing] = useState(false);

  const followers = [
    {
      id: 1,
      name: "JaneDoe",
      username: "janedoe",
      avatarUrl: "https://i.pravatar.cc/150?u=janedoe",
      isFollowing: false,
      isMutual: true,
    },
    {
      id: 2,
      name: "JohnSmith",
      username: "johnsmith",
      avatarUrl: "https://i.pravatar.cc/150?u=johnsmith",
      isFollowing: true,
      isMutual: false,
    },
  ];

  const following = [
    {
      id: 3,
      name: "DevGuy",
      username: "devguy",
      avatarUrl: "https://i.pravatar.cc/150?u=devguy",
      isFollowing: true,
      isMutual: false,
    },
  ];

  const tabs = [
    "DevLogs",
    "Projects",
    "Likes",
    "Followers",
    "Following",
    "Analytics",
    "Settings",
  ];

  const isPrivate = false;

  const [userProfile, setUserProfile] = useState({
    name: "AsherDoesTechs",
    username: "asher",
    bio: "Frontend developer passionate about building clean UI, cool tools, and contributing to dev communities. 🌱",
    avatarUrl: "",
  });

  return (
    <main className="min-h-screen px-6 py-16 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300">
      <NavigationsLinks />

      {/* Profile Header */}
      <ProfileHeader />

      {/* Edit Button */}
      <div className="mt-4 mb-4 text-center">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-1.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 cursor-pointer hover hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      <ProfileEditModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        currentProfile={userProfile}
        onSave={(updatedProfile) =>
          setUserProfile({
            ...updatedProfile,
            avatarUrl: updatedProfile.avatarUrl ?? "", // 👈 ensure it's always a string
          })
        }
      />

      {/* Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tab Content */}
      <section className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "DevLogs" && (
            <motion.div
              key="DevLogs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-sm text-neutral-400 mb-2">2 days ago</p>
                  <p>
                    🚀 Just launched my portfolio built with Next.js and
                    Tailwind!
                  </p>
                  <div className="flex space-x-4 pt-2 text-neutral-500">
                    <span>💬 2</span>
                    <span>❤️ 10</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "Projects" && (
            <motion.div
              key="Projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-neutral-500"
            >
              Projects will be displayed here.
            </motion.div>
          )}

          {activeTab === "Likes" && (
            <motion.div
              key="Likes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-neutral-500"
            >
              Liked posts will show up here.
            </motion.div>
          )}

          {activeTab === "Followers" && (
            <motion.div
              key="Followers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UserList
                users={[
                  {
                    id: 1,
                    name: "JaneDoe",
                    username: "janedoe",
                    avatarUrl: "https://i.pravatar.cc/150?u=janedoe",
                    isFollowing: false,
                    isMutual: true,
                  },
                  {
                    id: 2,
                    name: "JohnSmith",
                    username: "johnsmith",
                    avatarUrl: "https://i.pravatar.cc/150?u=johnsmith",
                    isFollowing: true,
                    isMutual: false,
                  },
                  {
                    id: 3,
                    name: "Techie",
                    username: "techgeek",
                    avatarUrl: "https://i.pravatar.cc/150?u=techgeek",
                    isFollowing: false,
                    isMutual: true,
                  },
                ]}
                isPrivate={isPrivate}
                onFollowToggle={(id) => console.log("Follow toggled", id)}
              />
            </motion.div>
          )}

          {activeTab === "Following" && (
            <motion.div
              key="Following"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UserList
                users={[
                  {
                    id: 4,
                    name: "DevGuy",
                    username: "devguy",
                    avatarUrl: "https://i.pravatar.cc/150?u=devguy",
                    isFollowing: true,
                    isMutual: false,
                  },
                  {
                    id: 5,
                    name: "CodeWizard",
                    username: "codewizard",
                    avatarUrl: "https://i.pravatar.cc/150?u=codewizard",
                    isFollowing: true,
                    isMutual: true,
                  },
                ]}
                onFollowToggle={(id) => console.log("Unfollowed", id)}
              />
            </motion.div>
          )}

          {activeTab === "Analytics" && <AnalyticsDashboard />}

          {activeTab === "Settings" && (
            <motion.div
              key="Settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-neutral-500"
            >
              User settings (profile edit, etc.) coming soon.
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
