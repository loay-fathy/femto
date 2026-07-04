"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * Light/dark switch. Toggles between the two resolved themes and persists via
 * next-themes. Renders a same-sized placeholder until mounted so server and
 * client markup match (the resolved theme is unknown during SSR).
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("Theme");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const base =
    "grid place-items-center w-[42px] h-[42px] rounded-full transition-colors duration-300 [&_svg]:w-[18px] [&_svg]:h-[18px]";

  if (!mounted) {
    return <span className={`${base} ${className}`} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? t("switchToLight") : t("switchToDark");

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`${base} ${className}`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
