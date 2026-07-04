import type { Transition, Variants } from "framer-motion";

/** Shared easing curve — mirrors the site's `--ease` CSS custom property. */
export const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Default viewport config for scroll-triggered reveals. */
export const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
} as const;

/**
 * Standard scroll-in props that respect `prefers-reduced-motion`.
 * When reduced, elements render straight into their resting ("show") state;
 * otherwise they animate from "hidden" to "show" as they scroll into view.
 * Spread onto a motion element (or a stagger container — children inherit the
 * run state, so they only need their own `variants`).
 */
export function revealProps(reduce: boolean | null) {
  return reduce
    ? { initial: "show" as const }
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: VIEWPORT,
      };
}

/** Fade-and-rise reveal — used for section headers. */
export function fadeUp(y = 28, delay = 0): Variants {
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay },
    },
  };
}

/** Fade-and-scale "bloom" — for visuals and cards that should grow into place. */
export function scaleIn(delay = 0, from = 0.92): Variants {
  return {
    hidden: { opacity: 0, scale: from },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASE, delay },
    },
  };
}

/**
 * Fade-and-directional-slide — for two-column copy/cards. `edge` is the
 * logical side the element enters from ("start"/"end"), so it mirrors under
 * RTL: pass `rtl` (e.g. `useLocale() === "ar"`) to flip the horizontal offset.
 */
export function slideIn(
  edge: "start" | "end",
  x = 40,
  rtl = false,
  delay = 0
): Variants {
  const sign = edge === "start" ? -1 : 1;
  return {
    hidden: { opacity: 0, x: (rtl ? -sign : sign) * x },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: EASE, delay },
    },
  };
}

/** Container that staggers its motion children into view. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Child item for use inside a {@link staggerContainer}. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Child item that pops in with a slight scale — for emphasis (e.g. stats). */
export const popItem: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Snappy lift transition shared by interactive cards. */
export const hoverTransition: Transition = { duration: 0.32, ease: EASE };
