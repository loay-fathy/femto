"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Counter from "@/components/Counter";
import {
  revealProps,
  scaleIn,
  slideIn,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { ABOUT_VALUES } from "@/lib/data";

export default function About() {
  const t = useTranslations("About");
  const rtl = useLocale() === "ar";
  const reduce = useReducedMotion();

  return (
    <section
      className="relative py-[clamp(72px,9vw,128px)] bg-base"
      id="about"
    >
      <div className="absolute inset-0 pointer-events-none text-fg opacity-[.06] bg-[radial-gradient(currentColor_1px,transparent_1.4px)] [background-size:26px_26px]" />
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-[clamp(2.5rem,6vw,6rem)] items-center mx-lg:grid-cols-1 mx-lg:gap-16">
          <motion.div
            className="relative aspect-square max-w-[480px] w-full mx-lg:mx-auto mx-lg:max-w-[380px]"
            variants={scaleIn()}
            {...revealProps(reduce)}
          >
            <svg
              viewBox="0 0 480 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-full h-full"
            >
              <defs>
                <radialGradient id="core" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#bfe9fb" />
                  <stop offset="45%" stopColor="#5AC5F1" />
                  <stop offset="100%" stopColor="#174094" />
                </radialGradient>
                <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#174094" />
                  <stop offset="100%" stopColor="#5AC5F1" />
                </linearGradient>
                <filter id="soft">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <circle cx="240" cy="240" r="200" fill="#5AC5F1" opacity=".06" />
              <circle cx="240" cy="240" r="150" fill="#5AC5F1" opacity=".05" />
              <g stroke="url(#ringg)" strokeWidth="2.4" fill="none" opacity=".85">
                <ellipse cx="240" cy="240" rx="190" ry="74" />
                <ellipse
                  cx="240"
                  cy="240"
                  rx="190"
                  ry="74"
                  transform="rotate(60 240 240)"
                />
                <ellipse
                  cx="240"
                  cy="240"
                  rx="190"
                  ry="74"
                  transform="rotate(120 240 240)"
                />
              </g>
              <g>
                <circle r="10" fill="#174094">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path="M50,240 a190,74 0 1,1 380,0 a190,74 0 1,1 -380,0"
                  />
                </circle>
                <circle r="9" fill="#5AC5F1">
                  <animateMotion
                    dur="7s"
                    repeatCount="indefinite"
                    path="M145,68 a190,74 0 1,1 190,344 a190,74 0 1,1 -190,-344"
                  />
                </circle>
                <circle r="9" fill="#5AC5F1">
                  <animateMotion
                    dur="8s"
                    repeatCount="indefinite"
                    path="M335,68 a190,74 0 1,0 -190,344 a190,74 0 1,0 190,-344"
                  />
                </circle>
              </g>
              <circle cx="240" cy="240" r="62" fill="url(#core)" />
              <circle cx="240" cy="240" r="62" fill="#5AC5F1" opacity=".5" filter="url(#soft)" />
              <circle cx="222" cy="224" r="9" fill="#fff" opacity=".5" />
            </svg>

            <motion.div
              className="absolute end-[-6%] bottom-[-6%] bg-elevated dark:bg-ink text-fg dark:text-white rounded-[20px] px-[1.6rem] py-[1.4rem] shadow-md2 text-center mx-sm:end-0 mx-sm:bottom-[-8%]"
              variants={scaleIn(0.3, 0.82)}
              initial={reduce ? "show" : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.6 }}
            >
              <div className="font-display font-bold text-[2.6rem] leading-none bg-[linear-gradient(180deg,#174094,#2f8fcc)] dark:bg-[linear-gradient(180deg,#fff,#5AC5F1)] bg-clip-text text-transparent">
                <Counter to={2009} format="string" />
              </div>
              <div className="font-mono text-[.66rem] tracking-[.18em] uppercase text-muted dark:text-[#aebfde] mt-[.4rem]">
                {t("badge")}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            {...revealProps(reduce)}
          >
            <motion.span
              className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-cyan"
              variants={slideIn("end", 36, rtl)}
            >
              {t("eyebrow")}
            </motion.span>
            <motion.h2
              className="font-display font-semibold text-[clamp(2rem,4vw,3.15rem)] leading-[1.06] tracking-[-.02em] mt-2"
              variants={slideIn("end", 36, rtl)}
            >
              {t("heading")}
            </motion.h2>
            <motion.p
              className="text-muted text-[clamp(1rem,1.4vw,1.12rem)] max-w-[60ch] mt-[1.1rem]"
              variants={slideIn("end", 36, rtl)}
            >
              {t("body")}
            </motion.p>
            <motion.div
              className="grid grid-cols-2 gap-x-8 gap-y-[1.4rem] mt-[2.2rem] mx-sm:grid-cols-1"
              variants={staggerContainer(0.08)}
            >
              {ABOUT_VALUES.map((value) => (
                <motion.div
                  className="relative ps-[1.2rem] before:content-[''] before:absolute before:start-0 before:top-[.45em] before:w-2 before:h-2 before:rounded-full before:bg-cyan before:shadow-[0_0_0_4px_rgba(90,197,241,.15)]"
                  variants={staggerItem}
                  key={value.key}
                >
                  <h4 className="font-display font-semibold text-[1.08rem] mb-1">
                    {t(`values.${value.key}.title`)}
                  </h4>
                  <p className="text-muted text-[.95rem] leading-[1.55]">
                    {t(`values.${value.key}.body`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
