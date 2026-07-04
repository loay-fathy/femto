"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeUp,
  revealProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { ABOUT_TIMELINE } from "@/lib/data";

export default function AboutTimeline() {
  const reduce = useReducedMotion();
  const t = useTranslations("AboutTimeline");

  return (
    <section
      className="relative py-[clamp(72px,9vw,128px)] bg-surface"
      id="journey"
    >
      <div className="absolute inset-0 pointer-events-none text-fg opacity-[.06] bg-[radial-gradient(currentColor_1px,transparent_1.4px)] [background-size:26px_26px]" />
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="mb-[clamp(40px,5vw,64px)] text-center flex flex-col items-center"
          variants={fadeUp()}
          {...revealProps(reduce)}
        >
          <span className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-cyan after:content-[''] after:w-[26px] after:h-px after:bg-cyan">
            {t("eyebrow")}
          </span>
          <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.15rem)] leading-[1.06] tracking-[-.02em] mt-2">
            {t("heading")}
          </h2>
        </motion.div>

        <motion.div
          className="relative max-w-[880px] mx-auto before:content-[''] before:absolute before:left-1/2 before:top-2 before:bottom-2 before:w-0.5 before:-ms-px before:bg-[linear-gradient(180deg,transparent,#5AC5F1_10%,#174094_90%,transparent)] mx-md:before:start-2"
          variants={staggerContainer(0.12)}
          {...revealProps(reduce)}
        >
          {ABOUT_TIMELINE.map((m, i) => (
            <motion.div
              className="group relative w-1/2 pb-[clamp(2rem,4vw,3rem)] last:pb-0 odd:start-0 odd:pe-[clamp(1.8rem,3.5vw,3rem)] odd:text-end even:start-1/2 even:ps-[clamp(1.8rem,3.5vw,3rem)] mx-md:!w-full mx-md:!start-0 mx-md:!text-start mx-md:!ps-[2.4rem] mx-md:!pe-0"
              variants={staggerItem}
              key={m.key}
            >
              <span
                className={`absolute top-1 w-[18px] h-[18px] rounded-full bg-elevated border-2 border-cyan z-[2] ${
                  i % 2 === 0 ? "end-[-9px]" : "start-[-9px]"
                } mx-md:!start-[-1px] mx-md:!end-auto after:content-[''] after:absolute after:inset-[3px] after:rounded-full after:bg-cyan after:animate-tlpulse`}
                aria-hidden="true"
              />
              <div className="bg-elevated border border-hairline rounded-[18px] px-[1.6rem] py-6 shadow-soft transition-[transform,box-shadow,border-color] duration-400 ease-smooth group-hover:-translate-y-1 group-hover:shadow-md2 group-hover:border-[rgba(90,197,241,.45)]">
                <span className="font-mono text-[.72rem] tracking-[.2em] uppercase text-cyan font-semibold">
                  {t(`items.${m.key}.year`)}
                </span>
                <h3 className="font-display font-semibold text-[1.2rem] mt-[.45rem] mb-2">
                  {t(`items.${m.key}.title`)}
                </h3>
                <p className="text-muted text-[.93rem] leading-[1.6]">
                  {t(`items.${m.key}.body`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
