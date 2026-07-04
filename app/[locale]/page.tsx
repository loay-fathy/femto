import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Isotopes from "@/components/Isotopes";
import Stats from "@/components/Stats";
import WhyFemto from "@/components/WhyFemto";
import Applications from "@/components/Applications";
import News from "@/components/News";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Partners />
        <About />
        <Capabilities />
        <Isotopes />
        <Stats />
        <WhyFemto />
        <Applications />
        <News />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
