"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { revealProps, fadeUp, staggerContainer } from "@/lib/motion";

const btnBase =
  "inline-flex items-center gap-[.6em] font-semibold text-[.95rem] px-6 py-[.92em] rounded-full relative overflow-hidden isolate transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1";

export default function ProductsHero() {
  const reduce = useReducedMotion();
  const t = useTranslations("ProductsHero");

  return (
    <section className="relative overflow-hidden text-fg dark:text-white hero-surface min-h-[clamp(540px,78vh,720px)] flex items-center pt-[clamp(118px,13vw,156px)] pb-[clamp(48px,6vw,76px)]">
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="mx-auto max-w-[clamp(640px,70vw,860px)] text-center flex flex-col items-center"
          variants={staggerContainer(0.1)}
          {...revealProps(reduce)}
        >
          <motion.span
            className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-navy dark:before:bg-cyan after:content-[''] after:w-[26px] after:h-px after:bg-navy dark:after:bg-cyan"
            variants={fadeUp()}
          >
            {t("eyebrow")}
          </motion.span>
          <motion.h1
            className="font-display font-semibold text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.02] tracking-[-.025em] mt-4"
            variants={fadeUp()}
          >
            {t.rich("heading", {
              grad: (chunks) => (
                <span className="bg-[linear-gradient(180deg,#174094_0%,#2f8fcc_100%)] dark:bg-[linear-gradient(180deg,#5AC5F1_0%,#BFE9FB_100%)] bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </motion.h1>
          <motion.p
            className="text-muted dark:text-foam text-[clamp(1.02rem,1.5vw,1.18rem)] max-w-[56ch] mt-6 mx-auto"
            variants={fadeUp()}
          >
            {t("body")}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-[.9rem] mt-[2.1rem] justify-center"
            variants={fadeUp()}
          >
            <a
              href="#catalogue"
              className={`${btnBase} bg-cyan text-ink hover:shadow-glow [&_.arr--down]:transition-transform [&_.arr--down]:duration-400 [&_.arr--down]:ease-smooth hover:[&_.arr--down]:translate-y-[3px]`}
            >
              {t("browseCatalogue")} <span className="arr--down">↓</span>
            </a>
            <Link
              href="/contact-us"
              className={`${btnBase} bg-transparent text-fg dark:text-white shadow-[inset_0_0_0_1.5px_rgba(11,27,58,.2)] dark:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.28)] hover:shadow-[inset_0_0_0_1.5px_#5AC5F1,0_18px_60px_rgba(90,197,241,.28)]`}
            >
              {t("requestQuote")}
            </Link>
          </motion.div>
          <motion.p
            className="flex items-center gap-4 flex-wrap mt-[1.9rem] font-mono text-[.72rem] tracking-[.1em] uppercase text-subtle dark:text-[#8fa3c9] justify-center"
            variants={fadeUp()}
          >
            <span>{t("meta1")}</span>
            <span className="w-[5px] h-[5px] rounded-full bg-cyan opacity-[.75]" />
            <span>{t("meta2")}</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
