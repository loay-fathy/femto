import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation wrappers. Always use these for internal navigation —
 * a plain <a href="/about-us"> drops the active locale prefix and forces a
 * middleware redirect + full reload. `usePathname` returns the path with the
 * locale stripped; `useRouter().replace(pathname, { locale })` re-prefixes it,
 * preserving the current route when switching languages.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
