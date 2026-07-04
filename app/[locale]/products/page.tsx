import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import ContactCTA from "@/components/ContactCTA";
import ProductsHero from "@/components/products-page/ProductsHero";
import ProductsCatalogue from "@/components/products-page/ProductsCatalogue";
import ProductsServices from "@/components/products-page/ProductsServices";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata.products" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { languages: { en: "/en/products", ar: "/ar/products" } },
  };
}

export default function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main id="top">
        <ProductsHero />
        <ProductsCatalogue />
        <ProductsServices />
        <Stats />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
