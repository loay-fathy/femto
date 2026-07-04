import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { routing } from "@/i18n/routing";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Inter is a variable font — omit `weight` so any weight (incl. the 450 body default) resolves.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

// Arabic-capable face. Latin fonts carry no Arabic glyphs, so Arabic codepoints
// fall through to this in the font-family chain (see tailwind.config.ts) —
// correct on English pages too, with no locale branching.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Femto Isotope — The Heart of Nuclear Medicine",
  description:
    "Femto Isotope is a Berlin-based supplier of medical and industrial radioisotopes — Mo-99, I-131, Lu-177, Ir-192 — with contract radiochemistry and custom radiolabelling services.",
  icons: { icon: "/favicon.svg" },
};

// Match the browser chrome (address bar) to the active theme's page background.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050b1c" },
  ],
};

// Pre-render both locales at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  // Next 14.2: params is a plain object, not a Promise — do NOT await it.
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  // Required for static rendering — must run before any other next-intl call.
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} ${arabic.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
