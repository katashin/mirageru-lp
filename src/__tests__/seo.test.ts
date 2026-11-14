import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { jsonLd } from "@/lib/jsonLd";
import { SITE_URL, X_URL } from "@/lib/constants";

describe("SEOの住所", () => {
  it("サイトの住所は lp.mirageru.com", () => {
    expect(SITE_URL).toBe("https://lp.mirageru.com");
    expect(X_URL).toBe("https://x.com/coach_katayama");
  });

  it("サイトマップが正しい住所を指す", () => {
    expect(sitemap()[0].url).toBe(SITE_URL);
  });

  it("robots が正しいサイトマップを指す", () => {
    expect(robots().sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("JSON-LD に古い住所が残っていない", () => {
    const text = JSON.stringify(jsonLd);
    expect(text).not.toContain("mirageru-lp.mirageru.com");
    expect(text).toContain("https://lp.mirageru.com/#person");
    expect(text).toContain("https://x.com/coach_katayama");
  });
});

import path from "path";
import { getNote, type Note } from "@/lib/note";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

describe("記事の構造化データ", () => {
  const note = getNote("shinjin-shonichi", {
    dir: path.join(__dirname, "fixtures/note"),
    includeDrafts: true,
  }) as Note;

  it("Article の著者は片山さん、住所は /note/<slug>", () => {
    const a = articleJsonLd(note);
    expect(a["@type"]).toBe("Article");
    expect(a.author["@id"]).toBe(`${SITE_URL}/#person`);
    expect(a.url).toBe(`${SITE_URL}/note/shinjin-shonichi`);
    expect(a.headline).toBe(note.title);
    expect(a.datePublished).toBe("2026-11-20");
  });

  it("パンくずは トップ › 現場ノート › 記事 の3段", () => {
    const b = breadcrumbJsonLd(note);
    expect(b.itemListElement.map((i: { name: string }) => i.name)).toEqual([
      "ミラゲル",
      "現場ノート",
      note.title,
    ]);
  });
});
