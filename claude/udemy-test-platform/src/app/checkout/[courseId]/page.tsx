import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckoutForm from "./CheckoutForm";

const PRICE = 9800;

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .single();

  if (!course) notFound();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href={`/courses/${courseId}`}
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            ← コース詳細へ戻る
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold text-zinc-900 mb-8 text-center">お支払い</h1>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <CheckoutForm
            courseId={course.id}
            courseTitle={course.title}
            price={PRICE}
          />
        </div>
      </main>
    </div>
  );
}
