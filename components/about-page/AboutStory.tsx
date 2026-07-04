"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Counter from "@/components/Counter";
import {
  revealProps,
  scaleIn,
  slideIn,
  staggerContainer,
} from "@/lib/motion";

export default function AboutStory() {
  const reduce = useReducedMotion();
  const t = useTranslations("AboutStory");
  const rtl = useLocale() === "ar";

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] bg-base" id="story">
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
                <radialGradient id="storyCore" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#bfe9fb" />
                  <stop offset="45%" stopColor="#5AC5F1" />
                  <stop offset="100%" stopColor="#174094" />
                </radialGradient>
                <linearGradient id="storyRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#174094" />
                  <stop offset="100%" stopColor="#5AC5F1" />
                </linearGradient>
                <filter id="storySoft">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <circle cx="240" cy="240" r="200" fill="#5AC5F1" opacity=".06" />
              <circle cx="240" cy="240" r="150" fill="#5AC5F1" opacity=".05" />
              <g stroke="url(#storyRing)" strokeWidth="2.4" fill="none" opacity=".85">
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
              <circle cx="240" cy="240" r="62" fill="url(#storyCore)" />
              <circle
                cx="240"
                cy="240"
                r="62"
                fill="#5AC5F1"
                opacity=".5"
                filter="url(#storySoft)"
              />
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
            {(t.raw("paragraphs") as string[]).map((para, i) => (
              <motion.p
                className="text-muted text-[clamp(1rem,1.4vw,1.12rem)] max-w-[60ch] mt-[1.1rem]"
                variants={slideIn("end", 36, rtl)}
                key={i}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
