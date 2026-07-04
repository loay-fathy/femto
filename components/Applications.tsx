"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeUp,
  revealProps,
  staggerContainer,
  staggerItem,
  VIEWPORT,
} from "@/lib/motion";
import { APPLICATIONS } from "@/lib/data";

export default function Applications() {
  const t = useTranslations("Applications");
  const reduce = useReducedMotion();

  return (
    <section
      className="relative py-[clamp(72px,9vw,128px)] bg-base"
      id="applications"
    >
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
          className="grid grid-cols-3 gap-px bg-hairline border border-hairline rounded-[20px] overflow-hidden mx-lg:grid-cols-1"
          variants={reduce ? undefined : staggerContainer(0.1)}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={VIEWPORT}
        >
          {APPLICATIONS.map((app) => {
            const { Icon } = app;
            return (
              <motion.div
                className="bg-elevated px-[1.8rem] py-8 transition-[background] duration-400 ease-smooth hover:bg-surface"
                variants={reduce ? undefined : staggerItem}
                key={app.key}
              >
                <span className="font-mono text-[.72rem] text-cyan tracking-[.14em] font-semibold">
                  {app.n}
                </span>
                <h4 className="font-display font-semibold text-[1.22rem] mt-[.7rem] mb-[.5rem] flex items-center gap-[.6rem] [&_svg]:w-[22px] [&_svg]:h-[22px] [&_svg]:text-navy dark:[&_svg]:text-cyan [&_svg]:shrink-0">
                  <Icon />
                  {t(`items.${app.key}.title`)}
                </h4>
                <p className="text-muted text-[.92rem] leading-[1.58]">
                  {t(`items.${app.key}.body`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
