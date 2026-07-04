"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  hoverTransition,
  revealProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { MISSION_VISION } from "@/lib/data";

export default function MissionVision() {
  const reduce = useReducedMotion();
  const t = useTranslations("MissionVision");

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] bg-base">
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="mb-[clamp(40px,5vw,64px)] text-center flex flex-col items-center"
          variants={staggerContainer(0.1)}
          {...revealProps(reduce)}
        >
          <motion.span
            className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-cyan after:content-[''] after:w-[26px] after:h-px after:bg-cyan"
            variants={staggerItem}
          >
            {t("eyebrow")}
          </motion.span>
          <motion.h2
            className="font-display font-semibold text-[clamp(2rem,4vw,3.15rem)] leading-[1.06] tracking-[-.02em] mt-2"
            variants={staggerItem}
          >
            {t("heading")}
          </motion.h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-[1.4rem] mx-lg:grid-cols-1"
          variants={staggerContainer(0.12)}
          {...revealProps(reduce)}
        >
          {MISSION_VISION.map((item) => {
            const { Icon } = item;
            return (
              <motion.article
                className="group relative overflow-hidden panel-card text-fg dark:text-white rounded-[22px] p-[clamp(1.8rem,3vw,2.6rem)] transition-[transform,box-shadow] duration-400 ease-smooth hover:shadow-darkcard2"
                variants={staggerItem}
                whileHover={reduce ? undefined : { y: -6, transition: hoverTransition }}
                key={item.key}
              >
                <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[rgba(90,197,241,.18)] text-navy dark:text-cyan mb-[1.3rem] [&_svg]:w-[26px] [&_svg]:h-[26px]">
                  <Icon />
                </div>
                <span className="font-mono text-[.7rem] tracking-[.2em] uppercase text-navy dark:text-cyan">
                  {t(`items.${item.key}.label`)}
                </span>
                <h3 className="font-display font-semibold text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.12] mt-2 mb-[.8rem] max-w-[20ch]">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-muted dark:text-haze text-[.98rem] leading-[1.62] max-w-[46ch]">
                  {t(`items.${item.key}.body`)}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
