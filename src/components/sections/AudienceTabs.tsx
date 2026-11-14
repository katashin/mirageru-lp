"use client";

import type { ReactNode } from "react";
import { AUDIENCE_TABS_ID, useAudience, type Audience } from "@/components/audience/AudienceContext";

const TABS: { id: Audience; label: string; accent: string }[] = [
  { id: "business", label: "店舗・会社の方", accent: "#169db2" },
  { id: "katariai", label: "管理職・個人の方", accent: "#9C7A3C" },
];

/**
 * 会社向けと個人向け（カタリアイ）を切り替えるタブ。
 * 2つの中身はどちらも HTML に出し、見えない方は hidden で隠すだけ（検索エンジンが会社向けの文章を読めるように）
 */
export function AudienceTabs({ business, katariai }: { business: ReactNode; katariai: ReactNode }) {
  const { audience, select } = useAudience();
  const panels: Record<Audience, ReactNode> = { business, katariai };

  return (
    <>
      <div
        id={AUDIENCE_TABS_ID}
        className="sticky top-[56px] z-40 scroll-mt-[56px] border-b border-[#E2E8F0] bg-white md:top-[68px] md:scroll-mt-[68px]"
      >
        <div role="tablist" aria-label="サービスの切り替え" className="mx-auto flex max-w-5xl">
          {TABS.map((t) => {
            const on = audience === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                onClick={() => select(t.id)}
                className={`flex-1 border-b-2 px-2 py-3 text-sm font-bold transition-colors md:text-base ${
                  on ? "text-[#0F172A]" : "border-transparent text-[#94A3B8] hover:text-[#475569]"
                }`}
                style={on ? { borderBottomColor: t.accent } : undefined}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      {TABS.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={audience !== t.id}
        >
          {panels[t.id]}
        </div>
      ))}
    </>
  );
}
