import path from "path";
import { getAllNotes, getNote, getRelatedNotes, showDrafts } from "@/lib/note";

const dir = path.join(__dirname, "fixtures/note");
const empty = path.join(__dirname, "fixtures/note-empty");

describe("記事の読み込み", () => {
  it("公開の記事だけを新しい順に返す", () => {
    const notes = getAllNotes({ dir, includeDrafts: false });
    expect(notes.map((n) => n.slug)).toEqual(["manual-koushin", "shinjin-shonichi"]);
  });

  it("includeDrafts で下書きも返す", () => {
    expect(getAllNotes({ dir, includeDrafts: true })).toHaveLength(3);
  });

  it("frontmatter と本文を読む。無い項目は空にする", () => {
    const n = getNote("manual-koushin", { dir, includeDrafts: false })!;
    expect(n.title).toBe("マニュアルが古いままのお店へ");
    expect(n.no).toBe(2);
    expect(n.checklist).toEqual([]);
    expect(n.sources).toEqual([]);
    expect(n.body).toContain("## 手順1 聞く");
  });

  it("画像用の題名 ogTitle は、改行つきで読む。無ければ undefined", () => {
    expect(getNote("shinjin-shonichi", { dir })!.ogTitle).toBe("新人が2日目に来なくなるお店の、\n初日の迎え方");
    expect(getNote("manual-koushin", { dir })!.ogTitle).toBeUndefined();
  });

  it("下書きは includeDrafts なしでは見つからない", () => {
    expect(getNote("shitagaki", { dir, includeDrafts: false })).toBeNull();
    expect(getNote("shitagaki", { dir, includeDrafts: true })?.draft).toBe(true);
  });

  it("無い slug は null", () => {
    expect(getNote("nai", { dir, includeDrafts: true })).toBeNull();
  });

  it("関連記事は同じテーマを優先し、自分を含まない", () => {
    const all = getAllNotes({ dir, includeDrafts: true });
    const me = all.find((n) => n.slug === "shinjin-shonichi")!;
    const rel = getRelatedNotes(me, 2, all);
    expect(rel[0].slug).toBe("shitagaki");
    expect(rel.map((n) => n.slug)).not.toContain("shinjin-shonichi");
  });

  it("フォルダが空なら空の配列", () => {
    expect(getAllNotes({ dir: empty, includeDrafts: true })).toEqual([]);
  });

  it("slug に使えない文字のファイルはエラー", () => {
    expect(() => getAllNotes({ dir: path.join(__dirname, "fixtures/note-bad") })).toThrow(
      /slug は英小文字・数字・ハイフンだけ/
    );
  });

  it("必須の項目が欠けるとファイル名つきでエラー", () => {
    expect(() => getAllNotes({ dir: path.join(__dirname, "fixtures/note-missing") })).toThrow(
      /no-title\.md.*title/
    );
  });
});

describe("showDrafts", () => {
  const keys = ["VERCEL_ENV", "NODE_ENV", "SHOW_DRAFTS"] as const;
  const orig = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  const env = process.env as Record<string, string | undefined>;
  afterEach(() => {
    keys.forEach((k) => (orig[k] === undefined ? delete env[k] : (env[k] = orig[k])));
  });

  it("本番では false", () => {
    env.VERCEL_ENV = "production";
    expect(showDrafts()).toBe(false);
  });

  it("VERCEL_ENV が無い本番ビルドでも false（下書きは基本かくす）", () => {
    delete env.VERCEL_ENV;
    delete env.SHOW_DRAFTS;
    env.NODE_ENV = "production";
    expect(showDrafts()).toBe(false);
  });

  it("Preview・開発中・SHOW_DRAFTS=1 では true", () => {
    env.NODE_ENV = "production";
    env.VERCEL_ENV = "preview";
    expect(showDrafts()).toBe(true);
    delete env.VERCEL_ENV;
    env.NODE_ENV = "development";
    expect(showDrafts()).toBe(true);
    env.NODE_ENV = "production";
    env.SHOW_DRAFTS = "1";
    expect(showDrafts()).toBe(true);
  });
});
