import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-12 font-sans">
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Connect with Developers. <br />
          Share Code. Build Together.
        </h1>
        <p className="text-neutral-400 text-lg">
          Dev–Linked is a social hub for developers to share progress, post
          updates, and grow.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-lg font-medium cursor-pointer hover hover:bg-neutral-200 transition">
          Sign in with GitHub
        </button>
      </section>

      {/* Features */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left">
        {[
          { title: "Post Developer Logs (DevLogs)", icon: "📝" },
          { title: "Follow & Connect with Other Devs", icon: "🔗" },
          { title: "Showcase Your GitHub Projects", icon: "📁" },
          { title: "Like, Comment, and Collaborate", icon: "💬" },
        ].map(({ title, icon }) => (
          <div key={title} className="flex items-center space-x-4">
            <div className="text-3xl">{icon}</div>
            <p className="text-lg">{title}</p>
          </div>
        ))}
      </section>

      {/* Preview Feed */}
      <section className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Preview Feed</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="bg-neutral-900 p-6 rounded-xl space-y-3 shadow-lg"
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
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 text-center">
        <h2 className="text-3xl font-bold">Join the Dev Network</h2>
        <p className="text-neutral-400 mt-2">Built by devs, for devs.</p>
        <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold cursor-pointer hover hover:bg-neutral-200 transition">
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-neutral-500 space-x-4">
        <a href="#">Github Repo</a>
        <a href="#">About</a>
        <a href="#">Terms</a>
        <a href="#">Twitter</a>
      </footer>
    </main>
  );
}
