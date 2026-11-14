/** ブラウザ側でも使う型と定数（fs を読まない） */
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
