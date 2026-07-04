import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import ContactCTA from "@/components/ContactCTA";
import AboutHero from "@/components/about-page/AboutHero";
import AboutStory from "@/components/about-page/AboutStory";
import AboutTimeline from "@/components/about-page/AboutTimeline";
import MissionVision from "@/components/about-page/MissionVision";
import AboutProcess from "@/components/about-page/AboutProcess";
import AboutPrinciples from "@/components/about-page/AboutPrinciples";
import Locations from "@/components/about-page/Locations";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { languages: { en: "/en/about-us", ar: "/ar/about-us" } },
  };
}

export default function AboutUsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main id="top">
        <AboutHero />
        <AboutStory />
        <AboutTimeline />
        <MissionVision />
        <AboutProcess />
        <AboutPrinciples />
        <Stats />
        <Locations />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
