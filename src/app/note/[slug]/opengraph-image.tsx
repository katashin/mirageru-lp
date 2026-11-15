import { getAllNotes, getNote, showDrafts } from "@/lib/note";
import { OG_SIZE, renderOgCard } from "@/lib/ogCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "現場ノート";

export function generateStaticParams() {
  return getAllNotes({ includeDrafts: showDrafts() }).map((n) => ({ slug: n.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug, { includeDrafts: showDrafts() });
  return renderOgCard({
    label: note ? `現場ノート No.${String(note.no).padStart(2, "0")} ・ ${note.theme}` : "現場ノート",
    title: note?.ogTitle ?? note?.title ?? "現場ノート",
    subtitle: note?.subtitle ?? "",
  });
}
