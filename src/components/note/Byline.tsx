import Image from "next/image";
import type { Note } from "@/lib/note";
import { BYLINE } from "@/lib/constants";
import { formatDate } from "./grid";

export function Byline({ note }: { note: Note }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/profile.png"
        alt="片山 真介"
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover"
      />
      <div className="text-xs leading-relaxed text-[#64748B]">
        <p className="text-sm font-bold text-[#0F172A]">{BYLINE}</p>
        <p>
          {formatDate(note.updated ?? note.date)} ・ {note.readMinutes}分で読めます
        </p>
      </div>
    </div>
  );
}
