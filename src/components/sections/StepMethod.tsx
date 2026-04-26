"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { STEP_ITEMS } from "@/lib/constants";

function StepCard({
  step,
  name,
  label,
  deliverable,
  isLast,
  index,
}: {
  step: number;
  name: string;
  label: string;
  deliverable: string;
  isLast: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="flex flex-col md:flex-row md:items-start">
      <motion.div
        ref={ref}
        className="flex flex-1 flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {/* ステップヘッダー */}
        <div className="mb-3 flex flex-col items-center rounded-xl bg-[#169db2] px-4 py-4 text-center text-white">
          <span className="mb-1 text-xs font-bold uppercase tracking-widest opacity-80">
            STEP {step}
          </span>
          <span className="text-lg font-bold">{name}</span>
          <span className="mt-1 text-xs opacity-80">{label}</span>
        </div>

        {/* 成果物 */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            成果物
          </p>
          <p className="text-xs leading-relaxed text-[#374151] md:text-sm">
            {deliverable}
          </p>
        </div>
      </motion.div>

      {/* 矢印（最後以外） */}
      {!isLast && (
        <div className="flex items-start justify-center px-2 pt-5 text-xl font-bold text-[#169db2] md:px-3">
          →
        </div>
      )}
    </div>
  );
}

export function StepMethod() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="step-method" className="bg-[#F8FAFC]">
      <motion.div
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
      </motion.div>

      {/* ステップ一覧（PC: 横並び、SP: 縦並び） */}
      <div className="hidden md:flex md:items-start md:gap-0">
        {STEP_ITEMS.map((item, i) => (
          <StepCard
            key={item.step}
            step={item.step}
            name={item.name}
            label={item.label}
            deliverable={item.deliverable}
            isLast={i === STEP_ITEMS.length - 1}
            index={i}
          />
        ))}
      </div>

      {/* SP: 縦並び */}
      <div className="flex flex-col gap-4 md:hidden">
        {STEP_ITEMS.map((item, i) => (
          <motion.div
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
                <p className="font-bold text-[#0F172A]">{item.name}</p>
                <p className="text-xs text-[#64748B]">{item.label}</p>
              </div>
            </div>
            <div className="rounded-lg bg-[#F8FAFC] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">成果物</p>
              <p className="mt-1 text-xs leading-relaxed text-[#374151]">{item.deliverable}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 補足 */}
      <motion.div
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
      </motion.div>
    </SectionWrapper>
  );
}
