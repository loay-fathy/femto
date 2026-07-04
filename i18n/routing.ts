import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for the site's locales.
 * `localePrefix: "always"` keeps both languages explicitly prefixed
 * (`/en/...`, `/ar/...`) and symmetric for SEO — `/` redirects to `/en`.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
