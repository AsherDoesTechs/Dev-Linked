import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-neutral-100 dark:bg-neutral-900 py-4 px-6 shadow">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="font-bold text-xl">
          Dev–Linked
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/profile">Profile</Link>
          <a href="/api/auth/logout">Logout</a>
        </div>
      </div>
    </nav>
  );
}
