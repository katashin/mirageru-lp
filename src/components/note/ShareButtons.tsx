"use client";

import { useState } from "react";
import { trackShare, type ShareMethod } from "@/lib/analytics";

/** 共有ボタンが投稿につける自分の X アカウント（@ なし） */
const X_VIA = "coach_katayama";

/** 各 SNS の「投稿を作る」画面の住所。押した人のアカウントで投稿が作られる */
export function shareLinks(url: string, title: string) {
  const u = encodeURIComponent(url);
  const x = new URLSearchParams({ text: title, url, via: X_VIA });
  return {
    x: `https://x.com/intent/post?${x.toString()}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  };
}

const ICON = "h-[18px] w-[18px] fill-current";

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className={ICON}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className={ICON}>
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className={ICON}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const BUTTONS: { method: Exclude<ShareMethod, "copy">; label: string; short: string; color: string; Icon: () => React.ReactElement }[] = [
  { method: "x", label: "Xでポストする", short: "ポスト", color: "#000000", Icon: XIcon },
  { method: "facebook", label: "Facebookでシェアする", short: "シェア", color: "#1877F2", Icon: FacebookIcon },
  { method: "linkedin", label: "LinkedInでシェアする", short: "シェア", color: "#0A66C2", Icon: LinkedInIcon },
];

/** 記事を SNS で共有するボタン（X・Facebook・LinkedIn・リンクをコピー） */
export function ShareButtons({ url, title, slug }: { url: string; title: string; slug: string }) {
  const links = shareLinks(url, title);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackShare("copy", slug);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // コピーできない環境では何もしない
    }
  };

  return (
    <section aria-label="この記事をシェアする" className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
      <p className="mb-3 text-sm font-bold text-[#0F172A]">この記事をシェアする</p>
      <div className="flex flex-wrap gap-2">
        {BUTTONS.map(({ method, label, short, color, Icon }) => (
          <a
            key={method}
            href={links[method]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onClick={() => trackShare(method, slug)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: color }}
          >
            <Icon />
            <span aria-hidden>{short}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-bold text-[#334155] transition-colors hover:bg-[#F1F5F9]"
        >
          {copied ? "コピーしました" : "リンクをコピー"}
        </button>
      </div>
    </section>
  );
}
