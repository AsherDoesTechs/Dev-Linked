import NavBar from "@/app/components/Navbar";
import PostCard from "@/app/components/PostCard";

export default function DashboardPage() {
  // 🧪 Dummy post data (replace with real MongoDB data later)
  const posts = [
    {
      id: "1",
      username: "asherdev",
      content: "Just implemented GitHub Auth with Auth0 in Next.js! 🚀",
      timestamp: "2 hours ago",
      likes: 7,
    },
    {
      id: "2",
      username: "silentgrinder",
      content: "Designing the dashboard layout before diving into MongoDB. 🔧",
      timestamp: "5 hours ago",
      likes: 5,
    },
    {
      id: "3",
      username: "techhero",
      content: "Started working on the Explore page with user search! 🔍",
      timestamp: "Yesterday",
      likes: 3,
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white">
      <NavBar />

      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">🧠 Your Dev Feed</h1>

        {/* 🔥 DevLog Feed */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <p className="text-neutral-500 mt-6 text-center">
            No posts yet. Follow some devs or write your first DevLog!
          </p>
        )}
      </section>
    </main>
  );
}
