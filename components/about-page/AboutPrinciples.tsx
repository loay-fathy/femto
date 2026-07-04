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
import { ABOUT_PRINCIPLES } from "@/lib/data";

export default function AboutPrinciples() {
  const reduce = useReducedMotion();
  const t = useTranslations("AboutPrinciples");

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] bg-surface">
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
          className="grid grid-cols-12 gap-[1.2rem] mx-lg:grid-cols-1"
          variants={staggerContainer(0.1)}
          {...revealProps(reduce)}
        >
          {ABOUT_PRINCIPLES.map((principle) => {
            const { Icon } = principle;
            const feat = principle.variant === "feat";
            const span =
              principle.variant === "wide" || feat ? "col-span-6" : "col-span-4";
            const surface = feat
              ? "panel-card text-fg dark:text-white border-transparent hover:shadow-darkcard2"
              : "bg-elevated border-hairline hover:shadow-md2";
            return (
              <motion.article
                className={`relative overflow-hidden flex items-start gap-[1.1rem] border rounded-[18px] p-[1.8rem] transition-[transform,box-shadow,border-color] duration-400 ease-smooth hover:border-[rgba(90,197,241,.4)] ${span} mx-lg:col-span-full ${surface}`}
                variants={staggerItem}
                whileHover={reduce ? undefined : { y: -6, transition: hoverTransition }}
                key={principle.key}
              >
                <div
                  className={`shrink-0 w-12 h-12 rounded-[13px] grid place-items-center [&_svg]:w-6 [&_svg]:h-6 ${
                    feat
                      ? "bg-[rgba(90,197,241,.18)] text-navy dark:text-cyan"
                      : "bg-[linear-gradient(150deg,#eaf4fc,#dff0fb)] text-navy"
                  }`}
                >
                  <Icon />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[1.14rem] mb-[.35rem]">
                    {t(`items.${principle.key}.title`)}
                  </h4>
                  <p
                    className={`text-[.92rem] leading-[1.55] ${
                      feat ? "text-muted dark:text-haze" : "text-muted"
                    }`}
                  >
                    {t(`items.${principle.key}.body`)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
