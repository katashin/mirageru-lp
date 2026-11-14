import Link from "next/link";
import type { Note } from "@/lib/note";
import { gridStyle, noLabel, formatDate } from "./grid";

export function NoteCardLarge({ note }: { note: Note }) {
  return (
    <Link href={`/note/${note.slug}`} className="block overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
      <div className="flex min-h-36 flex-col justify-between gap-4 p-5 text-white" style={gridStyle}>
        <span className="font-mono text-xs text-[#6fd6e6]">
          {noLabel(note.no)} ・ {note.theme}
        </span>
        <span className="text-xl font-black leading-snug">{note.title}</span>
      </div>
      <div className="flex items-center justify-between px-5 py-3 text-xs text-[#64748B]">
        <span>
          {formatDate(note.date)} ・ {note.readMinutes}分
        </span>
        {note.summary.length > 0 && (
          <span className="rounded-full bg-[#e3f4f6] px-2.5 py-0.5 font-bold text-[#0e7c8c]">
            手順{note.summary.length}つ
          </span>
        )}
      </div>
    </Link>
  );
}

export function NoteCardRow({ note }: { note: Note }) {
  return (
    <Link href={`/note/${note.slug}`} className="flex gap-4 rounded-xl border border-[#e2e8f0] bg-white p-3">
      <span className="h-16 w-20 flex-none rounded-lg" style={gridStyle} aria-hidden />
      <span className="flex flex-col justify-center gap-1">
        <span className="text-[15px] font-bold leading-snug text-[#0F172A]">{note.title}</span>
        <span className="text-xs text-[#64748B]">
          {noLabel(note.no)} ・ {note.theme} ・ {note.readMinutes}分
        </span>
      </span>
    </Link>
  );
}
