"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SERVICES } from "@/lib/constants";

function ServiceCard({
  title,
  tagline,
  description,
  duration,
  featured,
  features,
  index,
}: {
  title: string;
  tagline: string;
  description: string;
  duration: string;
  featured: boolean;
  features: readonly string[];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      className="relative flex h-full flex-col rounded-xl border-2 border-[#169db2] bg-white p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >


      {/* ヘッダー */}
      <div className="mb-4">
        <div className="mb-1 text-xs font-bold text-[#169db2]">{duration}</div>
        <h3 className={`whitespace-pre-line text-xl font-bold md:text-2xl ${featured ? "text-[#169db2]" : "text-[#0F172A]"}`}>
          {title}
        </h3>
      </div>

      {/* タグライン */}
      <p className="mb-3 text-sm font-bold text-[#0F172A]">{tagline}</p>

      {/* 説明文 */}
      <p className="mb-5 text-sm leading-relaxed text-[#64748B]">{description}</p>

      {/* 区切り線 */}
      <hr className="mb-5 border-[#E2E8F0]" />

      {/* チェックリスト */}
      <ul className="mt-auto flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[#0F172A]">
            <span className="mt-0.5 shrink-0 text-base leading-none text-[#169db2]">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </m.div>
  );
}

export function Services() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="services" className="bg-[#F8FAFC]">
      <m.div
        ref={headingRef}
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#169db2]">
          サービスメニュー
        </p>
        <h2 className="text-xl font-bold text-[#0F172A] md:text-3xl">
          3つのメニュー
        </h2>
      </m.div>

      <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {SERVICES.map((service, i) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            tagline={service.tagline}
            description={service.description}
            duration={service.duration}
            featured={service.featured}
            features={service.features}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
