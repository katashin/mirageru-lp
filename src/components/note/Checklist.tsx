"use client";

import { LINE_URL } from "@/lib/constants";
import { trackLineClick } from "@/lib/analytics";

export function Checklist({ items, slug }: { items: string[]; slug: string }) {
  if (!items.length) return null;
  return (
    <section className="flex flex-col gap-3">
      <div className="rounded-xl border border-dashed border-[#94a3b8] p-5">
        <p className="mb-2 text-sm font-bold text-[#0F172A]">あなたのお店は、あてはまりますか？</p>
        <ul className="flex flex-col gap-1.5 text-[15px]">
          {items.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden>☐</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="rounded-md border border-[#e2e8f0] border-l-4 border-l-[#169db2] px-4 py-3 text-sm">
        2つ以上あてはまるなら、
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLineClick("article_mid", slug)}
          className="font-bold text-[#0e7c8c] underline-offset-2 hover:underline"
        >
          無料相談で一緒に整理できます →
        </a>
      </p>
    </section>
  );
}
