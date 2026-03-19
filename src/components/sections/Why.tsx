"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { WHY_ITEMS } from "@/lib/constants";

function WhyItem({
  number,
  title,
  body,
  index,
}: {
  number: string;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="mb-4 text-3xl font-bold text-[#169db2] md:text-4xl" style={{ letterSpacing: "-0.04em" }}>
        {number}
      </div>
      <h3 className="mb-3 text-lg font-bold text-[#0F172A] md:text-xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#64748B] md:text-base">
        {body}
      </p>
    </motion.div>
  );
}

export function Why() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

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
          選ばれる理由
        </p>
        <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">
          MiraGeru、3つの強み
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {WHY_ITEMS.map((item, i) => (
          <WhyItem
            key={item.number}
            number={item.number}
            title={item.title}
            body={item.body}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
