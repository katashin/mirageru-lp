"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { WHY_ITEMS } from "@/lib/constants";

function WhyItem({
  number,
  title,
  body,
  bridge,
  index,
}: {
  number: string;
  title: string;
  body: string;
  bridge: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="mb-4 text-3xl font-bold text-[#169db2] md:text-4xl" style={{ letterSpacing: "-0.04em" }}>
        {number}
      </div>
      <h3 className="mb-3 min-h-[3.5rem] text-lg font-bold text-[#0F172A] md:min-h-[4rem] md:text-xl">
        {title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-[#64748B] md:text-base">
        {body}
      </p>
      <div className="rounded-lg bg-[#EFF9FB] px-4 py-3">
        <p className="text-sm font-bold text-[#169db2]">→ {bridge}</p>
      </div>
    </motion.div>
  );
}

export function Why() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const bridgeRef = useRef(null);
  const bridgeInView = useInView(bridgeRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="why" className="bg-white">
      <motion.div
        ref={headingRef}
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          なぜできるのか
        </p>
        <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">
          ニトリで実証した、再現できる仕組みの作り方
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {WHY_ITEMS.map((item, i) => (
          <WhyItem
            key={item.number}
            number={item.number}
            title={item.title}
            body={item.body}
            bridge={item.bridge}
            index={i}
          />
        ))}
      </div>

      <motion.div
        ref={bridgeRef}
        className="mt-10 rounded-2xl bg-[#0F172A] px-8 py-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={bridgeInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-base font-bold text-white md:text-lg">
          大手で通用した手法を、
          <span className="text-[#169db2]">あなたの規模に合わせて</span>
          お届けします。
        </p>
        <p className="mt-2 text-sm text-[#94A3B8]">
          規模が変わっても、仕組みを作る原則は変わりません。
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
