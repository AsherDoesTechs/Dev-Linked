"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useUser from "@/app/lib/useUser";
import Spinner from "@/app/components/Spinner";
import FeatureTabs from "@/app/components/FeatureTabs";
import FeatureSlider from "@/app/components/FeatureSlider";
import { Github, Info, ShieldCheck, Twitter } from "lucide-react"; // Icon set

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
    <main className="relative min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white px-6 py-16 font-sans transition-colors duration-300 overflow-hidden">
      {/* Hero */}
      <section className="text-center max-w-2xl mx-auto space-y-6 mb-20 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Connect with Developers. <br />
          Share Code. Build Together.
        </motion.h1>

        <motion.p
          className="text-neutral-600 dark:text-neutral-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Dev–Linked is a social hub for developers to share progress, post
          updates, and grow.
        </motion.p>

        <a href="/api/auth/login" className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-medium cursor-pointer hover:opacity-90 transition"
          >
            Sign in with GitHub
          </motion.button>
        </a>
      </section>

      <FeatureTabs />

      {/* Feature Carousel */}
      {/* 🚀 Replacing old "What You Can Do" section with modern carousel */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          What You Can Do
        </h2>
        <FeatureSlider />
      </section>

      {/* Preview Feed */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Preview Feed</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((_, i) => (
            <motion.div
              key={i}
              className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl space-y-3 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="flex-1 h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-1/3" />
              </div>
              <div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-full" />
              <div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4" />
              <div className="flex space-x-4 text-neutral-400 text-xl">
                <span>❤️</span> <span>💬</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 text-center">
        <h2 className="text-3xl font-bold">Join the Dev Network</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Built by devs, for devs.
        </p>
        {!user && (
          <a href="/api/auth/login">
            <button className="mt-6 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
              Sign in
            </button>
          </a>
        )}
      </section>

      <footer className="mt-32 border-t border-neutral-200 dark:border-neutral-800 pt-10 pb-6 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left: Copyright */}
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Dev–Linked. All rights reserved.
          </p>

          {/* Right: Navigation Links with Icons */}
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
