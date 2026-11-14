"use client";

import { useAudience, type Audience } from "@/components/audience/AudienceContext";

const DOORS: { id: Audience; who: string; what: string; className: string; whoClass: string }[] = [
  {
    id: "business",
    who: "店舗・会社の方",
    what: "仕組みづくり（標準化 × リーダー育成）",
    className: "bg-[#0F172A] text-white hover:bg-[#1E293B]",
    whoClass: "text-[#9fdbe5]",
  },
  {
    id: "katariai",
    who: "管理職・リーダー個人の方",
    what: "カタリアイ（本音の語り合い）",
    className: "border border-[#E8DEC8] bg-[#F7F5F0] text-[#1E2A44] hover:bg-[#F1EDE3]",
    whoClass: "text-[#9C7A3C]",
  },
];

/** トップの最初の画面：会社向けと個人向けの2つの入口 */
export function AudienceGate() {
  const { audience, select } = useAudience();

  return (
    <section className="bg-white pt-[72px] md:pt-[92px]">
      <div className="mx-auto max-w-5xl px-5 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div className="mb-4 lg:mb-0">
            <p className="text-xs font-bold text-[#0e7c8c] md:text-sm">ミラゲル ― 未来につなげる</p>
            <p
              className="mt-1 text-lg font-bold leading-snug text-[#0F172A] md:text-2xl"
              style={{ textWrap: "balance" }}
            >
              現場のリーダーが、一人で抱えなくていい仕組みと相手を。
            </p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:w-[560px] lg:shrink-0">
            {DOORS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => select(d.id, { scroll: true })}
                aria-pressed={audience === d.id}
                className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors ${d.className}`}
              >
                <span>
                  <span className={`block text-xs font-bold ${d.whoClass}`}>{d.who}</span>
                  <span className="block text-sm font-bold md:text-[15px]">{d.what}</span>
                </span>
                <span aria-hidden className="text-lg leading-none">↓</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
