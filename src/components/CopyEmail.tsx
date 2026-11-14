"use client";

import { useRef, useState } from "react";

const ICON = "h-4 w-4 flex-none fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]";

/**
 * メールでの問い合わせ（LINE の下のサブの入口）。
 * アドレスとコピーを1つの枠にまとめ、押すとコピー。コピーできない環境ではアドレスを選んだ状態にする。
 * 下に小さく「メールアプリで開く」（mailto）。
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const selectText = () => {
    const el = textRef.current;
    const sel = window.getSelection();
    if (!el || !sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      selectText();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3">
      <p className="text-xs text-[#64748B]">メールでのお問い合わせ</p>
      <button
        type="button"
        onClick={copy}
        aria-label={`メールアドレス ${email} をコピー（アドレスをコピー）`}
        className="group flex w-full items-center gap-3 rounded-xl border border-[#334155] bg-[#1E293B]/50 px-4 py-3 text-left transition-colors hover:border-[#475569] hover:bg-[#1E293B]"
      >
        <svg viewBox="0 0 24 24" className={`${ICON} text-[#64748B]`} aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3.5 6.5l8.5 6 8.5-6" />
        </svg>
        <span ref={textRef} className="min-w-0 flex-1 truncate text-sm text-[#CBD5E1]">
          {email}
        </span>
        <span className="flex flex-none items-center gap-1.5 text-xs font-bold text-[#94A3B8] group-hover:text-white">
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" className={`${ICON} text-[#4cc3cc]`} aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              <span className="text-[#4cc3cc]">コピーしました</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className={ICON} aria-hidden>
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
              </svg>
              <span className="hidden sm:inline">コピー</span>
            </>
          )}
        </span>
      </button>
      <a href={`mailto:${email}`} className="text-xs text-[#94A3B8] underline-offset-4 hover:text-white hover:underline">
        メールアプリで開く →
      </a>
    </div>
  );
}
