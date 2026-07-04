"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LinkedInIcon, MailIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import {
  fadeUp,
  revealProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { CONTACT } from "@/lib/data";

const LOGO = "/logo.png";

const EXPLORE = [
  { href: "/", key: "home" },
  { href: "/about-us", key: "about" },
  { href: "/products", key: "products" },
  { href: "/#why", key: "why" },
  { href: "/#news", key: "news" },
];

const CAPABILITY_LINKS = [
  { href: "/#isotopes", key: "supply" },
  { href: "/#contact", key: "labelling" },
  { href: "/#contact", key: "research" },
  { href: "/#isotopes", key: "reactor" },
  { href: "/#applications", key: "applications" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const reduce = useReducedMotion();

  return (
    <footer className="bg-surface dark:bg-ink text-muted dark:text-haze pt-[clamp(56px,7vw,84px)] pb-0">
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 mx-lg:grid-cols-2 mx-lg:gap-x-8 mx-sm:grid-cols-1"
          variants={staggerContainer(0.1)}
          {...revealProps(reduce)}
        >
          <motion.div variants={staggerItem}>
            <div className="inline-flex bg-white px-[18px] py-[14px] rounded-[14px] mb-[1.4rem]">
              <Image
                src={LOGO}
                alt="Femto Isotope"
                width={580}
                height={163}
                className="h-[34px] w-auto"
              />
            </div>
            <p className="text-[.92rem] leading-[1.65] max-w-[36ch] text-muted dark:text-steel">
              {t("blurb")}
            </p>
            <div className="flex gap-[.6rem] mt-[1.4rem] [&_svg]:w-[18px] [&_svg]:h-[18px]">
              <a
                href={CONTACT.linkedin}
                aria-label={t("linkedinAria")}
                className="w-10 h-10 rounded-[11px] grid place-items-center bg-fg/[.06] dark:bg-white/[.06] transition-[background,transform,color] duration-300 hover:bg-cyan hover:text-ink hover:-translate-y-[3px]"
              >
                <LinkedInIcon />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label={t("emailAria")}
                className="w-10 h-10 rounded-[11px] grid place-items-center bg-fg/[.06] dark:bg-white/[.06] transition-[background,transform,color] duration-300 hover:bg-cyan hover:text-ink hover:-translate-y-[3px]"
              >
                <MailIcon />
              </a>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h5 className="font-display font-semibold text-[.95rem] text-fg dark:text-white mb-[1.2rem] tracking-[.01em]">
              {t("explore")}
            </h5>
            <div className="flex flex-col gap-[.7rem]">
              {EXPLORE.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="text-[.92rem] text-muted dark:text-steel transition-[color,padding] duration-250 w-fit hover:text-cyan hover:ps-[5px]"
                >
                  {t(`exploreLinks.${link.key}`)}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h5 className="font-display font-semibold text-[.95rem] text-fg dark:text-white mb-[1.2rem] tracking-[.01em]">
              {t("capabilities")}
            </h5>
            <div className="flex flex-col gap-[.7rem]">
              {CAPABILITY_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="text-[.92rem] text-muted dark:text-steel transition-[color,padding] duration-250 w-fit hover:text-cyan hover:ps-[5px]"
                >
                  {t(`capabilityLinks.${link.key}`)}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="[&_p]:text-[.92rem] [&_p]:text-muted dark:[&_p]:text-steel [&_p]:leading-[1.6] [&_p]:mb-[.8rem] [&_a:hover]:text-cyan"
            variants={staggerItem}
          >
            <h5 className="font-display font-semibold text-[.95rem] text-fg dark:text-white mb-[1.2rem] tracking-[.01em]">
              {t("contact")}
            </h5>
            <p>
              {CONTACT.address[0]}
              <br />
              {CONTACT.address[1]}
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p>
              <a href={CONTACT.phoneHref}>{CONTACT.phoneLabel}</a>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-[clamp(40px,5vw,64px)] border-t border-hairline dark:border-white/[.08] py-6 flex justify-between items-center flex-wrap gap-4 [&_p]:font-mono [&_p]:text-[.74rem] [&_p]:tracking-[.04em] [&_p]:text-subtle dark:[&_p]:text-dim"
          variants={fadeUp(18)}
          {...revealProps(reduce)}
        >
          <p>{t("rights")}</p>
          <p>{t("tagline")}</p>
        </motion.div>
      </div>
    </footer>
  );
}
