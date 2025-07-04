"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useUser from "@/app/lib/useUser";
import Spinner from "@/app/components/Spinner";
import FeatureTabs from "@/app/components/FeatureTabs";
import FeatureSlider from "@/app/components/FeatureSlider";
import { Github, Info, ShieldCheck, Twitter } from "lucide-react";

export default function HomePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (isLoading) return <Spinner />;

  return (
    <main className="relative min-h-screen overflow-hidden text-white font-sans">
      {/* 🔷 Techy Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Soft Gradient Blobs */}
        <motion.div
          className="absolute w-[600px] h-[600px] top-[-100px] left-[-150px] bg-indigo-500 rounded-full blur-[200px] opacity-30"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bottom-[-150px] right-[-100px] bg-purple-500 rounded-full blur-[180px] opacity-20"
          animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative text-center max-w-2xl mx-auto space-y-6 px-6 py-24 z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Connect with Developers. <br />
          Share Code. Build Together.
        </motion.h1>

        <motion.p
          className="text-neutral-300 text-lg max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Dev–Linked is a next-gen space for developers to share logs, grow
          their presence, and collaborate with the tech world.
        </motion.p>

        <a href="/api/auth/login">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold cursor-pointer hover hover:opacity-90 transition relative overflow-hidden"
          >
            <span className="z-10 relative">Sign in with GitHub</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>
        </a>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent my-16" />

      {/* Feature Tabs */}
      <FeatureTabs />

      {/* Feature Carousel */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          What You Can Do
        </h2>
        <FeatureSlider />
      </section>

      {/* Preview Feed */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Preview Feed
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              username: "jakecodes",
              avatar: "https://i.pravatar.cc/150?img=1",
              snippet:
                "Just built a custom React hook for fetching with retries. Super useful for resilient UIs!",
              hearts: 32,
              comments: 4,
            },
            {
              username: "devina",
              avatar: "https://i.pravatar.cc/150?img=5",
              snippet:
                "Exploring dark mode with Tailwind and Next.js App Router. Game-changer for theme control.",
              hearts: 58,
              comments: 11,
            },
            {
              username: "sora404",
              avatar: "https://i.pravatar.cc/150?img=12",
              snippet:
                "Replaced Redux with Zustand in my dashboard app — global state feels way lighter now.",
              hearts: 19,
              comments: 2,
            },
            {
              username: "pixelknight",
              avatar: "https://i.pravatar.cc/150?img=22",
              snippet:
                "Refactored my backend from Express to tRPC and Next API routes. Feeling ✨clean✨!",
              hearts: 44,
              comments: 6,
            },
          ].map((post, i) => (
            <motion.div
              key={i}
              className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-lg space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{post.username}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    2h ago
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {post.snippet}
              </p>
              <div className="flex items-center gap-6 text-neutral-500 dark:text-neutral-400 text-sm">
                <span className="flex items-center gap-1">
                  ❤️ {post.hearts}
                </span>
                <span className="flex items-center gap-1">
                  💬 {post.comments}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 text-center relative">
        <div className="absolute inset-x-0 -top-20 h-60 bg-gradient-to-b from-blue-500/10 via-purple-400/10 to-transparent blur-xl rounded-full opacity-30 pointer-events-none" />
        <h2 className="text-3xl font-bold">Join the Dev Network</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Built by devs, for devs.
        </p>
        {!user && (
          <a href="/api/auth/login">
            <button className="mt-6 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Sign in
            </button>
          </a>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-neutral-200 dark:border-neutral-800 pt-10 pb-6 text-sm text-neutral-500 dark:text-neutral-400 backdrop-blur-sm bg-white/40 dark:bg-black/20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Dev–Linked. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-6 font-medium">
            {[
              { label: "GitHub", icon: Github },
              { label: "About", icon: Info },
              { label: "Terms", icon: ShieldCheck },
              { label: "Twitter", icon: Twitter },
            ].map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="group inline-flex items-center gap-1.5 text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer transition-all relative"
              >
                <Icon className="w-4 h-4" />
                <span className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                  {label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
