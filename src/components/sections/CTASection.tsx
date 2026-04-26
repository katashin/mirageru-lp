"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { CTAButton } from "@/components/CTAButton";
import { CTA_STEPS, EMAIL_ADDRESS } from "@/lib/constants";

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="cta" className="bg-[#0F172A]">
      <motion.div
        ref={ref}
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          無料相談
        </p>
        <h2 className="mb-4 text-xl font-bold text-white md:text-3xl">
          まずは、無料相談から。
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-sm leading-relaxed text-[#94A3B8] md:text-base">
          あなたの現場の課題を、50分でヒアリングします。
          <br />
          「何から始めればいいか分からない」そんな状態でも大丈夫です。
        </p>

        {/* LINEステップ */}
        <div className="mx-auto mb-10 grid max-w-2xl gap-4 md:grid-cols-3">
          {CTA_STEPS.map((item, i) => (
            <div
              key={item.step}
              className="relative rounded-xl border border-[#1E293B] bg-[#1E293B] p-6"
            >
              {i < CTA_STEPS.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[#169db2] md:block">
                  →
                </span>
              )}
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#169db2] text-sm font-bold text-white">
                {item.step}
              </div>
              <p className="text-sm font-bold text-white">{item.label}</p>
            </div>
          ))}
        </div>

        {/* LINE CTA（メイン） */}
        <CTAButton />
        <p className="mt-2 text-xs text-[#64748B]">
          ※ 無料・完全オンライン・1分で登録完了
        </p>

        {/* セパレーター */}
        <div className="mx-auto my-8 flex max-w-xs items-center gap-4">
          <hr className="flex-1 border-[#1E293B]" />
          <span className="text-sm text-[#475569]">または</span>
          <hr className="flex-1 border-[#1E293B]" />
        </div>

        {/* メール CTA（サブ） */}
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="inline-flex items-center gap-2 rounded-lg border border-[#334155] bg-transparent px-6 py-3 text-sm font-bold text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-white"
        >
          メールで問い合わせる
        </a>
        <p className="mt-2 text-xs text-[#475569]">{EMAIL_ADDRESS}</p>
      </motion.div>
    </SectionWrapper>
  );
}
