import Link from "next/link";
import type { Note } from "@/lib/note";
import { gridStyle, noLabel, formatDate } from "./grid";
import { ThemeIcon } from "./ThemeIcon";

export function NoteCardLarge({ note }: { note: Note }) {
  return (
    <Link href={`/note/${note.slug}`} className="block overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
      <div className="flex min-h-36 flex-col justify-between gap-4 p-5 text-white" style={gridStyle}>
        <span className="font-mono text-xs text-[#6fd6e6]">
          {noLabel(note.no)} ・ {note.theme}
          {note.draft && <span className="ml-2 rounded bg-[#f59e0b] px-1.5 py-0.5 text-[10px] font-bold text-[#0F172A]">下書き</span>}
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
      <span
        data-testid="note-thumb"
        className="flex h-[76px] w-[104px] flex-none flex-col justify-between rounded-lg p-2 text-white"
        style={gridStyle}
      >
        <span className="flex items-start justify-between">
          <span className="font-mono text-[10px] text-[#6fd6e6]">{noLabel(note.no)}</span>
          <ThemeIcon theme={note.theme} className="h-5 w-5 text-[#6fd6e6]" />
        </span>
        <span className="text-[11px] font-bold leading-tight">{note.theme}</span>
      </span>
      <span className="flex flex-col justify-center gap-1">
        <span className="text-[15px] font-bold leading-snug text-[#0F172A]">
          {note.title}
          {note.draft && <span className="ml-2 rounded bg-[#f59e0b] px-1.5 py-0.5 text-[10px] font-bold text-[#0F172A]">下書き</span>}
        </span>
        <span className="text-xs text-[#64748B]">
          {formatDate(note.date)} ・ {note.readMinutes}分で読めます
        </span>
      </span>
    </Link>
  );
}
