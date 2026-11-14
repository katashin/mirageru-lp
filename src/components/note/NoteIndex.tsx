"use client";

import { useState } from "react";
import { NOTE_THEMES, type Note, type NoteTheme } from "@/lib/noteTypes";
import { gridStyle } from "./grid";
import { NoteCardLarge, NoteCardRow } from "./NoteCard";

export function NoteIndex({ notes }: { notes: Note[] }) {
  const [theme, setTheme] = useState<NoteTheme | null>(null);
  const themes = NOTE_THEMES.filter((t) => notes.some((n) => n.theme === t));
  const shown = theme ? notes.filter((n) => n.theme === theme) : notes;
  const [first, ...rest] = shown;

  return (
    <>
      <header className="text-white" style={gridStyle}>
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-5 pb-10 pt-28 md:px-8">
          <p className="font-mono text-xs tracking-wider text-[#6fd6e6]">GENBA NOTE</p>
          <h1 className="text-3xl font-black md:text-4xl">現場ノート</h1>
          <p className="text-sm text-white/85">お店の標準化と人づくりを、元店長の目線で。</p>
        </div>
      </header>

      {themes.length > 0 && (
        <div className="border-b border-[#e2e8f0] bg-white">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-5 py-3 md:px-8">
            {[null, ...themes].map((t) => {
              const on = t === theme;
              return (
                <button
                  key={t ?? "all"}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-pressed={on}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    on ? "bg-[#0e7c8c] text-white" : "bg-[#e3f4f6] text-[#0e7c8c]"
                  }`}
                >
                  {t ?? "すべて"}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-8 md:px-8">
        {first ? (
          <>
            <NoteCardLarge note={first} />
            {rest.map((n) => (
              <NoteCardRow key={n.slug} note={n} />
            ))}
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-[#94a3b8] p-8 text-center text-sm text-[#64748B]">
            最初の記事を準備中です
          </p>
        )}
      </div>
    </>
  );
}
