"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PinIcon } from "@/components/icons";
import {
  fadeUp,
  hoverTransition,
  revealProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { LOCATIONS } from "@/lib/data";

export default function Locations() {
  const reduce = useReducedMotion();
  const t = useTranslations("Locations");

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
          className="grid grid-cols-2 gap-[1.4rem] max-w-[840px] mx-auto mx-lg:grid-cols-1 mx-lg:max-w-[520px]"
          variants={staggerContainer(0.12)}
          {...revealProps(reduce)}
        >
          {LOCATIONS.map((location) => (
            <motion.article
              className="group flex items-start gap-[1.1rem] bg-elevated border border-hairline rounded-[20px] px-[1.9rem] py-8 transition-[transform,box-shadow,border-color] duration-400 ease-smooth hover:shadow-md2 hover:border-[rgba(90,197,241,.4)]"
              variants={staggerItem}
              whileHover={reduce ? undefined : { y: -6, transition: hoverTransition }}
              key={location.key}
            >
              <div className="shrink-0 w-12 h-12 rounded-[13px] grid place-items-center bg-[linear-gradient(150deg,#eaf4fc,#dff0fb)] text-navy [&_svg]:w-6 [&_svg]:h-6">
                <PinIcon />
              </div>
              <div>
                <span className="font-mono text-[.68rem] tracking-[.16em] uppercase text-cyan font-medium">
                  {t(`items.${location.key}.label`)}
                </span>
                <address className="not-italic text-muted text-[.96rem] leading-[1.6] mt-[.45rem]">
                  {location.lines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < location.lines.length - 1 && <br />}
                    </span>
                  ))}
                </address>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
