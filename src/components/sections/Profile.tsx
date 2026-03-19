"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper";
import { REPRESENTATIVE_NAME } from "@/lib/constants";

export function Profile() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const msgRef = useRef(null);
  const msgInView = useInView(msgRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="profile" className="bg-white">
      {/* メインメッセージ */}
      <motion.div
        ref={msgRef}
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={msgInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          代表メッセージ
        </p>
        <h2
          className="mb-10 text-xl font-bold text-[#0F172A] md:text-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          「利益は、正しい仕組みの先に付いてくるもの」
        </h2>

        <div className="mx-auto max-w-2xl space-y-5 text-left text-base leading-loose text-[#64748B] md:text-lg">
          <p>
            ニトリでの15年間、組織を動かして確信したのは、<strong className="text-[#0F172A]">トップの超人的な頑張りで支える組織には、必ず成長の限界が来る</strong>ということです。
          </p>
          <p>
            現場の「勘」をデータで可視化し、誰でも正解が出せる仕組みへ「整える」。そして、その仕組みを動かす<strong className="text-[#0F172A]">「リーダーの心」をコーチングで育てる</strong>。
          </p>
          <p>
            私は単なるコンサルではありません。<strong className="text-[#0F172A]">実務を巻き取るPM（プロジェクトマネージャー）</strong>として、あなたの隣で共に現場を、そして未来を整えます。
          </p>
        </div>
      </motion.div>

      {/* プロフィール情報 */}
      <motion.div
        ref={ref}
        className="flex flex-col items-center gap-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 md:flex-row md:items-start md:gap-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* 写真 */}
        <div className="shrink-0">
          <div className="relative h-52 w-40 overflow-hidden rounded-xl border border-[#E2E8F0] shadow-sm">
            <Image
              src="/images/プロフィール画像.png"
              alt={`${REPRESENTATIVE_NAME}のプロフィール写真`}
              fill
              className="object-cover object-top"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="flex h-full w-full items-center justify-center bg-[#E2E8F0] text-4xl text-[#94A3B8]">
              👤
            </div>
          </div>
        </div>

        {/* テキスト */}
        <div className="flex-1 text-center md:text-left">
          <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-[#169db2]">
            MiraGeru 代表
          </p>
          <h3 className="mb-4 text-2xl font-bold text-[#0F172A]">
            {REPRESENTATIVE_NAME}
          </h3>

          <p className="mb-3 text-sm leading-relaxed text-[#64748B]">
            ㈱ニトリで15年間、120名規模の店舗マネジメント・業務システム改革室に従事。現在はDXコンサルとして法人研修の設計・企画運営を通じて組織の変革を支援。
          </p>

          <p className="text-sm text-[#64748B]">
            <span className="font-bold text-[#0F172A]">資格：</span>
            エグゼクティブコーチング協会認定トレーナー・NLPマスタープラクティショナー
          </p>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
