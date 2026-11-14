import type { Note } from "@/lib/note";
import { NoteCardRow } from "./NoteCard";

export function RelatedNotes({ notes }: { notes: Note[] }) {
  if (!notes.length) return null;
  return (
    <section className="flex flex-col gap-3">
      <p className="text-sm font-bold text-[#0F172A]">あわせて読みたい</p>
      {notes.map((n) => (
        <NoteCardRow key={n.slug} note={n} />
      ))}
    </section>
  );
}
