"use client";

import { useRef, useState } from "react";

/** メールアドレスを表示し、「アドレスをコピー」で写せるようにする。コピーできない環境ではアドレスを選んだ状態にする */
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
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
      <span ref={textRef} className="select-all text-[#94A3B8]">
        {email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-[#334155] px-2.5 py-1 font-bold text-[#CBD5E1] transition-colors hover:bg-[#1E293B] hover:text-white"
      >
        {copied ? "コピーしました" : "アドレスをコピー"}
      </button>
    </div>
  );
}
