"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Arrow, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { EASE, revealProps, staggerContainer } from "@/lib/motion";
import { CONTACT } from "@/lib/data";

const btnBase =
  "inline-flex items-center gap-[.6em] font-semibold text-[.95rem] px-6 py-[.92em] rounded-full relative overflow-hidden isolate transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1";

export default function ContactCTA() {
  const t = useTranslations("ContactCTA");
  const rtl = useLocale() === "ar";
  const reduce = useReducedMotion();

  /** Copy lines slide in from the inline-start as the column staggers into view. */
  const copyItem: Variants = {
    hidden: { opacity: 0, x: rtl ? 32 : -32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  };

  /** The contact card slides in from the inline-end and blooms slightly. */
  const cardIn: Variants = {
    hidden: { opacity: 0, x: rtl ? -48 : 48, scale: 0.96 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  return (
    <section
      className="relative overflow-hidden py-[clamp(72px,9vw,128px)] text-fg dark:text-white panel-hero"
      id="contact"
    >
      <div className="absolute inset-0 pointer-events-none text-navy dark:text-cyan opacity-[.07] bg-[radial-gradient(currentColor_1px,transparent_1.4px)] [background-size:26px_26px]" />
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <div className="grid grid-cols-[1.2fr_.9fr] gap-[clamp(2.5rem,6vw,5rem)] items-center relative z-[2] mx-lg:grid-cols-1 mx-lg:gap-10">
          <motion.div
            variants={staggerContainer(0.1)}
            {...revealProps(reduce)}
          >
            <motion.span
              className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-navy dark:before:bg-cyan"
              variants={copyItem}
            >
              {t("eyebrow")}
            </motion.span>
            <motion.h2
              className="font-display font-semibold text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-.02em]"
              variants={copyItem}
            >
              {t.rich("heading", {
                grad: (chunks) => (
                  <span className="text-navy dark:text-cyan">{chunks}</span>
                ),
              })}
            </motion.h2>
            <motion.p
              className="text-muted dark:text-haze text-[1.05rem] mt-[1.2rem] max-w-[46ch]"
              variants={copyItem}
            >
              {t("body")}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-[.9rem] mt-8"
              variants={copyItem}
            >
              <a
                href={`mailto:${CONTACT.email}`}
                className={`${btnBase} bg-cyan text-ink hover:shadow-glow`}
              >
                {t("emailTeam")} <Arrow />
              </a>
              <a
                href={CONTACT.linkedin}
                className={`${btnBase} bg-transparent text-fg dark:text-white shadow-[inset_0_0_0_1.5px_rgba(11,27,58,.2)] dark:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.28)] hover:shadow-[inset_0_0_0_1.5px_#5AC5F1,0_18px_60px_rgba(90,197,241,.28)]`}
              >
                {t("connectLinkedin")}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-fg/[.04] dark:bg-white/[.04] border border-hairline dark:border-white/[.12] rounded-[22px] p-8 backdrop-blur-[6px]"
            variants={cardIn}
            {...revealProps(reduce)}
          >
            <a
              className="flex gap-4 items-start py-4 border-b border-hairline dark:border-white/[.1] first:pt-0 last:pb-0 last:border-b-0"
              href={`mailto:${CONTACT.email}`}
            >
              <span className="shrink-0 w-[42px] h-[42px] rounded-[11px] grid place-items-center bg-[rgba(90,197,241,.14)] text-navy dark:text-cyan [&_svg]:w-5 [&_svg]:h-5">
                <MailIcon />
              </span>
              <span>
                <span className="font-mono text-[.66rem] tracking-[.16em] uppercase text-muted dark:text-[#8ea3cb]">
                  {t("email")}
                </span>
                <span className="font-medium text-base mt-[.15rem] hover:text-cyan">
                  {CONTACT.email}
                </span>
              </span>
            </a>
            <a
              className="flex gap-4 items-start py-4 border-b border-hairline dark:border-white/[.1] first:pt-0 last:pb-0 last:border-b-0"
              href={CONTACT.phoneHref}
            >
              <span className="shrink-0 w-[42px] h-[42px] rounded-[11px] grid place-items-center bg-[rgba(90,197,241,.14)] text-navy dark:text-cyan [&_svg]:w-5 [&_svg]:h-5">
                <PhoneIcon />
              </span>
              <span>
                <span className="font-mono text-[.66rem] tracking-[.16em] uppercase text-muted dark:text-[#8ea3cb]">
                  {t("phone")}
                </span>
                <span className="font-medium text-base mt-[.15rem] hover:text-cyan">
                  {CONTACT.phoneLabel}
                </span>
              </span>
            </a>
            <div className="flex gap-4 items-start py-4 border-b border-hairline dark:border-white/[.1] first:pt-0 last:pb-0 last:border-b-0">
              <span className="shrink-0 w-[42px] h-[42px] rounded-[11px] grid place-items-center bg-[rgba(90,197,241,.14)] text-navy dark:text-cyan [&_svg]:w-5 [&_svg]:h-5">
                <PinIcon />
              </span>
              <span>
                <span className="font-mono text-[.66rem] tracking-[.16em] uppercase text-muted dark:text-[#8ea3cb]">
                  {t("headquarters")}
                </span>
                <span className="font-medium text-base mt-[.15rem] hover:text-cyan">
                  {t("address")}
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
