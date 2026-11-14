import { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/note";
import { buildSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  // サイトマップには Preview でも下書きを載せない
  return buildSitemap(getAllNotes({ includeDrafts: false }));
}
