import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const NOTE_THEMES = ["スタッフ育成", "マニュアル", "店長の仕事", "作業割当"] as const;
export type NoteTheme = (typeof NOTE_THEMES)[number];

export type NoteSource = { label: string; url: string };

export type Note = {
  no: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  keyword: string;
  theme: NoteTheme;
  date: string;
  updated?: string;
  readMinutes: number;
  summary: string[];
  checklist: string[];
  endCta: string;
  sources: NoteSource[];
  xPosts: string[];
  draft: boolean;
  body: string;
};

type Opts = { dir?: string; includeDrafts?: boolean };

const DEFAULT_DIR = path.join(process.cwd(), "content/note");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED = ["no", "title", "theme", "date"] as const;

/** 本番（Vercel の production）だけ下書きを隠す。Preview と手元では見せる */
export function showDrafts(): boolean {
  return process.env.VERCEL_ENV !== "production";
}

function toDateString(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

function strList(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

function readNote(dir: string, file: string): Note {
  const slug = file.replace(/\.md$/, "");
  if (!SLUG_RE.test(slug)) {
    throw new Error(`${file}: slug は英小文字・数字・ハイフンだけにしてください`);
  }
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const missing = REQUIRED.filter((k) => data[k] === undefined || data[k] === "");
  if (missing.length) {
    throw new Error(`${file}: 必須の項目がありません（${missing.join(", ")}）`);
  }
  if (!NOTE_THEMES.includes(data.theme)) {
    throw new Error(`${file}: theme は ${NOTE_THEMES.join("／")} のどれかにしてください`);
  }
  return {
    no: Number(data.no),
    slug,
    title: String(data.title),
    subtitle: String(data.subtitle ?? ""),
    description: String(data.description ?? ""),
    keyword: String(data.keyword ?? ""),
    theme: data.theme,
    date: toDateString(data.date),
    updated: data.updated ? toDateString(data.updated) : undefined,
    readMinutes: Number(data.readMinutes ?? 5),
    summary: strList(data.summary),
    checklist: strList(data.checklist),
    endCta: String(data.endCta ?? "あなたのお店でも、一緒に仕組みをつくりませんか？"),
    sources: Array.isArray(data.sources)
      ? data.sources.map((s: NoteSource) => ({ label: String(s.label), url: String(s.url) }))
      : [],
    xPosts: strList(data.xPosts),
    draft: data.draft === true,
    body: content.trim(),
  };
}

/** 記事を新しい順（日付の降順、同じ日は番号の降順）で返す */
export function getAllNotes(opts: Opts = {}): Note[] {
  const dir = opts.dir ?? DEFAULT_DIR;
  const includeDrafts = opts.includeDrafts ?? false;
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readNote(dir, f))
    .filter((n) => includeDrafts || !n.draft)
    .sort((a, b) => (a.date === b.date ? b.no - a.no : a.date < b.date ? 1 : -1));
}

export function getNote(slug: string, opts: Opts = {}): Note | null {
  return getAllNotes(opts).find((n) => n.slug === slug) ?? null;
}

/** 同じテーマを優先し、足りなければ新しい順で埋める。自分は除く */
export function getRelatedNotes(note: Note, limit = 3, pool?: Note[]): Note[] {
  const all = (pool ?? getAllNotes({ includeDrafts: showDrafts() })).filter(
    (n) => n.slug !== note.slug
  );
  const same = all.filter((n) => n.theme === note.theme);
  const rest = all.filter((n) => n.theme !== note.theme);
  return [...same, ...rest].slice(0, limit);
}
