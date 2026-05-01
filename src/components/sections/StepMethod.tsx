"use client";

import { Fragment } from "react";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper";
import { STEP_ITEMS } from "@/lib/constants";

const SHIKUMIRU_STEPS = new Set([1, 3, 4]);

export function StepMethod() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const shikumiruRef = useRef(null);
  const shikumiruInView = useInView(shikumiruRef, { once: true, margin: "-60px" });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="step-method" className="bg-[#F8FAFC]">
      <m.div
        ref={headingRef}
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          伴走支援の進め方
        </p>
        <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">
          5ステップメソッド
        </h2>
        <p className="mt-4 text-sm text-[#64748B] md:text-base">
          クライアントのプロジェクトオーナーと二人三脚で進めます。
        </p>
      </m.div>

      {/* PC: CSS Grid 2行レイアウト — Row1=ステップヘッダー / Row2=成果物カード */}
      <div ref={gridRef} className="hidden md:block">
        <div className="grid grid-cols-[1fr_44px_1fr_44px_1fr_44px_1fr_44px_1fr] gap-y-3">

          {/* Row 1: ステップヘッダー（全ボックスが同じ高さに揃う） */}
          {STEP_ITEMS.map((item, i) => (
            <Fragment key={`step-${item.step}`}>
              <m.div
                className="flex flex-col items-center justify-center rounded-xl bg-[#169db2] px-3 py-5 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">
                  STEP {item.step}
                </span>
                <span className="text-sm font-bold leading-snug">{item.name}</span>
                <span className="mt-1.5 text-[11px] opacity-70">{item.label}</span>
                {SHIKUMIRU_STEPS.has(item.step) && (
                  <span className="mt-2 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold tracking-wide text-white">
                    シクミル対応
                  </span>
                )}
              </m.div>
              {i < STEP_ITEMS.length - 1 && (
                <div className="flex items-center justify-center text-xl font-bold text-[#169db2]">
                  →
                </div>
              )}
            </Fragment>
          ))}

          {/* Row 2: 成果物カード（全カードが同じ高さに揃う） */}
          {STEP_ITEMS.map((item, i) => (
            <Fragment key={`deliv-${item.step}`}>
              <m.div
                className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                  成果物
                </p>
                <p className="text-xs leading-relaxed text-[#374151]">
                  {item.deliverable}
                </p>
              </m.div>
              {i < STEP_ITEMS.length - 1 && <div />}
            </Fragment>
          ))}
        </div>
      </div>

      {/* SP: 縦積みカード */}
      <div className="flex flex-col gap-4 md:hidden">
        {STEP_ITEMS.map((item, i) => (
          <m.div
            key={item.step}
            className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#169db2] text-sm font-bold text-white">
                {item.step}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-[#0F172A]">{item.name}</p>
                  {SHIKUMIRU_STEPS.has(item.step) && (
                    <span className="rounded-full bg-[#169db2]/10 px-2 py-0.5 text-[9px] font-bold text-[#169db2]">
                      シクミル
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#64748B]">{item.label}</p>
              </div>
            </div>
            <div className="rounded-lg bg-[#F8FAFC] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">成果物</p>
              <p className="mt-1 text-xs leading-relaxed text-[#374151]">{item.deliverable}</p>
            </div>
          </m.div>
        ))}
      </div>

      {/* シクミル紹介パネル */}
      <m.div
        ref={shikumiruRef}
        className="mt-8 overflow-hidden rounded-2xl border border-[#169db2]/20 bg-[#F0FAFB]"
        initial={{ opacity: 0, y: 16 }}
        animate={shikumiruInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* テキスト */}
          <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
            <span className="mb-3 inline-block self-start rounded-full bg-[#169db2] px-3 py-1 text-xs font-bold text-white">
              独自ツール
            </span>
            <h3 className="mb-3 text-base font-bold text-[#0F172A] md:text-lg">
              シクミル — 業務フロー・マニュアル・稼働計画が、ひとつにつながる
            </h3>
            <p className="text-sm leading-relaxed text-[#64748B]">
              各ステップで作った成果物がバラバラのままでは、改善のサイクルは止まります。シクミルは3つのデータを横串でつなぐことで、「作成→標準化→実行→改善」の流れを一元管理。支援終了後も、クライアント自身が使い続けられる仕組みです。
            </p>
          </div>
          {/* スクリーンショット */}
          <div className="relative shrink-0 md:w-[480px]">
            <Image
              src="/images/shikumiru-preview.png"
              alt="シクミル — 稼働計画・作業一覧ビュー"
              width={960}
              height={640}
              className="h-full w-full object-cover object-left-top"
            />
          </div>
        </div>
      </m.div>

      {/* 補足バナー */}
      <m.div
        ref={footerRef}
        className="mt-10 rounded-2xl bg-[#0F172A] px-8 py-6 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={footerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-bold text-white md:text-base">
          すべての成果物は
          <span className="text-[#169db2]">クライアントの資産として残ります。</span>
        </p>
        <p className="mt-1 text-xs text-[#94A3B8]">
          支援終了後も、社内で活用し続けられます。
        </p>
      </m.div>
    </SectionWrapper>
  );
}
