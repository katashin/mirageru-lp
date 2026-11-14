"use client";

import { LINE_URL, COLORS } from "@/lib/constants";
import { trackLineClick } from "@/lib/analytics";
import { useAudience } from "@/components/audience/AudienceContext";
import { KATARIAI_APPLY_NOTE, KATARIAI_LINE_URL } from "@/lib/katariai";

/** スマホ幅だけ、画面の下に LINE ボタンを出す */
export function StickyLineBar({ slug }: { slug?: string }) {
  // 個人向けのタブを見ているときは、カタリアイの無料面談に切り替える
  const katariai = useAudience().audience === "katariai";
  return (
    <>
    {/* バーの高さの分のすきま（ページの最後がバーに隠れないように） */}
    <div data-testid="sticky-spacer" className="h-20 md:hidden" aria-hidden />
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[#e2e8f0] bg-white/95 px-4 pt-2 backdrop-blur md:hidden"
      style={{ paddingBottom: "calc(0.6rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={katariai ? KATARIAI_LINE_URL : LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLineClick(katariai ? "katariai_sticky" : "sticky", slug)}
        className="flex-1 rounded-full py-2.5 text-center text-sm font-bold text-white"
        style={{ backgroundColor: katariai ? "#1E2A44" : COLORS.line }}
      >
        {katariai ? "無料面談を申し込む" : "LINEで無料相談"}
      </a>
      <span className="text-xs leading-tight text-[#64748B]">{katariai ? KATARIAI_APPLY_NOTE : "50分・オンライン"}</span>
    </div>
    </>
  );
}
