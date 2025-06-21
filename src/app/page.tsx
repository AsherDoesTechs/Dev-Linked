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
        <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition">
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
      </section>
    </main>
  );
}
