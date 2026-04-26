"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WHY_STORY } from "@/lib/constants";

export function WhyStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const catchRef = useRef(null);
  const catchInView = useInView(catchRef, { once: true, margin: "-60px" });

  return (
    <section id="why-story" className="w-full bg-[#0F172A] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
        {/* 見出し */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#169db2]">
            Why
          </p>
          <h2 className="mb-14 text-xl font-bold text-white md:text-3xl">
            {WHY_STORY.heading}
          </h2>
        </motion.div>

        {/* 本文 */}
        <div className="space-y-8">
          {WHY_STORY.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              className="whitespace-pre-line text-base leading-loose text-[#94A3B8] md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* 締めキャッチ */}
        <motion.div
          ref={catchRef}
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={catchInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto mb-6 h-px w-16 bg-[#169db2]" />
          <p className="text-lg font-bold text-white md:text-2xl">
            {WHY_STORY.catchPhrase}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
