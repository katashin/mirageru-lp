import type { NoteTheme } from "@/lib/noteTypes";

const CLS = "fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.7]";

/** テーマごとの線のアイコン（24×24） */
export function ThemeIcon({ theme, className = "h-6 w-6" }: { theme: NoteTheme; className?: string }) {
  switch (theme) {
    case "スタッフ育成":
      return (
        <svg viewBox="0 0 24 24" className={`${CLS} ${className}`} aria-hidden>
          <circle cx="9" cy="7.5" r="3" /><path d="M3.5 19c.6-3.3 2.8-5.2 5.5-5.2s4.9 1.9 5.5 5.2" />
          <circle cx="17" cy="9" r="2.3" /><path d="M15.6 13.9c2.4.1 4.2 1.8 4.7 4.6" />
        </svg>
      );
    case "マニュアル":
      return (
        <svg viewBox="0 0 24 24" className={`${CLS} ${className}`} aria-hidden>
          <path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h5" />
        </svg>
      );
    case "店長の仕事":
      return (
        <svg viewBox="0 0 24 24" className={`${CLS} ${className}`} aria-hidden>
          <rect x="4" y="4" width="16" height="17" rx="2" /><path d="M9 3v3h6V3M8 11l2 2 4-4M8 17h8" />
        </svg>
      );
    case "作業割当":
      return (
        <svg viewBox="0 0 24 24" className={`${CLS} ${className}`} aria-hidden>
          <rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h3M13 14h3M8 17h3" />
        </svg>
      );
  }
}
