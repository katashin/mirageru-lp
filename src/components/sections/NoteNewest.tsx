import Link from "next/link";
import type { Note } from "@/lib/noteTypes";
import { gridStyle, noLabel } from "@/components/note/grid";

export function NoteNewest({ notes }: { notes: Note[] }) {
  if (!notes.length) return null;
  return (
    <section className="bg-[#F8FAFC]">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 md:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-black text-[#0F172A]">現場ノート 新着</h2>
          <Link href="/note" className="text-sm font-bold text-[#0e7c8c]">
            すべて見る →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {notes.slice(0, 3).map((n) => (
            <Link
              key={n.slug}
              href={`/note/${n.slug}`}
              className="flex overflow-hidden rounded-xl border border-[#e2e8f0] bg-white md:flex-col"
            >
              <span className="flex w-24 flex-none flex-col justify-end p-2 text-white md:h-24 md:w-auto" style={gridStyle}>
                <span className="font-mono text-[10px] text-[#6fd6e6]">{noLabel(n.no)}</span>
                <span className="text-[11px] font-bold">{n.theme}</span>
              </span>
              <span className="p-3 text-sm font-bold leading-snug text-[#0F172A]">{n.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
