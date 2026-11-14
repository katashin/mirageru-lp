"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { CAREER_SHORT, LINE_NOTE } from "@/lib/constants";

const POINTS = [
  "御社専用の仕組みを、ゼロから一緒につくる",
  "現場に定着するまで、一緒に動ききる",
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-14 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 25% 55%, rgba(22,157,178,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-[1fr_360px] md:items-center md:gap-x-14 md:gap-y-6">
          {/* 左上：だれ向け・見出し */}
          <div className="flex flex-col gap-4 md:col-start-1 md:row-start-1">
            <p className="self-start rounded bg-[#e3f4f6] px-2.5 py-1 text-xs font-bold text-[#0e7c8c] md:text-sm">
              スタッフ3〜20名の店舗オーナーへ
            </p>

            {/* h1 は LCP 要素なので opacity:0 から始めない */}
            <m.h1
              className="text-[1.75rem] font-black leading-snug text-[#0F172A] md:text-[2.6rem]"
              style={{ letterSpacing: "-0.01em", textWrap: "balance" }}
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              「自分がいないと回らない」を、<span className="text-[#169db2]">仕組み</span>で卒業する。
            </m.h1>

            <p className="text-[15px] leading-relaxed text-[#334155] md:text-base">
              業務の標準化とリーダー育成を、ニトリ15年の元店長が、あなたのお店で一緒に進めます。
            </p>
          </div>

          {/* 右（スマホでは見出しの下）：写真と経歴 */}
          <div className="flex w-full flex-col gap-4 md:col-start-2 md:row-span-2 md:row-start-1">
            <div className="flex items-center gap-4 rounded-2xl border border-[#e2e8f0] bg-[#F8FAFC] p-4">
              <Image
                src="/images/profile.png"
                alt="片山 真介"
                width={80}
                height={80}
                priority
                className="h-16 w-16 flex-none rounded-full object-cover md:h-20 md:w-20"
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-base font-bold text-[#0F172A]">片山 真介</p>
                <p className="text-xs leading-relaxed text-[#334155]">{CAREER_SHORT}</p>
              </div>
            </div>
            <ul className="flex flex-col gap-2 px-1">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-[#334155]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#169db2]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* 左下（スマホでは写真の下）：LINE ボタン */}
          <div className="flex flex-col items-stretch gap-2 md:col-start-1 md:row-start-2 md:items-start">
            <CTAButton place="hero" className="w-full md:w-auto" />
            <p className="text-center text-xs text-[#64748B] md:text-left">{LINE_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
