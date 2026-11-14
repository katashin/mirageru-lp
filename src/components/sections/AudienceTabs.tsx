"use client";

import type { ReactNode } from "react";
import { AUDIENCE_TABS_ID, useAudience, type Audience } from "@/components/audience/AudienceContext";

const TABS: { id: Audience; label: string; service: string; accent: string; bg: string }[] = [
  { id: "business", label: "店舗・会社の方", service: "仕組みづくり", accent: "#169db2", bg: "#FFFFFF" },
  // Xから来た個人が気づけるよう、カタリアイ側はいつも生成りの地に金の文字
  { id: "katariai", label: "管理職・個人の方", service: "カタリアイ", accent: "#9C7A3C", bg: "#F7F5F0" },
];

/**
 * ページの一番上で、会社向けと個人向け（カタリアイ）を切り替えるタブ。
 * 2つの中身はどちらも HTML に出し、見えない方は hidden で隠すだけ（検索エンジンが会社向けの文章を読めるように）
 */
export function AudienceTabs({ business, katariai }: { business: ReactNode; katariai: ReactNode }) {
  const { audience, select } = useAudience();
  const panels: Record<Audience, ReactNode> = { business, katariai };

  return (
    <>
      {/* 固定ヘッダーの高さの分のすきま */}
      <div aria-hidden className="h-14 md:h-[68px]" />
      {/* /#katariai で来たとき、ブラウザがタブの位置まで動くための目印 */}
      <div id="katariai" aria-hidden className="scroll-mt-14 md:scroll-mt-[68px]" />
      <div
        id={AUDIENCE_TABS_ID}
        className="sticky top-14 z-40 scroll-mt-14 border-b border-[#E2E8F0] bg-white md:top-[68px] md:scroll-mt-[68px]"
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
                className="flex-1 border-b-[3px] px-2 pb-2 pt-2.5 text-center transition-colors md:pb-3 md:pt-3.5"
                style={{ backgroundColor: t.bg, borderBottomColor: on ? t.accent : "transparent" }}
              >
                <span className={`block text-[15px] font-bold leading-tight md:text-lg ${on ? "text-[#0F172A]" : "text-[#64748B]"}`}>
                  {t.label}
                </span>
                <span className="mt-0.5 block text-xs font-bold md:text-sm" style={{ color: t.accent }}>
                  {t.service}
                </span>
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
