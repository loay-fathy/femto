"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * English ⇄ Arabic switch. Mirrors ThemeToggle's shape, but needs no
 * mounted-guard: the active locale is known at SSR from the URL, so the button
 * label is deterministic (no hydration mismatch). `usePathname()` returns the
 * path with the locale stripped; `router.replace(pathname, { locale })`
 * re-prefixes the target locale, preserving the current route.
 */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");
  const next = locale === "en" ? "ar" : "en";

  const base =
    "grid place-items-center w-[42px] h-[42px] rounded-full transition-colors duration-300 font-semibold text-[.82rem] leading-none";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      aria-label={t("language")}
      title={t("language")}
      lang={next}
      className={`${base} ${className}`}
    >
      {locale === "en" ? "ع" : "EN"}
    </button>
  );
}
