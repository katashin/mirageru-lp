"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { BEFORE_AFTER } from "@/lib/constants";

export function BeforeAfter() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const catchRef = useRef(null);
  const catchInView = useInView(catchRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="before-after" className="bg-[#F8FAFC]">
      <motion.div
        ref={headingRef}
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          変化のイメージ
        </p>
        <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">
          仕組みが整うと、現場は必ず変わる
        </h2>
      </motion.div>

      {/* Before / After グリッド */}
      <motion.div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-[1fr_auto_1fr]"
        initial={{ opacity: 0, y: 20 }}
        animate={gridInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Before */}
        <div className="rounded-2xl border-2 border-[#E2E8F0] bg-white p-6 md:p-8">
          <div className="mb-5 inline-block rounded-full bg-[#FEE2E2] px-4 py-1.5">
            <span className="text-sm font-bold text-[#DC2626]">Before（現状）</span>
          </div>
          <ul className="flex flex-col gap-4">
            {BEFORE_AFTER.before.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-xs font-bold text-[#DC2626]">
                  ✕
                </span>
                <span className="text-sm font-medium text-[#64748B] md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 矢印 */}
        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#169db2] text-2xl text-white shadow-md md:h-14 md:w-14">
            →
          </div>
        </div>

        {/* After */}
        <div className="rounded-2xl border-2 border-[#169db2] bg-white p-6 md:p-8">
          <div className="mb-5 inline-block rounded-full bg-[#CCEFF4] px-4 py-1.5">
            <span className="text-sm font-bold text-[#169db2]">After</span>
          </div>
          <ul className="flex flex-col gap-4">
            {BEFORE_AFTER.after.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#CCEFF4] text-xs font-bold text-[#169db2]">
                  ✓
                </span>
                <span className="text-sm font-medium text-[#0F172A] md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* キャッチフレーズ */}
      <motion.div
        ref={catchRef}
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={catchInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg font-bold text-[#0F172A] md:text-2xl">
          {BEFORE_AFTER.catchPhrase}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
