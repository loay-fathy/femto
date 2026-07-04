import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactHero from "@/components/contact-page/ContactHero";
import ContactMain from "@/components/contact-page/ContactMain";
import Newsletter from "@/components/contact-page/Newsletter";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { languages: { en: "/en/contact-us", ar: "/ar/contact-us" } },
  };
}

export default function ContactUsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main id="top">
        <ContactHero />
        <ContactMain />
        <Newsletter />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
