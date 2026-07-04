"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Arrow } from "@/components/icons";
import {
  fadeUp,
  hoverTransition,
  popItem,
  revealProps,
  staggerContainer,
} from "@/lib/motion";
import { CAPABILITIES } from "@/lib/data";

export default function Capabilities() {
  const t = useTranslations("Capabilities");
  const reduce = useReducedMotion();

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
          className="grid grid-cols-3 gap-[1.4rem] mx-lg:grid-cols-1 mx-lg:max-w-[520px] mx-lg:mx-auto"
          variants={staggerContainer(0.12)}
          {...revealProps(reduce)}
        >
          {CAPABILITIES.map((cap) => {
            const { Icon } = cap;
            return (
              <motion.article
                className="group relative overflow-hidden bg-elevated border border-hairline rounded-[20px] pt-[2.2rem] px-8 pb-[2.4rem] transition-[transform,box-shadow,border-color] duration-450 ease-smooth hover:shadow-md2 hover:border-transparent after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-[linear-gradient(90deg,#174094,#5AC5F1)] after:origin-left rtl:after:origin-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-smooth group-hover:after:scale-x-100"
                variants={popItem}
                whileHover={reduce ? undefined : { y: -8, transition: hoverTransition }}
                key={cap.key}
              >
                <span className="absolute top-[1.4rem] end-[1.6rem] font-mono text-[.72rem] text-[#b9c6dc] tracking-[.1em]">
                  {t(`items.${cap.key}.idx`)}
                </span>
                <div className="w-[58px] h-[58px] rounded-[15px] grid place-items-center bg-[linear-gradient(150deg,#eaf4fc,#dff0fb)] text-navy mb-[1.4rem] transition-transform duration-450 ease-smooth group-hover:scale-[1.06] group-hover:-rotate-[4deg] [&_svg]:w-7 [&_svg]:h-7">
                  <Icon />
                </div>
                <h3 className="font-display font-semibold text-[1.32rem] mb-[.7rem]">
                  {t(`items.${cap.key}.title`)}
                </h3>
                <p className="text-muted text-[.96rem] leading-[1.62]">{t(`items.${cap.key}.body`)}</p>
                <a
                  href={cap.href}
                  className="inline-flex items-center gap-[.45em] mt-[1.3rem] font-mono text-[.78rem] tracking-[.06em] text-cyan font-medium [&_.arr]:transition-transform [&_.arr]:duration-350 [&_.arr]:ease-smooth group-hover:[&_.arr]:translate-x-1"
                >
                  {t(`items.${cap.key}.linkText`)} <Arrow />
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
