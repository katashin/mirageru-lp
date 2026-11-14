import type { Note } from "@/lib/note";
import { gridStyle, noLabel } from "./grid";

export function NoteHeader({ note }: { note: Note }) {
  return (
    <header className="text-white" style={gridStyle}>
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 pb-10 pt-28 md:px-8">
        <p className="font-mono text-xs tracking-wide text-[#6fd6e6]">
          現場ノート {noLabel(note.no)} ・ {note.theme}
        </p>
        <h1 className="text-2xl font-black leading-snug md:text-4xl" style={{ textWrap: "balance" }}>
          {note.title}
        </h1>
        {note.subtitle && <p className="text-sm text-white/80 md:text-base">{note.subtitle}</p>}
      </div>
    </header>
  );
}
