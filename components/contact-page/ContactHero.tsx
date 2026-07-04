"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Arrow, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { EASE, revealProps, staggerContainer } from "@/lib/motion";
import { CONTACT } from "@/lib/data";

/** Rows inside the card cascade downward. */
const rowItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Shared button chrome (padding/size applied per-button so sizes can differ). */
const btnBase =
  "inline-flex items-center gap-[.6em] font-semibold rounded-full relative overflow-hidden isolate transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1";

/** Individual info row inside the glass card. */
const cinfoRow =
  "flex gap-4 items-start py-4 border-b border-hairline dark:border-white/[.1] first:pt-0 last:border-b-0 last:pb-0 [&_svg]:w-5 [&_svg]:h-5";
const cinfoIc =
  "flex-none w-[42px] h-[42px] rounded-[11px] grid place-items-center bg-[rgba(90,197,241,.14)] text-navy dark:text-cyan";
const cinfoK =
  "font-mono text-[.66rem] tracking-[.16em] uppercase text-muted dark:text-[#8ea3cb]";
const cinfoV = "font-medium text-base mt-[.15rem] hover:text-cyan";

export default function ContactHero() {
  const reduce = useReducedMotion();
  const t = useTranslations("ContactHero");
  const rtl = useLocale() === "ar";

  /** Left-column copy lines slide in from the inline-start edge as the column staggers in. */
  const copyItem: Variants = {
    hidden: { opacity: 0, x: rtl ? 32 : -32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  };

  /** The contact card slides in from the inline-end edge and blooms slightly. */
  const cardIn: Variants = {
    hidden: { opacity: 0, x: rtl ? -48 : 48, scale: 0.96 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.75, ease: EASE, delay: 0.15 },
    },
  };

  /** Gentle ambient drift for the background gradient blobs. */
  const float = (x: number, y: number, duration: number) =>
    reduce
      ? undefined
      : {
        animate: { x: [0, x, 0], y: [0, y, 0] },
        transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <section className="relative overflow-hidden text-fg dark:text-white hero-surface min-h-screen flex items-center pt-[clamp(132px,15vw,168px)] pb-[clamp(56px,8vw,104px)]">
      {/* floating blurred gradient shapes for depth */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[760px] max-h-[760px] end-[-10%] top-[-16%] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(90,197,241,.2)_0%,rgba(90,197,241,0)_62%)] blur-[6px]"
        aria-hidden="true"
        {...float(18, -24, 13)}
      />
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[760px] max-h-[760px] start-[-14%] bottom-[-20%] rounded-full z-0 pointer-events-none blur-[6px] bg-[radial-gradient(circle,rgba(143,217,246,.16)_0%,rgba(143,217,246,0)_62%)]"
        aria-hidden="true"
        {...float(-22, 20, 16)}
      />
      <span className="absolute inset-x-0 top-0 h-0.5 z-[1] pointer-events-none bg-[linear-gradient(90deg,transparent,rgba(90,197,241,.5)_18%,rgba(90,197,241,.9)_50%,rgba(90,197,241,.5)_82%,transparent)] shadow-[0_0_14px_1px_rgba(90,197,241,.45)] animate-scan" aria-hidden="true" />

      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <div className="relative z-[2] grid grid-cols-[minmax(0,1fr)_minmax(0,clamp(300px,32vw,420px))] gap-[clamp(2rem,5vw,4.5rem)] items-center mx-lg:grid-cols-1">
          {/* ---------- left: copy + CTAs ---------- */}
          <motion.div
            className="max-w-[60ch]"
            variants={staggerContainer(0.1)}
            {...revealProps(reduce)}
          >
            <motion.span
              className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-navy dark:before:bg-cyan"
              variants={copyItem}
            >
              {t("eyebrow")}
            </motion.span>
            <motion.h1
              className="font-display font-semibold text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.02] tracking-[-.025em] mt-4"
              variants={copyItem}
            >
              {t.rich("heading", {
                grad: (chunks) => (
                  <span className="bg-[linear-gradient(180deg,#174094_0%,#2f8fcc_100%)] dark:bg-[linear-gradient(180deg,#5AC5F1_0%,#bfe9fb_100%)] bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </motion.h1>
            <motion.p
              className="text-muted dark:text-foam text-[clamp(1.02rem,1.5vw,1.18rem)] max-w-[56ch] mt-6"
              variants={copyItem}
            >
              {t("body")}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-[.9rem] mt-[2.1rem] mx-sm:flex-col mx-sm:items-stretch"
              variants={copyItem}
            >
              <a
                href={`mailto:${CONTACT.email}`}
                className={`${btnBase} px-6 py-[.92em] text-[.95rem] bg-cyan text-ink hover:shadow-glow mx-sm:w-full mx-sm:justify-center`}
              >
                {t("emailTeam")} <Arrow />
              </a>
              <a
                href={CONTACT.linkedin}
                className={`${btnBase} px-6 py-[.92em] text-[.95rem] bg-transparent text-fg dark:text-white shadow-[inset_0_0_0_1.5px_rgba(11,27,58,.2)] dark:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.28)] hover:shadow-[inset_0_0_0_1.5px_#5AC5F1,0_18px_60px_rgba(90,197,241,.28)] mx-sm:w-full mx-sm:justify-center`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("connectLinkedin")}
              </a>
            </motion.div>
          </motion.div>

          {/* ---------- right: glassmorphism contact card ---------- */}
          <motion.div
            className="relative z-[2] overflow-hidden bg-elevated/95 dark:bg-white/[.05] border border-hairline dark:border-white/[.12] rounded-[24px] p-[clamp(1.5rem,2.4vw,2.1rem)] backdrop-blur-[14px] shadow-md2 dark:shadow-glass before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,transparent,#5AC5F1,transparent)] before:opacity-70"
            variants={cardIn}
            {...revealProps(reduce)}
          >
            <motion.div
              variants={staggerContainer(0.08, 0.25)}
              {...revealProps(reduce)}
            >
              <motion.div variants={rowItem}>
                <h2 className="font-display font-semibold text-[1.4rem] text-fg dark:text-white tracking-[-.01em]">
                  {t("cardTitle")}
                </h2>
                <p className="text-muted dark:text-[#9fb8da] text-[.92rem] leading-[1.5] mt-[.35rem] max-w-[34ch]">
                  {t("cardBody")}
                </p>
              </motion.div>

              <div className="mt-[1.3rem] flex flex-col">
                <motion.a
                  className={cinfoRow}
                  href={`mailto:${CONTACT.email}`}
                  variants={rowItem}
                >
                  <span className={cinfoIc}>
                    <MailIcon />
                  </span>
                  <span>
                    <span className={cinfoK}>{t("email")}</span>
                    <span className={cinfoV}>{CONTACT.email}</span>
                  </span>
                </motion.a>

                <motion.a className={cinfoRow} href={CONTACT.phoneHref} variants={rowItem}>
                  <span className={cinfoIc}>
                    <PhoneIcon />
                  </span>
                  <span>
                    <span className={cinfoK}>{t("phone")}</span>
                    <span className={cinfoV}>{CONTACT.phoneLabel}</span>
                  </span>
                </motion.a>

                <motion.div className={cinfoRow} variants={rowItem}>
                  <span className={cinfoIc}>
                    <PinIcon />
                  </span>
                  <span>
                    <span className={cinfoK}>{t("headquarters")}</span>
                    <span className={cinfoV}>
                      {CONTACT.address[0]}, {CONTACT.address[1]}
                    </span>
                  </span>
                </motion.div>
              </div>

              {/* highlighted CTA panel */}
              <motion.div
                className="mt-6 rounded-2xl py-[1.15rem] px-[1.25rem] bg-[linear-gradient(135deg,rgba(90,197,241,.16),rgba(90,197,241,.04))] border border-[rgba(90,197,241,.3)] flex items-center justify-between gap-4 flex-wrap mx-sm:flex-col mx-sm:items-stretch"
                variants={rowItem}
              >
                <span className="flex flex-col gap-[.2rem]">
                  <span className="font-mono text-[.66rem] tracking-[.16em] uppercase text-navy dark:text-cyan">
                    {t("preferForm")}
                  </span>
                  <span className="text-muted dark:text-[#dbe8fb] text-[.92rem] leading-[1.45]">
                    {t("preferFormBody")}
                  </span>
                </span>
                <a
                  href="#contact-form"
                  className={`${btnBase} px-[1.2em] py-[.7em] text-[.85rem] bg-cyan text-ink hover:shadow-glow mx-sm:w-full mx-sm:justify-center`}
                >
                  {t("startEnquiry")} <Arrow />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
