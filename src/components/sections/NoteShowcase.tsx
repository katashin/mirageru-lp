import Link from "next/link";
import type { Note } from "@/lib/noteTypes";
import { gridStyle, noLabel, formatDate } from "@/components/note/grid";

/** 「なぜできるのか」の後に置く現場ノートの欄。記事を横に並べ、スワイプ／横スクロールで続きを見る */
export function NoteShowcase({ notes }: { notes: Note[] }) {
  if (!notes.length) return null;
  const shown = notes.slice(0, 6);
  return (
    <section id="note" className="w-full bg-[#F8FAFC] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs font-bold tracking-widest text-[#0e7c8c]">GENBA NOTE</p>
            <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">現場ノート</h2>
            <p className="text-sm text-[#475569] md:text-base">元ニトリ店長が、現場で試してきたことを書いています。</p>
          </div>
        </div>
      </div>

      {/* 横に流れるカード。左端は本文とそろえ、右は画面の端まで流す */}
      <ul
        aria-label="現場ノートの記事"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
        style={{
          paddingLeft: "max(1.5rem, calc((100vw - 64rem) / 2 + 2rem))",
          paddingRight: "1.5rem",
          scrollPaddingLeft: "max(1.5rem, calc((100vw - 64rem) / 2 + 2rem))",
        }}
      >
        {shown.map((n) => (
          <li key={n.slug} className="w-[72%] max-w-[300px] flex-none snap-start md:w-[300px]">
            <Link
              href={`/note/${n.slug}`}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white transition-shadow hover:shadow-md"
            >
              <span className="flex h-36 flex-col justify-between p-4 text-white" style={gridStyle}>
                <span className="font-mono text-[11px] text-[#6fd6e6]">
                  {noLabel(n.no)} ・ {n.theme}
                </span>
                <span className="text-base font-black leading-snug">{n.title}</span>
              </span>
              <span className="flex flex-1 flex-col gap-2 p-4">
                <span className="line-clamp-3 text-sm leading-relaxed text-[#475569]">{n.description}</span>
                <span className="mt-auto text-xs text-[#64748B]">
                  {formatDate(n.date)} ・ {n.readMinutes}分で読めます
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-4 flex max-w-5xl px-6 md:justify-end md:px-8">
        <Link href="/note" className="text-sm font-bold text-[#0e7c8c] hover:underline">
          すべての記事を見る →
        </Link>
      </div>
    </section>
  );
}
