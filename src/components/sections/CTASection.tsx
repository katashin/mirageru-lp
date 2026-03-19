"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { CTAButton } from "@/components/CTAButton";
import { CTA_STEPS } from "@/lib/constants";

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="cta" className="bg-[#F8FAFC]">
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
        <h2 className="mb-4 text-xl font-bold text-[#0F172A] md:text-3xl">
          まず、50分間話しましょう
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-sm leading-relaxed text-[#64748B] md:text-base">
          現場の課題を整理するだけでも、大きな気づきになります。
          まずは気軽にLINEでご連絡ください。
        </p>

        {/* ステップ */}
        <div className="mx-auto mb-12 grid max-w-2xl gap-4 md:grid-cols-3">
          {CTA_STEPS.map((item, i) => (
            <div
              key={item.step}
              className="relative rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
            >
              {i < CTA_STEPS.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[#169db2] md:block">
                  →
                </span>
              )}
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#169db2] text-sm font-bold text-white">
                {item.step}
              </div>
              <p className="text-sm font-bold text-[#0F172A]">{item.label}</p>
            </div>
          ))}
        </div>

        <CTAButton />
      </motion.div>
    </SectionWrapper>
  );
}
