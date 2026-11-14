"use client";

import { m } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { LINE_NOTE } from "@/lib/constants";
import { HeroVisual } from "./HeroVisual";

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
        <div className="grid gap-6 md:grid-cols-[1fr_440px] lg:grid-cols-[1fr_470px] md:items-center md:gap-x-10 md:gap-y-6">
          {/* 左上：だれ向け・見出し */}
          <div className="order-1 flex flex-col gap-4 md:order-none md:col-start-1 md:row-start-1">
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

          {/* 右（スマホではボタンの下）：今 → 仕組みのあと と 5ステップ */}
          <div className="order-3 w-full md:order-none md:col-start-2 md:row-span-2 md:row-start-1">
            <HeroVisual />
          </div>

          {/* 左下（スマホでは見出しのすぐ下）：LINE ボタン */}
          <div className="order-2 flex flex-col items-stretch gap-2 md:order-none md:col-start-1 md:row-start-2 md:items-start">
            <CTAButton place="hero" className="w-full md:w-auto" />
            <p className="text-center text-xs text-[#64748B] md:text-left">{LINE_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
