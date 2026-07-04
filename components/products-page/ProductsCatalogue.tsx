"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Arrow } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import {
  EASE,
  fadeUp,
  hoverTransition,
  revealProps,
  staggerContainer,
} from "@/lib/motion";
import { PRODUCTS } from "@/lib/data";

/** Cards fade, rise and bloom slightly as the grid cascades into view. */
const cardItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function ProductsCatalogue() {
  const reduce = useReducedMotion();
  const t = useTranslations("ProductsCatalogue");

  return (
    <section
      className="relative py-[clamp(72px,9vw,128px)] bg-base"
      id="catalogue"
    >
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
          <p className="text-muted text-[clamp(1rem,1.4vw,1.12rem)] max-w-[60ch] mt-[1.1rem] text-center mx-auto">
            {t("body")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-[1.3rem] mx-lg:grid-cols-2 mx-sm:grid-cols-1"
          variants={staggerContainer(0.08)}
          {...revealProps(reduce)}
        >
          {PRODUCTS.map((product) => {
            const { Icon } = product;
            return (
              <motion.article
                className="group relative border border-hairline rounded-[18px] p-[1.7rem_1.6rem_1.8rem] bg-elevated overflow-hidden transition-[transform,box-shadow,border-color] duration-450 ease-smooth flex flex-col before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(120%_90%_at_80%_0%,rgba(90,197,241,.16),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 hover:shadow-glow hover:border-[rgba(90,197,241,.5)]"
                variants={cardItem}
                whileHover={reduce ? undefined : { y: -8, transition: hoverTransition }}
                tabIndex={0}
                key={product.key}
              >
                <div className="flex justify-between items-start font-mono text-[.7rem] text-muted tracking-[.05em]">
                  <span>{product.z}</span>
                  <span className="px-[.6em] py-[.2em] rounded-[6px] bg-[rgba(23,64,148,.07)] text-navy dark:bg-cyan/10 dark:text-cyan font-medium text-[.62rem] tracking-[.1em] uppercase">
                    {t(`items.${product.key}.category`)}
                  </span>
                </div>
                <div
                  className="absolute end-[-14px] top-[-6px] w-24 h-24 text-navy dark:text-cyan opacity-[.06] pointer-events-none transition-[opacity,transform] duration-500 ease-smooth group-hover:opacity-[.12] group-hover:scale-[1.05] group-hover:-rotate-[4deg] [&_svg]:w-full [&_svg]:h-full"
                  aria-hidden="true"
                >
                  <Icon />
                </div>
                <div className="flex items-baseline gap-1 mt-[.7rem] mb-[.2rem]">
                  <span className="font-display font-bold text-[3.1rem] leading-[.9] text-navy dark:text-frost tracking-[-.02em] transition-colors duration-400 group-hover:text-navy-700 dark:group-hover:text-cyan">
                    {product.symbol}
                  </span>
                  <span className="font-mono text-[.92rem] text-cyan font-semibold self-start mt-[.2rem]">
                    {product.mass}
                  </span>
                </div>
                <div className="font-display font-medium text-[1.04rem] mb-[.45rem]">
                  {t(`items.${product.key}.name`)}
                </div>
                <p className="text-muted text-[.86rem] leading-[1.55] mt-[.55rem]">
                  {t(`items.${product.key}.summary`)}
                </p>
                <ul className="flex flex-wrap gap-[.45rem] mt-[1.1rem] list-none">
                  {(t.raw(`items.${product.key}.applications`) as string[]).map((app) => (
                    <li
                      key={app}
                      className="font-mono text-[.62rem] tracking-[.08em] uppercase text-navy dark:text-cyan font-medium px-[.7em] py-[.32em] rounded-full bg-[rgba(23,64,148,.06)] dark:bg-cyan/[.08] border border-hairline"
                    >
                      {app}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-[.45em] mt-auto pt-[1.3rem] font-mono text-[.78rem] tracking-[.06em] text-cyan font-medium [&_.arr]:transition-transform [&_.arr]:duration-350 [&_.arr]:ease-smooth group-hover:[&_.arr]:translate-x-1"
                >
                  {t("requestSupply")} <Arrow />
                </Link>
                <span className="absolute end-[-26px] bottom-[-26px] w-[120px] h-[120px] border border-dashed border-[rgba(90,197,241,.4)] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-spin360 after:content-[''] after:absolute after:top-[-4px] after:left-1/2 after:w-2 after:h-2 after:-ml-1 after:rounded-full after:bg-cyan after:shadow-[0_0_10px_#5AC5F1]" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
