"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Arrow } from "@/components/icons";
import {
  fadeUp,
  hoverTransition,
  revealProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { NEWS } from "@/lib/data";

const btnBase =
  "inline-flex items-center gap-[.6em] font-semibold text-[.95rem] px-6 py-[.92em] rounded-full relative overflow-hidden isolate transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1";

// One decorative header per post, in markup order.
const DECOS: ReactNode[] = [
  <svg
    key="d0"
    className="absolute inset-0"
    viewBox="0 0 400 225"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    aria-hidden="true"
  >
    <g stroke="#5AC5F1" strokeWidth="1.5" opacity=".6">
      <path d="M0 170 Q100 120 200 150 T400 110" />
      <path d="M0 200 Q120 150 220 175 T400 150" />
    </g>
    <g fill="#5AC5F1">
      <circle cx="80" cy="138" r="4" />
      <circle cx="200" cy="150" r="5" />
      <circle cx="320" cy="120" r="4" />
      <circle cx="150" cy="165" r="3" />
    </g>
    <g stroke="#8fd9f6" strokeWidth="1" opacity=".4">
      <path d="M80 138 200 150 320 120" />
    </g>
  </svg>,
  <svg
    key="d1"
    className="absolute inset-0"
    viewBox="0 0 400 225"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="200" cy="112" r="46" fill="#5AC5F1" opacity=".22" />
    <g stroke="#5AC5F1" strokeWidth="1.6" fill="none">
      <ellipse cx="200" cy="112" rx="90" ry="34" />
      <ellipse cx="200" cy="112" rx="90" ry="34" transform="rotate(60 200 112)" />
      <ellipse cx="200" cy="112" rx="90" ry="34" transform="rotate(120 200 112)" />
    </g>
    <circle cx="200" cy="112" r="12" fill="#5AC5F1" />
  </svg>,
  <svg
    key="d2"
    className="absolute inset-0"
    viewBox="0 0 400 225"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    aria-hidden="true"
  >
    <g fill="#5AC5F1">
      <circle cx="120" cy="80" r="6" />
      <circle cx="200" cy="130" r="6" />
      <circle cx="280" cy="80" r="6" />
      <circle cx="160" cy="160" r="5" />
      <circle cx="240" cy="160" r="5" />
    </g>
    <g stroke="#8fd9f6" strokeWidth="1.4" opacity=".55">
      <path d="M120 80 200 130 280 80M160 160 200 130 240 160" />
    </g>
    <circle
      cx="200"
      cy="130"
      r="22"
      fill="none"
      stroke="#5AC5F1"
      strokeDasharray="3 5"
    />
  </svg>,
];

export default function News() {
  const t = useTranslations("News");
  const reduce = useReducedMotion();

  return (
    <section
      className="relative py-[clamp(72px,9vw,128px)] bg-surface"
      id="news"
    >
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="flex justify-between items-end flex-wrap gap-6 mb-[clamp(36px,4vw,52px)] mx-sm:flex-col mx-sm:items-start"
          variants={fadeUp()}
          {...revealProps(reduce)}
        >
          <div>
            <span className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-cyan">
              {t("eyebrow")}
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.15rem)] leading-[1.06] tracking-[-.02em] mt-2">
              {t("heading")}
            </h2>
          </div>
          <a
            href="#"
            className={`${btnBase} bg-transparent text-fg shadow-[inset_0_0_0_1.5px_rgb(var(--c-hairline))] hover:shadow-[inset_0_0_0_1.5px_#5AC5F1,0_12px_30px_rgba(16,46,107,.1)]`}
          >
            {t("allNews")} <Arrow />
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-[1.5fr_1fr_1fr] gap-[1.3rem] mx-lg:grid-cols-1"
          variants={staggerContainer(0.12)}
          {...revealProps(reduce)}
        >
          {NEWS.map((post, i) => (
            <motion.article
              className="group bg-elevated border border-hairline rounded-[20px] overflow-hidden flex flex-col transition-[box-shadow] duration-450 ease-smooth hover:shadow-md2"
              variants={staggerItem}
              whileHover={reduce ? undefined : { y: -6, transition: hoverTransition }}
              key={post.key}
            >
              <div className="aspect-video relative overflow-hidden panel-card">
                <span className="absolute start-[14px] top-[14px] font-mono text-[.64rem] tracking-[.14em] uppercase text-ink bg-cyan px-[.7em] py-[.35em] rounded-md font-semibold z-[2]">
                  {t(`items.${post.key}.tag`)}
                </span>
                {DECOS[i]}
              </div>
              <div className="px-6 pt-6 pb-[1.7rem] flex flex-col flex-1">
                <span className="font-mono text-[.72rem] text-muted tracking-[.06em]">
                  {t(`items.${post.key}.date`)}
                </span>
                <h3
                  className={`font-display font-semibold ${
                    post.large ? "text-[1.5rem]" : "text-[1.18rem]"
                  } leading-[1.28] mt-[.6rem] mb-[.7rem]`}
                >
                  {t(`items.${post.key}.title`)}
                </h3>
                <p className="text-muted text-[.92rem] leading-[1.6] mb-4">
                  {t(`items.${post.key}.body`)}
                </p>
                <a
                  href="#"
                  className="mt-auto font-mono text-[.76rem] tracking-[.06em] text-cyan font-medium inline-flex items-center gap-[.45em] [&_.arr]:transition-transform [&_.arr]:duration-350 [&_.arr]:ease-smooth group-hover:[&_.arr]:translate-x-1"
                >
                  {t("readMore")} <Arrow />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
