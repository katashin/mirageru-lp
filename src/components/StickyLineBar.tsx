"use client";

import { LINE_URL, COLORS } from "@/lib/constants";
import { trackLineClick } from "@/lib/analytics";

/** スマホ幅だけ、画面の下に LINE ボタンを出す */
export function StickyLineBar({ slug }: { slug?: string }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[#e2e8f0] bg-white/95 px-4 pt-2 backdrop-blur md:hidden"
      style={{ paddingBottom: "calc(0.6rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLineClick("sticky", slug)}
        className="flex-1 rounded-full py-2.5 text-center text-sm font-bold text-white"
        style={{ backgroundColor: COLORS.line }}
      >
        LINEで無料相談
      </a>
      <span className="text-xs leading-tight text-[#64748B]">50分・オンライン</span>
    </div>
  );
}
