"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Counter from "@/components/Counter";
import { popItem, revealProps, staggerContainer } from "@/lib/motion";
import { STATS } from "@/lib/data";

export default function Stats() {
  const t = useTranslations("Stats");
  const reduce = useReducedMotion();

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] panel-panel text-fg dark:text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(currentColor_1px,transparent_1.4px)] [background-size:26px_26px] text-navy dark:text-cyan opacity-[.08]" />
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="grid grid-cols-4 gap-6 relative z-[2] mx-lg:grid-cols-2 mx-lg:gap-x-4 mx-lg:gap-y-10 mx-sm:grid-cols-1 mx-sm:gap-8"
          variants={staggerContainer(0.12)}
          {...revealProps(reduce)}
        >
          {STATS.map((stat, i) => (
            <motion.div
              className={`text-center py-4 px-2 relative after:content-[''] after:absolute after:end-0 after:top-[18%] after:bottom-[18%] after:w-px after:bg-[linear-gradient(180deg,transparent,rgba(255,255,255,.16),transparent)] last:after:hidden mx-sm:after:hidden ${
                i === 1 ? "mx-lg:after:hidden" : ""
              }`}
              variants={popItem}
              key={stat.key}
            >
              <div className="font-display font-bold text-[clamp(2.6rem,4.4vw,3.6rem)] leading-none tracking-[-.02em] bg-[linear-gradient(180deg,#174094,#2f8fcc)] dark:bg-[linear-gradient(180deg,#fff_30%,#5AC5F1)] bg-clip-text text-transparent">
                <Counter to={stat.count} />
                {stat.suffix && <span className="text-navy dark:text-cyan">{stat.suffix}</span>}
              </div>
              <div className="font-mono text-[.72rem] tracking-[.16em] uppercase text-muted dark:text-[#aebfde] mt-[.7rem] leading-[1.5]">
                {t(`items.${stat.key}`)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
