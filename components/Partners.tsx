"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { revealProps, staggerContainer, staggerItem } from "@/lib/motion";

const LOGOS = [
  <>Mirion</>,
  <>
    Eckert<span> &amp;</span> Ziegler
  </>,
  <>
    Epsilon<span> Sources</span>
  </>,
  <>
    EANM<span> 2024</span>
  </>,
];

export default function Partners() {
  const t = useTranslations("Partners");
  const reduce = useReducedMotion();

  return (
    <section className="bg-base border-b border-hairline py-[46px]">
      <motion.div
        className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)] flex items-center justify-between gap-8 flex-wrap mx-sm:justify-center mx-sm:text-center"
        variants={staggerContainer(0.1)}
        {...revealProps(reduce)}
      >
        <motion.p
          className="font-mono text-[.72rem] tracking-[.18em] uppercase text-muted max-w-[18ch] leading-[1.5]"
          variants={staggerItem}
        >
          {t("tagline")}
        </motion.p>
        <motion.div
          className="flex items-center gap-[clamp(1.8rem,5vw,3.6rem)] flex-wrap"
          variants={staggerContainer(0.08)}
        >
          {LOGOS.map((logo, i) => (
            <motion.span
              className="font-display font-semibold text-[clamp(1.05rem,1.6vw,1.35rem)] text-subtle tracking-[-.01em] transition-[color,transform] duration-300 whitespace-nowrap hover:text-cyan hover:-translate-y-0.5 [&_span]:text-cyan"
              variants={staggerItem}
              key={i}
            >
              {logo}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
