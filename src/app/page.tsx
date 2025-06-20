"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { motion } from "framer-motion";
import FeatureTabs from "@/app/components/FeatureTabs";
import Link from "next/link";

export default function HomePage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-10">Error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-16 font-sans">
      <section className="text-center max-w-2xl mx-auto space-y-6 mb-20">
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
          className="text-neutral-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Dev–Linked is a social hub for developers to share progress, post
          updates, and grow.
        </motion.p>

        {!user && (
          <Link href="/api/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium cursor-pointer hover transition hover:bg-neutral-200"
            >
              Sign in with GitHub
            </motion.button>
          </Link>
        )}

        {user && (
          <div className="text-neutral-400 text-md pt-6">
            Welcome back, <strong>{user.name}</strong>!
          </div>
        )}
      </section>

      {user && (
        <>
          <FeatureTabs />

          {/* Key Features */}
          <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
            {[
              { title: "Post Developer Logs (DevLogs)", icon: "📝" },
              { title: "Follow & Connect with Other Devs", icon: "🔗" },
              { title: "Showcase Your GitHub Projects", icon: "📁" },
              { title: "Like, Comment, and Collaborate", icon: "💬" },
            ].map(({ title, icon }, i) => (
              <motion.div
                key={title}
                className="flex items-center space-x-4 p-4 bg-neutral-900 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl">{icon}</div>
                <p className="text-lg">{title}</p>
              </motion.div>
            ))}
          </section>

          {/* Feed */}
          <section className="mt-24 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Preview Feed</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-neutral-900 p-6 rounded-xl space-y-3 shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-700" />
                    <div className="flex-1 h-3 bg-neutral-700 rounded w-1/3" />
                  </div>
                  <div className="h-3 bg-neutral-700 rounded w-full" />
                  <div className="h-3 bg-neutral-700 rounded w-3/4" />
                  <div className="flex space-x-4 text-neutral-600 text-xl">
                    <span>❤️</span> <span>💬</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-32 text-center">
            <h2 className="text-3xl font-bold">Join the Dev Network</h2>
            <p className="text-neutral-400 mt-2">Built by devs, for devs.</p>
            <Link href="/api/auth/logout">
              <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold cursor-pointer hover transition hover:bg-neutral-200">
                Logout
              </button>
            </Link>
          </section>
        </>
      )}

      <footer className="mt-24 text-center cursor-pointer hover text-sm text-neutral-500 space-x-6">
        <a href="#">GitHub Repo</a>
        <a href="#">About</a>
        <a href="#">Terms</a>
        <a href="#">Twitter</a>
      </footer>
    </main>
  );
}
