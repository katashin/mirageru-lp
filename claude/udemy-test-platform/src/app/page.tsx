import { createClient } from "@/lib/supabase/server";
import CourseCard from "@/components/CourseCard";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, description, thumbnail_url, videos(count)")
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl font-bold text-zinc-900">学習プラットフォーム</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">コース一覧</h2>
        <p className="text-zinc-500 mb-8">全 {courses?.length ?? 0} コース</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              thumbnailUrl={course.thumbnail_url}
              videoCount={(course.videos as unknown as { count: number }[])?.[0]?.count ?? 0}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
