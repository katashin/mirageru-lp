import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl font-bold text-zinc-200 mb-4">404</p>
        <h1 className="text-xl font-semibold text-zinc-700 mb-2">コースが見つかりません</h1>
        <p className="text-zinc-400 mb-8">指定されたコースは存在しないか、削除された可能性があります。</p>
        <Link
          href="/"
          className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors text-sm font-medium"
        >
          コース一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
