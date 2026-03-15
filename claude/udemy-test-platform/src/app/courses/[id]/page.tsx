import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: course }, { data: videos }] = await Promise.all([
    supabase.from("courses").select("*").eq("id", id).single(),
    supabase
      .from("videos")
      .select("id, title, order")
      .eq("course_id", id)
      .order("order", { ascending: true }),
  ]);

  if (!course) notFound();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            ← コース一覧に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* コース情報 */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              {course.title}
            </h1>
            {course.description && (
              <p className="text-zinc-600 leading-relaxed mb-8">
                {course.description}
              </p>
            )}

            {/* 動画リスト */}
            <section>
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                収録動画 <span className="text-zinc-400 font-normal text-base">({videos?.length ?? 0}本)</span>
              </h2>
              <ol className="space-y-2">
                {videos?.map((video) => (
                  <li key={video.id}>
                    <Link
                      href={`/courses/${id}/videos/${video.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-sm transition-all group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-medium text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        {video.order}
                      </span>
                      <span className="text-zinc-800 text-sm font-medium group-hover:text-zinc-900">
                        {video.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* 購入サイドバー */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm sticky top-6">
              <p className="text-3xl font-bold text-zinc-900 mb-1">¥9,800</p>
              <p className="text-sm text-zinc-400 mb-6">買い切り・永久視聴</p>
              <Link
                href={`/checkout/${id}`}
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                購入する
              </Link>
              <p className="text-xs text-zinc-400 text-center mt-3">
                30日間返金保証
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
