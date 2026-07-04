"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Arrow } from "@/components/icons";
import { useNucleusCanvas } from "@/hooks/useNucleusCanvas";
import { EASE } from "@/lib/motion";
import { HERO_CHIPS } from "@/lib/data";

/** Masked line that rises into place — used for the headline. */
const rise = (delay: number): Variants => ({
  hidden: { y: "110%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE, delay } },
});

/** Soft fade-and-lift for supporting copy. */
const fade = (delay: number, y = 16): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
});

const btnBase =
  "inline-flex items-center gap-[.6em] font-semibold text-[.95rem] px-6 py-[.92em] rounded-full relative overflow-hidden isolate transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1";

export default function Hero() {
  const t = useTranslations("Hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  useNucleusCanvas(canvasRef, resolvedTheme);
  const reduce = useReducedMotion();

  // When reduced motion is requested, render everything in its resting state.
  const motionState = reduce
    ? { initial: "show" as const }
    : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-[90px] text-fg dark:text-white hero-surface">
      <canvas
        id="nucleus"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1]"
      />
      <div className="absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] end-[-12%] top-[-18%] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(90,197,241,.22)_0%,rgba(90,197,241,0)_62%)] blur-[6px]" />
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)] relative z-[3]">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 items-center">
          <motion.div {...motionState}>
            <motion.span
              className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-navy dark:before:bg-cyan"
              variants={fade(0.05)}
            >
              {t("eyebrow")}
            </motion.span>
            <h1 className="font-display font-semibold text-[clamp(2.7rem,6.6vw,5.4rem)] leading-[.98] tracking-[-.025em] mt-[1.1rem] max-w-[16ch]">
              <span className="block overflow-hidden">
                <motion.span className="block" variants={rise(0.15)}>
                  {t("headingLine1")}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={rise(0.28)}>
                  {t.rich("headingLine2", {
                    grad: (chunks) => (
                      <span className="relative bg-[linear-gradient(180deg,#174094_0%,#2f8fcc_100%)] dark:bg-[linear-gradient(180deg,#5AC5F1_0%,#BFE9FB_100%)] bg-clip-text text-transparent">
                        {chunks}
                      </span>
                    ),
                  })}
                </motion.span>
              </span>
            </h1>
            <motion.p
              className="text-muted dark:text-foam text-[clamp(1.02rem,1.5vw,1.2rem)] max-w-[54ch] mt-[1.6rem]"
              variants={fade(0.5)}
            >
              {t("body")}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-[.9rem] mt-[2.2rem]"
              variants={fade(0.65)}
            >
              <a
                href="#isotopes"
                className={`${btnBase} bg-cyan text-ink hover:shadow-glow`}
              >
                {t("exploreIsotopes")} <Arrow />
              </a>
              <a
                href="#contact"
                className={`${btnBase} bg-transparent text-fg dark:text-white shadow-[inset_0_0_0_1.5px_rgba(11,27,58,.2)] dark:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.28)] hover:shadow-[inset_0_0_0_1.5px_#5AC5F1,0_18px_60px_rgba(90,197,241,.28)]`}
              >
                {t("talkToTeam")}
              </a>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-[.6rem] mt-[2.6rem] items-center"
              variants={fade(0.8)}
            >
              <span className="font-mono text-[.68rem] tracking-[.24em] uppercase text-subtle dark:text-dim me-[.4rem]">
                {t("supply")}
              </span>
              {HERO_CHIPS.map((chip) => (
                <span
                  className="font-mono text-[.82rem] font-medium tracking-[.04em] px-[.9em] py-[.45em] rounded-full text-navy dark:text-[#dff3fd] bg-[rgba(90,197,241,.08)] border border-[rgba(90,197,241,.28)] transition-[transform,background,box-shadow] duration-300 ease-smooth hover:-translate-y-[3px] hover:bg-[rgba(90,197,241,.16)] hover:shadow-[0_8px_24px_rgba(90,197,241,.2)] [&>b]:text-navy dark:[&>b]:text-cyan [&>b]:font-semibold"
                  key={chip.symbol}
                >
                  <b>{chip.symbol}</b>
                  {chip.mass}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute left-1/2 bottom-[26px] -translate-x-1/2 z-[3] flex flex-col items-center gap-2 font-mono text-[.6rem] tracking-[.3em] uppercase text-subtle dark:text-dim"
        variants={fade(1.1, 0)}
        {...motionState}
      >
        <span>{t("scroll")}</span>
        <span className="w-[22px] h-[36px] border-[1.5px] border-fg/25 dark:border-white/30 rounded-[14px] relative after:content-[''] after:absolute after:left-1/2 after:top-[7px] after:w-[3px] after:h-[7px] after:-ml-[1.5px] after:rounded-[2px] after:bg-cyan after:animate-wheel" />
      </motion.div>
    </section>
  );
}
