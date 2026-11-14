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
