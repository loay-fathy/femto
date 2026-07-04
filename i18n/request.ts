import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Per-request i18n config consumed by the next-intl plugin. Validates the
 * requested locale (falling back to the default) and loads its message
 * catalogue. Must return `locale` explicitly (next-intl v3.22+).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as (typeof routing.locales)[number])
    ? (requested as string)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
