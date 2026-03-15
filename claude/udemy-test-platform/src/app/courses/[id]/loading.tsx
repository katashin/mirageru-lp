export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="h-4 w-28 bg-zinc-200 rounded animate-pulse" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="h-8 bg-zinc-200 rounded animate-pulse mb-4 w-3/4" />
            <div className="space-y-2 mb-8">
              <div className="h-4 bg-zinc-200 rounded animate-pulse" />
              <div className="h-4 bg-zinc-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-zinc-200 rounded animate-pulse w-4/6" />
            </div>
            <div className="h-5 w-32 bg-zinc-200 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 bg-white border border-zinc-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="lg:w-72 shrink-0">
            <div className="bg-white border border-zinc-200 rounded-xl p-6">
              <div className="h-8 w-24 bg-zinc-200 rounded animate-pulse mb-6" />
              <div className="h-12 bg-zinc-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
