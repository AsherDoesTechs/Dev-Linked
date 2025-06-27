export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 pr-6 text-sm text-neutral-600 dark:text-neutral-400">
      <div className="sticky top-24 space-y-4">
        <div>
          <h2 className="text-xs uppercase font-semibold tracking-wide mb-2 text-neutral-500">
            Navigation
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="hover:text-black dark:hover:text-white"
              >
                🏠 Dashboard
              </a>
            </li>
            <li>
              <a
                href="/explore"
                className="hover:text-black dark:hover:text-white"
              >
                🔍 Explore
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="hover:text-black dark:hover:text-white"
              >
                👤 My Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
