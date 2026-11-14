import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import type { Note } from "@/lib/noteTypes";

/** トップ・/note・公開の記事を並べる（下書きを渡さないこと） */
export function buildSitemap(notes: Note[]): MetadataRoute.Sitemap {
  const latest = notes[0] ? notes[0].updated ?? notes[0].date : undefined;
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/note`, lastModified: latest ?? new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...notes.map((n) => ({
      url: `${SITE_URL}/note/${n.slug}`,
      lastModified: n.updated ?? n.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
