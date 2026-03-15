export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="h-7 w-40 bg-zinc-200 rounded animate-pulse" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="h-8 w-32 bg-zinc-200 rounded animate-pulse mb-2" />
        <div className="h-5 w-20 bg-zinc-100 rounded animate-pulse mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <div className="aspect-video w-full bg-zinc-200 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-zinc-200 rounded animate-pulse" />
                <div className="h-4 bg-zinc-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-zinc-100 rounded animate-pulse w-1/2 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
