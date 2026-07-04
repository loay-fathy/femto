import type { ReactNode } from "react";

/**
 * Icons omit width/height and rely on the viewBox + currentColor, so they are
 * sized by their parent with Tailwind utilities (e.g. `[&_svg]:w-7 [&_svg]:h-7`).
 */
function Stroke({ sw = 1.7, children }: { sw?: number; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ---------- Capabilities ---------- */
export const SupplyIcon = () => (
  <Stroke>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </Stroke>
);

export const LabellingIcon = () => (
  <Stroke>
    <path d="M10 2v7.5" />
    <path d="M14 2v7.5" />
    <path d="M8.5 2h7" />
    <path d="M7 9.5h10l3.2 8.2A3 3 0 0 1 17.4 22H6.6a3 3 0 0 1-2.8-4.3z" />
    <path d="M6 16h12" />
  </Stroke>
);

export const ResearchIcon = () => (
  <Stroke>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
    <path d="M11 8v6M8 11h6" />
  </Stroke>
);

/* ---------- Why / pillars ---------- */
export const ShieldIcon = () => (
  <Stroke>
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5z" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
);

export const ActivityIcon = () => (
  <Stroke>
    <path d="M3 12h4l2 6 4-12 2 6h6" />
  </Stroke>
);

export const SettingsIcon = () => (
  <Stroke>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
  </Stroke>
);

export const AtomIcon = () => (
  <Stroke>
    <path d="M12 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    <circle cx="12" cy="11" r="9" />
  </Stroke>
);

export const GraduationIcon = () => (
  <Stroke>
    <path d="M22 10 12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5" />
  </Stroke>
);

/* ---------- Applications ---------- */
export const HeartIcon = () => (
  <Stroke>
    <path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-2 5 5 0 0 1 9 2c-2 4.5-9 9-9 9z" />
  </Stroke>
);

export const MolecularIcon = () => (
  <Stroke>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" opacity=".5" />
    <circle cx="12" cy="12" r="3" />
  </Stroke>
);

export const ThyroidIcon = () => (
  <Stroke>
    <path d="M8 3v4M16 3v4M6 7h12l-1 5a5 5 0 0 1-10 0z" />
    <path d="M9 17h6v4H9z" />
  </Stroke>
);

export const RadiopharmIcon = () => (
  <Stroke>
    <path d="M10 2v6.3a2 2 0 0 1-.3 1L4 19a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5.7-9.7a2 2 0 0 1-.3-1V2" />
    <path d="M8.5 2h7" />
  </Stroke>
);

export const OncologyIcon = () => (
  <Stroke>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a8 8 0 0 0 .2-6M4.6 9a8 8 0 0 0-.2 6M9 4.6a8 8 0 0 1 6 0M15 19.4a8 8 0 0 1-6 0" />
  </Stroke>
);

export const IndustrialIcon = () => (
  <Stroke>
    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
    <path d="M9 21v-6h6v6" />
  </Stroke>
);

/* ---------- Contact / footer ---------- */
export const MailIcon = () => (
  <Stroke sw={1.8}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Stroke>
);

export const PhoneIcon = () => (
  <Stroke sw={1.8}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </Stroke>
);

export const PinIcon = () => (
  <Stroke sw={1.8}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Stroke>
);

export const SendIcon = () => (
  <Stroke sw={1.8}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4z" />
  </Stroke>
);

export const BuildingIcon = () => (
  <Stroke sw={1.8}>
    <path d="M4 21h16" />
    <path d="M6 21V5l8-3v19" />
    <path d="M14 9h4v12" />
    <path d="M9 7h0M9 11h0M9 15h0" />
  </Stroke>
);

export const ChevronIcon = () => (
  <Stroke sw={1.8}>
    <path d="m6 9 6 6 6-6" />
  </Stroke>
);

export const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V9.96H5.67v8.38zM7 8.6a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.74v-4.6c0-2.46-1.31-3.6-3.06-3.6a2.64 2.64 0 0 0-2.4 1.32v-1.13h-2.66c.04.75 0 8.38 0 8.38h2.66v-4.68c0-.24.02-.48.09-.65.19-.48.62-.97 1.35-.97.96 0 1.34.73 1.34 1.79v4.51z" />
  </svg>
);

/* ---------- Theme toggle ---------- */
export const SunIcon = () => (
  <Stroke sw={1.8}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Stroke>
);

export const MoonIcon = () => (
  <Stroke sw={1.8}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Stroke>
);

/** Inline arrow used in buttons/links. Mirrors under RTL so it points in the
 * reading direction; `-scale-x-100` composes with the parent's hover translate. */
export const Arrow = () => <span className="arr inline-block rtl:-scale-x-100">→</span>;
