"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeUp,
  hoverTransition,
  revealProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { ABOUT_PROCESS } from "@/lib/data";

export default function AboutProcess() {
  const reduce = useReducedMotion();
  const t = useTranslations("AboutProcess");

  return (
    <section
      className="relative overflow-hidden py-[clamp(72px,9vw,128px)] text-fg dark:text-white panel-panel"
      id="process"
    >
      <div className="absolute w-[60vw] h-[60vw] max-w-[720px] max-h-[720px] start-[-12%] bottom-[-26%] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(90,197,241,.18)_0%,rgba(90,197,241,0)_62%)] blur-[6px]" />
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)] relative z-[2]">
        <motion.div
          className="mb-[clamp(40px,5vw,64px)] text-center flex flex-col items-center"
          variants={fadeUp()}
          {...revealProps(reduce)}
        >
          <span className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-navy dark:before:bg-cyan after:content-[''] after:w-[26px] after:h-px after:bg-navy dark:after:bg-cyan">
            {t("eyebrow")}
          </span>
          <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.15rem)] leading-[1.06] tracking-[-.02em] mt-2">
            {t("heading")}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-4 gap-[1.4rem] relative mt-[clamp(40px,5vw,60px)] mx-lg:grid-cols-2 mx-lg:gap-[2.6rem_1.4rem] mx-md:grid-cols-1 mx-md:gap-[1.6rem] mx-md:max-w-[420px] mx-md:mx-auto"
          variants={staggerContainer(0.12)}
          {...revealProps(reduce)}
        >
          <span
            className="absolute top-[35px] start-[11%] end-[11%] h-0.5 bg-[repeating-linear-gradient(90deg,rgba(90,197,241,.55)_0_8px,transparent_8px_18px)] mx-lg:hidden"
            aria-hidden="true"
          />
          {!reduce && (
            <span
              className="absolute top-[31px] w-[10px] h-[10px] rounded-full bg-cyan shadow-[0_0_14px_2px_#5AC5F1] z-[3] animate-flowmove mx-lg:hidden"
              aria-hidden="true"
            />
          )}
          {ABOUT_PROCESS.map((step) => {
            const { Icon } = step;
            return (
              <motion.article
                className="group relative text-center px-[.4rem]"
                variants={staggerItem}
                whileHover={
                  reduce ? undefined : { y: -6, transition: hoverTransition }
                }
                key={step.key}
              >
                <div className="relative z-[2] w-[72px] h-[72px] rounded-[20px] mx-auto mb-[1.3rem] grid place-items-center text-navy dark:text-cyan bg-[rgba(90,197,241,.1)] border border-[rgba(90,197,241,.3)] transition-[transform,background,box-shadow] duration-400 ease-smooth group-hover:scale-105 group-hover:bg-[rgba(90,197,241,.18)] group-hover:shadow-[0_0_0_6px_rgba(90,197,241,.08)] [&_svg]:w-[30px] [&_svg]:h-[30px]">
                  <Icon />
                  <span className="absolute top-[-9px] end-[-9px] w-[25px] h-[25px] rounded-full bg-cyan text-ink font-mono text-[.66rem] font-bold grid place-items-center shadow-[0_4px_12px_rgba(90,197,241,.4)]">
                    {step.n}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-[1.12rem] mb-2">
                  {t(`items.${step.key}.title`)}
                </h4>
                <p className="text-muted dark:text-haze text-[.9rem] leading-[1.58] max-w-[30ch] mx-auto">
                  {t(`items.${step.key}.body`)}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
