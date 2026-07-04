import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <>
      <Navbar />
      <main
        id="top"
        className="min-h-[70svh] grid place-items-center text-center px-6 pt-[120px] pb-20 hero-surface text-fg dark:text-white"
      >
        <div className="flex flex-col items-center gap-5">
          <span className="font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan">
            {t("code")}
          </span>
          <h1 className="font-display font-semibold text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] max-w-[18ch]">
            {t("heading")}
          </h1>
          <p className="text-muted dark:text-foam max-w-[46ch]">{t("body")}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-[.5em] font-semibold text-[.95rem] text-white bg-navy px-[1.4em] py-[.8em] rounded-full transition-[transform,box-shadow] duration-350 ease-smooth hover:-translate-y-0.5 hover:shadow-glow"
          >
            {t("backHome")}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
