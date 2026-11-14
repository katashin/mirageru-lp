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
  const orig = process.env.VERCEL_ENV;
  afterEach(() => {
    if (orig === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = orig;
  });

  it("本番では false", () => {
    process.env.VERCEL_ENV = "production";
    expect(showDrafts()).toBe(false);
  });

  it("Preview や手元では true", () => {
    delete process.env.VERCEL_ENV;
    expect(showDrafts()).toBe(true);
    process.env.VERCEL_ENV = "preview";
    expect(showDrafts()).toBe(true);
  });
});
