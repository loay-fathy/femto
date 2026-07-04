"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin client wrapper around next-themes so it can be mounted from the
 * (server) root layout. Adds/removes the `dark` class on <html>, reads the
 * OS preference, persists the choice, and injects the no-flash script.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
