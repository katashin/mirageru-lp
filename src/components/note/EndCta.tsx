import type { Note } from "@/lib/note";
import { CTAButton } from "@/components/CTAButton";
import { LINE_NOTE } from "@/lib/constants";

export function EndCta({ note }: { note: Note }) {
  return (
    <section className="flex flex-col items-center gap-3 rounded-2xl bg-[#e3f4f6] px-5 py-8 text-center">
      <p className="text-lg font-black text-[#0F172A]">{note.endCta}</p>
      <p className="text-sm text-[#334155]">50分の無料相談で、最初の一歩を一緒に決めます。</p>
      <CTAButton place="article_end" slug={note.slug} />
      <p className="text-xs text-[#64748B]">{LINE_NOTE}</p>
    </section>
  );
}
