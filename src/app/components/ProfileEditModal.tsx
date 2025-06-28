"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast"; // Make sure this is installed!

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    name: string;
    username: string;
    bio: string;
    avatarUrl?: string;
  };
  onSave: (updated: {
    name: string;
    username: string;
    bio: string;
    avatarUrl: string;
  }) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}: ProfileEditModalProps) {
  const [name, setName] = useState(currentProfile.name);
  const [username, setUsername] = useState(currentProfile.username);
  const [bio, setBio] = useState(currentProfile.bio);
  const [avatarPreview, setAvatarPreview] = useState(
    currentProfile.avatarUrl || ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetFields = () => {
    setName(currentProfile.name);
    setUsername(currentProfile.username);
    setBio(currentProfile.bio);
    setAvatarPreview(currentProfile.avatarUrl || "");
  };

  const isChanged =
    name !== currentProfile.name ||
    username !== currentProfile.username ||
    bio !== currentProfile.bio ||
    avatarPreview !== (currentProfile.avatarUrl || "");

  const handleSubmit = () => {
    if (!isChanged) return;
    setIsSaving(true);
    setTimeout(() => {
      onSave({ name, username, bio, avatarUrl: avatarPreview });
      toast.success("Profile updated successfully!");
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-neutral-400 hover:text-red-500"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

            <div className="flex flex-col gap-4">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    hidden
                  />
                  <div className="w-20 h-20 rounded-full bg-neutral-300 dark:bg-neutral-700 overflow-hidden flex items-center justify-center">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-neutral-500">Upload</span>
                    )}
                  </div>
                </label>
              </div>

              {/* Name */}
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white outline-none"
              />

              {/* Username */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white outline-none"
              />

              {/* Bio */}
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                rows={3}
                className="px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white outline-none resize-none"
              />

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  disabled={!isChanged || isSaving}
                  className={`flex-1 py-2 rounded font-semibold transition ${
                    !isChanged || isSaving
                      ? "bg-neutral-400 dark:bg-neutral-700 text-white cursor-not-allowed"
                      : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                  }`}
                  onClick={handleSubmit}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  disabled={!isChanged}
                  onClick={resetFields}
                  className="flex-shrink-0 px-3 py-2 rounded bg-neutral-200 dark:bg-neutral-800 text-sm hover:opacity-80 disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
