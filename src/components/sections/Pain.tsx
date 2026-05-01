"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PAIN_ITEMS } from "@/lib/constants";

export function Pain() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="pain" className="bg-[#F8FAFC]">
      <m.div
        ref={headingRef}
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          よくあるお悩み
        </p>
        <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">
          あなたの現場、こうなっていませんか？
        </h2>
      </m.div>

      <m.div
        ref={listRef}
        className="mx-auto max-w-2xl rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={listInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <ul className="flex flex-col gap-5">
          {PAIN_ITEMS.map((item, i) => (
            <m.li
              key={item.title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -16 }}
              animate={listInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-bold">
                ✕
              </span>
              <div>
                <p className="font-bold text-[#0F172A]">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                  {item.body}
                </p>
              </div>
            </m.li>
          ))}
        </ul>

        <m.p
          className="mt-8 text-center text-base font-bold text-[#0F172A]"
          initial={{ opacity: 0 }}
          animate={listInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          その悩み、すべて{" "}
          <span className="text-[#169db2]">ミラゲル</span> が解決します。
        </m.p>
      </m.div>
    </SectionWrapper>
  );
}
