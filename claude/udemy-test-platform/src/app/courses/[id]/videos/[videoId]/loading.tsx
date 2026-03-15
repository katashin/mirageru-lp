export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <header className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="h-4 w-32 bg-zinc-700 rounded animate-pulse" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="aspect-video w-full bg-zinc-800 rounded-xl animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-16 bg-zinc-700 rounded animate-pulse" />
            <div className="h-6 w-2/3 bg-zinc-700 rounded animate-pulse" />
          </div>
        </div>
        <aside className="lg:w-80 shrink-0">
          <div className="h-4 w-24 bg-zinc-700 rounded animate-pulse mb-3" />
          <div className="space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-zinc-800 rounded-lg animate-pulse" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
