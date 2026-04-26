"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-20">
      {/* 背景の装飾 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(22,157,178,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl w-full px-6 py-24 md:px-8">
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-col items-center gap-3"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-[#169db2]">
              業務標準化・リーダー育成の伴走支援
            </p>
            <div className="h-px w-10 bg-[#169db2]" />
          </motion.div>

          <motion.h1
            className="mb-4 text-3xl font-bold leading-tight text-[#0F172A] md:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            あなたの頭の中にある
            <span className="text-[#169db2]">"やり方"</span>を、
            <br />
            組織が動く仕組みに変える。
          </motion.h1>

          <motion.p
            className="mb-3 text-base font-semibold text-[#0F172A] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            リーダーが現場から解放され、利益が残る現場を構築。
          </motion.p>

          <motion.p
            className="mb-10 text-base leading-loose text-[#64748B] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            「自分がいないと回らない」を卒業し、誰でも同じ品質で動ける組織へ。
            <br />
            業務標準化とリーダー育成の伴走支援で、あなたの現場を根本から変えます。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <CTAButton />
            <p className="mt-3 text-xs text-[#64748B]">
              ※ 無料・完全オンライン・LINE登録だけでOK
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
