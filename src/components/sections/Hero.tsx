"use client";

import { m } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";

const TRUST_ITEMS = [
  "ニトリ15年 × 3業態・3規模の現場改革経験",
  "御社専用の仕組みをゼロから一緒につくる",
  "現場に定着するまで実際に動ききる伴走支援",
] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 25% 55%, rgba(22,157,178,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-20 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">

          {/* ── Left: テキスト ── */}
          <div className="flex flex-col md:flex-1">
            {/* ラベル（opacity 固定 — LCP ブロック回避） */}
            <m.div
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex flex-col items-start gap-3"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-[#169db2]">
                業務標準化・リーダー育成の伴走支援
              </p>
              <div className="h-px w-10 bg-[#169db2]" />
            </m.div>

            {/* h1 — LCP 要素につき opacity:0 を使わない */}
            <m.h1
              className="mb-4 text-3xl font-bold leading-tight text-[#0F172A] md:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              あなたの頭の中にある
              <span className="text-[#169db2]">"やり方"</span>を、
              <br />
              組織が動く仕組みに変える。
            </m.h1>

            <m.p
              className="mb-3 text-base font-semibold text-[#0F172A] md:text-lg"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              リーダーが現場から解放され、利益が残る現場を構築。
            </m.p>

            <m.p
              className="mb-10 text-sm leading-loose text-[#64748B] md:text-base"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              「自分がいないと回らない」を卒業し、誰でも同じ品質で動ける組織へ。
              <br className="hidden md:block" />
              業務標準化とリーダー育成の伴走支援で、あなたの現場を根本から変えます。
            </m.p>

            <m.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <CTAButton />
              <p className="mt-3 text-xs text-[#64748B]">
                ※ 無料・完全オンライン・LINE登録だけでOK
              </p>
            </m.div>
          </div>

          {/* ── Right: ダークパネル ── */}
          <m.div
            className="w-full md:w-[380px] md:shrink-0"
            initial={{ x: 30 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="rounded-2xl bg-[#0F172A] p-7 shadow-xl">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-[#169db2]">
                なぜ ミラゲル か
              </p>

              <div className="mb-7 space-y-4">
                {TRUST_ITEMS.map((label, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#169db2] text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-[#CBD5E1]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-5 h-px bg-[#1E293B]" />

              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#475569]">
                こんな変化が起きています
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-xl bg-[#1E293B] px-3 py-3 text-center">
                  <p className="text-xs leading-relaxed text-[#94A3B8]">自分がいないと不安</p>
                </div>
                <span className="shrink-0 text-lg font-bold text-[#169db2]">→</span>
                <div className="flex-1 rounded-xl border border-[#169db2]/40 bg-[#169db2]/10 px-3 py-3 text-center">
                  <p className="text-xs font-bold text-[#5BBFCE]">誰でも動ける現場</p>
                </div>
              </div>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
