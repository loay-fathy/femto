"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Arrow, SettingsIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { fadeUp, revealProps, scaleIn } from "@/lib/motion";
import { PRODUCT_SERVICE } from "@/lib/data";

export default function ProductsServices() {
  const reduce = useReducedMotion();
  const t = useTranslations("ProductsServices");

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] bg-surface">
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="group relative overflow-hidden text-fg dark:text-white rounded-[24px] p-[clamp(2rem,4.5vw,3.4rem)] panel-hero transition-[transform,box-shadow] duration-450 ease-smooth hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(11,27,58,.4)]"
          variants={scaleIn()}
          {...revealProps(reduce)}
        >
          <svg
            className="absolute end-[clamp(1.4rem,4vw,3rem)] top-[clamp(1.4rem,4vw,3rem)] w-[clamp(70px,9vw,108px)] h-[clamp(70px,9vw,108px)] opacity-[.7] z-[1]"
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

          <motion.div className="relative z-[2] max-w-[60ch]" variants={fadeUp()}>
            <div className="w-[54px] h-[54px] rounded-[14px] grid place-items-center bg-[rgba(90,197,241,.16)] text-navy dark:text-cyan mb-[1.3rem] [&_svg]:w-[27px] [&_svg]:h-[27px]">
              <SettingsIcon />
            </div>
            <span className="px-[.6em] py-[.2em] rounded-[6px] bg-[rgba(90,197,241,.18)] text-navy dark:text-cyan font-medium text-[.62rem] tracking-[.1em] uppercase">
              {t("category")}
            </span>
            <h2 className="font-display font-semibold tracking-[-.02em] text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] mt-[.7rem] mb-[.8rem] max-w-[22ch]">
              {t("title")}
            </h2>
            <p className="text-muted dark:text-haze text-[1.02rem] leading-[1.64] max-w-[52ch]">
              {t("body")}
            </p>
            <Link
              href={PRODUCT_SERVICE.href}
              className="inline-flex items-center gap-[.5em] mt-[1.6rem] font-mono text-[.8rem] tracking-[.06em] text-navy dark:text-cyan font-medium [&_.arr]:transition-transform [&_.arr]:duration-350 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1"
            >
              {t("linkText")} <Arrow />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
