"use client";

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 text-center">
          <p className="text-sm text-neutral-500">Profile Views</p>
          <p className="text-xl font-bold mt-1">1,253</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 text-center">
          <p className="text-sm text-neutral-500">Total Likes</p>
          <p className="text-xl font-bold mt-1">780</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 text-center">
          <p className="text-sm text-neutral-500">Top DevLog</p>
          <p className="text-base mt-1">“Building My Portfolio in Public”</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4">
        <p className="text-sm text-neutral-500 mb-2">Likes Over Time</p>
        <div className="h-48 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-20 rounded-md" />
        <p className="text-xs text-center mt-2 text-neutral-500">
          📊 Chart Coming Soon
        </p>
      </div>
    </div>
  );
}
