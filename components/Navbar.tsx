"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Arrow } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useNavScroll } from "@/hooks/useNavScroll";
import { useActiveSection } from "@/hooks/useActiveSection";
import { EASE } from "@/lib/motion";
import { NAV_LINKS, DRAWER_LINKS, SECTION_IDS } from "@/lib/data";

const LOGO = "/logo.png";

const spanBase =
  "absolute start-[11px] end-[11px] h-0.5 rounded-[2px] bg-fg transition-all duration-350 ease-smooth";

export default function Navbar() {
  const t = useTranslations("Nav");
  const scrolled = useNavScroll();
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`group/nav fixed inset-x-0 top-0 z-[100] transition-[background,box-shadow,padding] duration-400 ease-smooth ${
          scrolled
            ? "py-3 bg-base/[.86] backdrop-blur-[14px] backdrop-saturate-[1.8] shadow-[0_1px_0_rgb(var(--c-hairline)),0_10px_30px_rgba(16,46,107,.06)]"
            : "py-[18px]"
        }`}
        id="nav"
        data-scrolled={scrolled}
        initial={reduce ? false : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)] flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center" aria-label={t("homeAria")}>
            <Image
              src={LOGO}
              alt="Femto Isotope"
              width={580}
              height={163}
              priority
              className="h-[38px] w-auto transition-[height] duration-400 ease-smooth group-data-[scrolled=true]/nav:h-[34px]"
            />
          </Link>

          <nav
            className="flex items-center gap-[2.1rem] mx-lg:hidden"
            aria-label={t("primary")}
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  className={`relative py-[.2em] text-[.92rem] font-medium tracking-[.01em] transition-colors duration-300 text-fg hover:text-cyan after:content-[''] after:absolute after:start-0 after:-bottom-0.5 after:h-0.5 after:bg-cyan after:transition-[width] after:duration-350 after:ease-smooth hover:after:w-full ${
                    active === id ? "after:w-full" : "after:w-0"
                  }`}
                  href={link.href}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 mx-lg:hidden">
            <LanguageToggle className="text-fg hover:text-cyan hover:bg-fg/10" />
            <ThemeToggle className="text-fg hover:text-cyan hover:bg-fg/10" />
            <Link
              href="/#contact"
              className="text-[.9rem] font-semibold text-white bg-navy inline-flex items-center gap-[.5em] px-[1.25em] py-[.7em] rounded-full transition-[transform,box-shadow] duration-350 ease-smooth hover:-translate-y-0.5 hover:shadow-glow [&_.arr]:transition-transform [&_.arr]:duration-350 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-[3px]"
            >
              {t("getQuote")} <Arrow />
            </Link>
          </div>

          <button
            className="relative hidden mx-lg:block w-[42px] h-[42px] rounded-[10px]"
            aria-label={t("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`${spanBase} ${
                menuOpen ? "top-[20px] rotate-45" : "top-[14px]"
              }`}
            />
            <span
              className={`${spanBase} ${menuOpen ? "opacity-0" : "top-[20px]"}`}
            />
            <span
              className={`${spanBase} ${
                menuOpen ? "top-[20px] -rotate-45" : "top-[26px]"
              }`}
            />
          </button>
        </div>
      </motion.header>

      <div
        className={`fixed inset-0 z-[98] bg-[rgba(7,17,40,.5)] backdrop-blur-[2px] transition-all duration-400 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 end-0 start-auto w-[min(82vw,340px)] z-[99] bg-base dark:bg-ink text-fg dark:text-white flex flex-col gap-[.4rem] px-8 pt-24 pb-8 shadow-[-20px_0_60px_rgba(0,0,0,.4)] rtl:shadow-[20px_0_60px_rgba(0,0,0,.4)] transition-transform duration-500 ease-smooth ${
          menuOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
        aria-label={t("mobileMenu")}
      >
        {DRAWER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-[1.5rem] font-medium py-[.55rem] border-b border-hairline dark:border-white/[.08] transition-[color,padding] duration-250 hover:text-cyan hover:ps-2"
          >
            {t(link.key)}
          </Link>
        ))}
        <div className="mt-4 border-t border-hairline dark:border-white/[.08] pt-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[.7rem] tracking-[.2em] uppercase text-muted dark:text-steel">
              {t("language")}
            </span>
            <LanguageToggle className="text-fg dark:text-white hover:text-cyan border border-hairline dark:border-white/[.12] hover:border-cyan/40" />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[.7rem] tracking-[.2em] uppercase text-muted dark:text-steel">
              {t("theme")}
            </span>
            <ThemeToggle className="text-fg dark:text-white hover:text-cyan border border-hairline dark:border-white/[.12] hover:border-cyan/40" />
          </div>
        </div>
        <Link
          href="/#contact"
          className="mt-4 justify-center inline-flex items-center gap-[.6em] font-semibold text-[.95rem] px-6 py-[.92em] rounded-full relative overflow-hidden isolate bg-cyan text-ink transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 hover:shadow-glow before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1"
          onClick={() => setMenuOpen(false)}
        >
          {t("getQuote")} <Arrow />
        </Link>
      </aside>
    </>
  );
}
