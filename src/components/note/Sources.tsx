import type { NoteSource } from "@/lib/note";

export function Sources({ sources }: { sources: NoteSource[] }) {
  if (!sources.length) return null;
  return (
    <section className="rounded-xl bg-[#F8FAFC] p-5 text-sm">
      <p className="mb-2 font-bold text-[#0F172A]">参考にした資料</p>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-[#475569]">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#0e7c8c] underline underline-offset-2">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
