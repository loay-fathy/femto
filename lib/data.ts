import type { ComponentType } from "react";
import {
  SupplyIcon,
  LabellingIcon,
  ResearchIcon,
  ShieldIcon,
  ActivityIcon,
  SettingsIcon,
  AtomIcon,
  GraduationIcon,
  HeartIcon,
  MolecularIcon,
  ThyroidIcon,
  RadiopharmIcon,
  OncologyIcon,
  IndustrialIcon,
} from "@/components/icons";

/*
 * Structure-only data. Every user-facing STRING lives in the message catalogue
 * (messages/<locale>.json); this file keeps the non-translatable structure —
 * icons, hrefs, element symbols/masses, counts — plus a stable `key` that
 * components use to look up the translated title/body/etc. via next-intl.
 */

export type NavLink = { href: string; key: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/", key: "home" },
  { href: "/about-us", key: "about" },
  { href: "/products", key: "products" },
  { href: "/#why", key: "whyFemto" },
  { href: "/#news", key: "news" },
  { href: "/contact-us", key: "contact" },
];

export const DRAWER_LINKS: NavLink[] = [
  { href: "/", key: "home" },
  { href: "/about-us", key: "about" },
  { href: "/products", key: "products" },
  { href: "/#why", key: "whyFemto" },
  { href: "/#applications", key: "applications" },
  { href: "/contact-us", key: "contact" },
];

/**
 * Homepage section ids tracked for the active-link highlight. Hardcoded because
 * NAV_LINKS hrefs are now root-relative (`/`, `/about-us`, `/#id`) rather than
 * bare `#id`. Highlighting only applies while viewing the homepage.
 */
export const SECTION_IDS = ["top", "about", "isotopes", "why", "news"];

export type HeroChip = { symbol: string; mass: string };

export const HERO_CHIPS: HeroChip[] = [
  { symbol: "Mo", mass: "-99" },
  { symbol: "I", mass: "-131" },
  { symbol: "Lu", mass: "-177" },
  { symbol: "Ir", mass: "-192" },
  { symbol: "Yb", mass: "-176" },
];

/** Homepage "About" value bullets. Strings under `About.values.<key>`. */
export type AboutValue = { key: string };

export const ABOUT_VALUES: AboutValue[] = [
  { key: "mission" },
  { key: "vision" },
  { key: "quality" },
  { key: "supply" },
];

export type Capability = {
  key: string;
  Icon: ComponentType;
  href: string;
};

/** Strings under `Capabilities.items.<key>` (idx/title/body/linkText). */
export const CAPABILITIES: Capability[] = [
  { key: "supply", Icon: SupplyIcon, href: "#isotopes" },
  { key: "labelling", Icon: LabellingIcon, href: "#contact" },
  { key: "research", Icon: ResearchIcon, href: "#contact" },
];

export type Isotope = {
  key: string;
  z: string;
  symbol: string;
  mass: string;
};

/** Strings under `Isotopes.items.<key>` (category/name/use). */
export const ISOTOPES: Isotope[] = [
  { key: "mo", z: "Z 42", symbol: "Mo", mass: "99" },
  { key: "i", z: "Z 53", symbol: "I", mass: "131" },
  { key: "lu", z: "Z 71", symbol: "Lu", mass: "177" },
  { key: "ir", z: "Z 77", symbol: "Ir", mass: "192" },
  { key: "yb", z: "Z 70", symbol: "Yb", mass: "176" },
];

/* ============================ PRODUCTS PAGE ============================ */

/**
 * Product catalogue entries shown on /products. Strings (category/name/summary/
 * applications) live under `ProductsCatalogue.items.<key>`; `Icon` is rendered
 * behind the element symbol.
 */
export type Product = {
  key: string;
  z: string;
  symbol: string;
  mass: string;
  Icon: ComponentType;
};

export const PRODUCTS: Product[] = [
  { key: "mo", z: "Z 42", symbol: "Mo", mass: "99", Icon: MolecularIcon },
  { key: "i", z: "Z 53", symbol: "I", mass: "131", Icon: ThyroidIcon },
  { key: "lu", z: "Z 71", symbol: "Lu", mass: "177", Icon: OncologyIcon },
  { key: "ir", z: "Z 77", symbol: "Ir", mass: "192", Icon: IndustrialIcon },
  { key: "yb", z: "Z 70", symbol: "Yb", mass: "176", Icon: AtomIcon },
];

/** Reactor irradiation service block on /products. Strings under `ProductsServices`. */
export const PRODUCT_SERVICE = {
  href: "/contact-us",
} as const;

export type Stat = { key: string; count: number; suffix?: string };

/** Strings (label) under `Stats.items.<key>`. */
export const STATS: Stat[] = [
  { key: "kits", count: 150, suffix: "+" },
  { key: "petKits", count: 60 },
  { key: "generators", count: 35, suffix: "+" },
  { key: "years", count: 15, suffix: "+" },
];

export type Pillar = {
  key: string;
  variant?: "feat" | "wide";
  Icon: ComponentType;
};

/** Strings (title/body) under `WhyFemto.items.<key>`. */
export const PILLARS: Pillar[] = [
  { key: "quality", variant: "feat", Icon: ShieldIcon },
  { key: "supply", variant: "wide", Icon: ActivityIcon },
  { key: "technology", Icon: SettingsIcon },
  { key: "experience", Icon: AtomIcon },
  { key: "education", Icon: GraduationIcon },
];

export type Application = {
  key: string;
  n: string;
  Icon: ComponentType;
};

/** Strings (title/body) under `Applications.items.<key>`. */
export const APPLICATIONS: Application[] = [
  { key: "nuclearMedicine", n: "01", Icon: HeartIcon },
  { key: "molecularImaging", n: "02", Icon: MolecularIcon },
  { key: "thyroid", n: "03", Icon: ThyroidIcon },
  { key: "radiopharma", n: "04", Icon: RadiopharmIcon },
  { key: "oncology", n: "05", Icon: OncologyIcon },
  { key: "industrial", n: "06", Icon: IndustrialIcon },
];

export type Post = { key: string; large?: boolean };

/** Strings (tag/date/title/body) under `News.items.<key>`. */
export const NEWS: Post[] = [
  { key: "demand", large: true },
  { key: "eanm" },
  { key: "therapyLine" },
];

export const CONTACT = {
  email: "info@femtoisotope.com",
  phoneHref: "tel:+201014667229",
  phoneLabel: "+20 101 466 7229",
  phoneUsHref: "tel:+12126951962",
  phoneUsLabel: "+1 (212) 695-1962",
  linkedin: "https://www.linkedin.com/company/femtoisotope/",
  address: ["Französische Straße 12", "D-10117 Berlin, Germany"],
} as const;

/* ============================ CONTACT PAGE ============================ */

/** Inquiry categories for the contact form. `value` is both the form value and
 * the catalogue key (`Contact.inquiry.<value>`). */
export type InquiryType = { value: string };

export const INQUIRY_TYPES: InquiryType[] = [
  { value: "supply" },
  { value: "labelling" },
  { value: "research" },
  { value: "other" },
];

/* ============================ ABOUT US PAGE ============================ */

export type MissionVision = {
  key: string;
  Icon: ComponentType;
};

/** Strings (label/title/body) under `MissionVision.items.<key>`. */
export const MISSION_VISION: MissionVision[] = [
  { key: "mission", Icon: AtomIcon },
  { key: "vision", Icon: ActivityIcon },
];

export type Principle = {
  key: string;
  variant?: "feat" | "wide";
  Icon: ComponentType;
};

/** Strings (title/body) under `AboutPrinciples.items.<key>`. */
export const ABOUT_PRINCIPLES: Principle[] = [
  { key: "quality", variant: "feat", Icon: ShieldIcon },
  { key: "supply", variant: "wide", Icon: ActivityIcon },
  { key: "technology", Icon: SettingsIcon },
  { key: "experience", Icon: AtomIcon },
  { key: "education", Icon: GraduationIcon },
];

export type Milestone = { key: string };

/** Strings (year/title/body) under `AboutTimeline.items.<key>`. */
export const ABOUT_TIMELINE: Milestone[] = [
  { key: "origins" },
  { key: "y2009" },
  { key: "scaleup" },
  { key: "y2024" },
  { key: "today" },
];

export type ProcessStep = {
  key: string;
  n: string;
  Icon: ComponentType;
};

/** Strings (title/body) under `AboutProcess.items.<key>`. */
export const ABOUT_PROCESS: ProcessStep[] = [
  { key: "irradiation", n: "01", Icon: AtomIcon },
  { key: "radiochemistry", n: "02", Icon: ResearchIcon },
  { key: "qualityControl", n: "03", Icon: ShieldIcon },
  { key: "delivery", n: "04", Icon: SupplyIcon },
];

export type Location = { key: string; lines: string[] };

/** Address `lines` stay literal; `label` translated under `Locations.items.<key>`. */
export const LOCATIONS: Location[] = [
  {
    key: "berlin",
    lines: ["Französische Straße 12", "D-10117 Berlin, Germany"],
  },
  {
    key: "newyork",
    lines: ["463 7th Ave", "New York, NY 10018, USA"],
  },
];
