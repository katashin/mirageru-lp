"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { USP as USP_DATA } from "@/lib/constants";

function Column({
  title,
  tagline,
  items,
  index,
}: {
  title: string;
  tagline: string;
  items: readonly string[];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <h3 className="mb-1 text-xl font-bold text-[#169db2] md:text-2xl">{title}</h3>
      <p className="mb-5 text-sm font-bold text-[#0F172A]">{tagline}</p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#374151] md:text-base">
            <span className="mt-0.5 shrink-0 font-bold text-[#169db2]">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </m.div>
  );
}

export function USP() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const leadRef = useRef(null);
  const leadInView = useInView(leadRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="usp" className="bg-[#F8FAFC]">
      <m.div
        ref={headingRef}
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          MiraGeru が提供できること
        </p>
        <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">
          業務標準化 × リーダー育成の掛け合わせ
        </h2>
      </m.div>

      <m.p
        ref={leadRef}
        className="mx-auto mb-12 max-w-2xl text-center text-sm leading-loose text-[#64748B] md:text-base"
        initial={{ opacity: 0, y: 16 }}
        animate={leadInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        「仕組み」だけあっても、動かす「人」がいなければ意味がない。
        <br />
        「人」だけ育てても、「仕組み」がなければ属人化は続く。
        <br className="hidden md:block" />
        この2つが掛け合わさることで、はじめて「自分がいなくても回る組織」になります。
      </m.p>

      <div className="grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
        <Column
          title={USP_DATA.standardization.title}
          tagline={USP_DATA.standardization.tagline}
          items={USP_DATA.standardization.items}
          index={0}
        />

        {/* × マーク */}
        <div className="flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF9FB] text-2xl font-bold text-[#169db2]">
            ×
          </div>
        </div>

        <Column
          title={USP_DATA.leadership.title}
          tagline={USP_DATA.leadership.tagline}
          items={USP_DATA.leadership.items}
          index={1}
        />
      </div>

      <div className="mt-10 rounded-2xl bg-[#EFF9FB] px-8 py-5 text-center">
        <p className="text-base font-bold text-[#0F172A] md:text-lg">
          この2つが掛け合わさることで、はじめて
          <span className="text-[#169db2]">「自分がいなくても回る組織」</span>
          になります。
        </p>
      </div>
    </SectionWrapper>
  );
}
