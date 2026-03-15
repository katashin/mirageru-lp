import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function VideoWatchPage({
  params,
}: {
  params: Promise<{ id: string; videoId: string }>;
}) {
  const { id, videoId } = await params;
  const supabase = await createClient();

  const [{ data: video }, { data: videos }] = await Promise.all([
    supabase.from("videos").select("*").eq("id", videoId).single(),
    supabase
      .from("videos")
      .select("id, title, order")
      .eq("course_id", id)
      .order("order", { ascending: true }),
  ]);

  if (!video) notFound();

  return (
    <div className="min-h-screen bg-zinc-900">
      <header className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link
            href={`/courses/${id}`}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            ← コース詳細へ戻る
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* メインエリア */}
        <div className="flex-1 min-w-0">
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtube_id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="mt-4">
            <p className="text-zinc-400 text-sm mb-1">第{video.order}講</p>
            <h1 className="text-white text-xl sm:text-2xl font-bold">{video.title}</h1>
          </div>
        </div>

        {/* サイドバー：動画リスト */}
        <aside className="lg:w-80 shrink-0">
          <h2 className="text-zinc-300 text-sm font-semibold mb-3 uppercase tracking-wide">
            コンテンツ一覧
          </h2>
          <ol className="space-y-1">
            {videos?.map((v) => {
              const isCurrent = v.id === videoId;
              return (
                <li key={v.id}>
                  <Link
                    href={`/courses/${id}/videos/${v.id}`}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isCurrent
                        ? "bg-orange-500 text-white"
                        : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCurrent ? "bg-white text-orange-500" : "bg-zinc-600 text-zinc-300"
                      }`}
                    >
                      {v.order}
                    </span>
                    <span className="text-sm leading-snug line-clamp-2">{v.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </div>
  );
}
