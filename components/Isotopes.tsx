"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Arrow } from "@/components/icons";
import {
  EASE,
  fadeUp,
  hoverTransition,
  revealProps,
  staggerContainer,
} from "@/lib/motion";
import { ISOTOPES } from "@/lib/data";

/** Tiles fade, rise and bloom slightly as the grid cascades into view. */
const tileItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function Isotopes() {
  const t = useTranslations("Isotopes");
  const reduce = useReducedMotion();

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] bg-base" id="isotopes">
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
          <p className="text-muted text-[clamp(1rem,1.4vw,1.12rem)] max-w-[60ch] mt-[1.1rem] text-center mx-auto">
            {t("body")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-4 gap-[1.1rem] mx-lg:grid-cols-2 mx-sm:grid-cols-1"
          variants={staggerContainer(0.06)}
          {...revealProps(reduce)}
        >
          {ISOTOPES.map((iso) => (
            <motion.article
              className="group relative overflow-hidden flex flex-col min-h-[232px] border border-hairline rounded-[18px] pt-6 px-[1.4rem] pb-[1.6rem] bg-elevated transition-[transform,box-shadow,border-color] duration-450 ease-smooth hover:shadow-glow hover:border-[rgba(90,197,241,.5)] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(120%_90%_at_80%_0%,rgba(90,197,241,.16),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100"
              variants={tileItem}
              whileHover={reduce ? undefined : { y: -8, transition: hoverTransition }}
              tabIndex={0}
              key={iso.key}
            >
              <div className="flex justify-between items-start font-mono text-[.7rem] text-muted tracking-[.05em]">
                <span>{iso.z}</span>
                <span className="px-[.6em] py-[.2em] rounded-md bg-[rgba(23,64,148,.07)] text-navy dark:bg-cyan/10 dark:text-cyan font-medium text-[.62rem] tracking-[.1em] uppercase">
                  {t(`items.${iso.key}.category`)}
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-[.7rem] mb-[.2rem]">
                <span className="font-display font-bold text-[3.1rem] leading-[.9] text-navy dark:text-frost tracking-[-.02em] transition-colors duration-400 group-hover:text-navy-700 dark:group-hover:text-cyan">
                  {iso.symbol}
                </span>
                <span className="font-mono text-[.92rem] text-cyan font-semibold self-start mt-[.2rem]">
                  {iso.mass}
                </span>
              </div>
              <div className="font-display font-medium text-[1.04rem] mb-[.45rem]">
                {t(`items.${iso.key}.name`)}
              </div>
              <p className="text-muted text-[.86rem] leading-[1.55] mt-auto">
                {t(`items.${iso.key}.use`)}
              </p>
              <span className="absolute end-[-26px] bottom-[-26px] w-[120px] h-[120px] border border-dashed border-[rgba(90,197,241,.4)] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-spin360 after:content-[''] after:absolute after:top-[-4px] after:left-1/2 after:w-2 after:h-2 after:-ml-1 after:rounded-full after:bg-cyan after:shadow-[0_0_10px_#5AC5F1]" />
            </motion.article>
          ))}

          <motion.article
            className="col-span-2 relative overflow-hidden flex flex-col justify-center min-h-[232px] border border-transparent rounded-[18px] pt-6 px-[1.4rem] pb-[1.6rem] panel-card text-fg dark:text-white transition-[transform,box-shadow,border-color] duration-450 ease-smooth hover:shadow-darkcard"
            variants={tileItem}
            whileHover={reduce ? undefined : { y: -8, transition: hoverTransition }}
            tabIndex={0}
          >
            <svg
              className="absolute end-[1.4rem] top-[1.4rem] w-[54px] h-[54px] opacity-[.85]"
              viewBox="0 0 54 54"
              fill="none"
              stroke="#5AC5F1"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="27" cy="27" r="6" fill="#5AC5F1" />
              <ellipse cx="27" cy="27" rx="24" ry="9" />
              <ellipse cx="27" cy="27" rx="24" ry="9" transform="rotate(60 27 27)" />
              <ellipse cx="27" cy="27" rx="24" ry="9" transform="rotate(120 27 27)" />
            </svg>
            <span className="px-[.6em] py-[.2em] rounded-md bg-[rgba(90,197,241,.18)] text-navy dark:text-cyan font-medium text-[.62rem] tracking-[.1em] uppercase">
              {t("reactorService")}
            </span>
            <h3 className="font-display font-semibold text-[1.5rem] mt-[.6rem] mb-[.5rem] max-w-[18ch]">
              {t("reactorTitle")}
            </h3>
            <p className="text-muted dark:text-haze text-[.92rem] max-w-[40ch]">
              {t("reactorBody")}
            </p>
            <a
              href="#contact"
              className="mt-[1.1rem] inline-flex items-center gap-[.5em] font-mono text-[.78rem] text-navy dark:text-cyan tracking-[.06em]"
            >
              {t("requestIrradiation")} <Arrow />
            </a>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
