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
            "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(22,157,178,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl w-full px-6 py-24 md:px-8">
        <div className="flex flex-col items-center text-center mx-auto max-w-3xl">
          <motion.p
            className="mb-5 text-sm font-bold uppercase tracking-widest text-[#169db2]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            組織標準化の伴走支援
          </motion.p>

          <motion.h1
            className="mb-8 text-3xl font-bold leading-tight text-[#0F172A] md:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            リーダーが現場から解放され、
            <br />
            <span className="text-[#169db2]">利益が残る現場</span>に生まれ変わる
          </motion.h1>

          <motion.p
            className="mb-10 text-lg leading-loose text-[#64748B] md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            「自分がいないと現場が回らない」という呪縛を解き、
            <br />
            リーダー不在でも成長し続ける組織へ。
            <br />
            標準化プロジェクトの伴走支援から、後任育成までを完遂します。
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
