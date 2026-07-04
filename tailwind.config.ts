import type { Config } from "tailwindcss";

/** Signature easing used across the design (was CSS var --ease). */
const EASE = "cubic-bezier(.22,.61,.36,1)";

/** Reference a semantic CSS-variable token while preserving Tailwind's `<alpha-value>` support. */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Semantic, theme-aware tokens (values defined in globals.css) ──
        base: token("--c-base"), // page background
        surface: token("--c-surface"), // alternate section background
        elevated: token("--c-elevated"), // raised cards
        fg: token("--c-fg"), // primary text
        muted: token("--c-muted"), // secondary text
        subtle: token("--c-subtle"), // tertiary text / labels
        hairline: token("--c-hairline"), // borders

        // ── Fixed brand palette (identical in both themes) ──
        navy: { DEFAULT: "#174094", 700: "#102E6B", glow: "#16306E", bright: "#1B3F8E" },
        cyan: { DEFAULT: "#5AC5F1", soft: "#8FD9F6", bright: "#BFE9FB" },
        ink: { DEFAULT: "#0B1B3A", 2: "#0D2148", deep: "#070F25" },
        cloud: "#F4F7FB",
        paper: "#FFFFFF",
        mist: "#5B6B8C",
        line: "#E2E9F3",
        // light-on-dark text ramp (recurring) — used inside always-dark brand sections
        foam: "#C6D4EE", // sub-headline copy on dark
        haze: "#C2D2EE", // body copy on dark (most common)
        steel: "#9FB0CB", // muted text on dark (footer)
        dim: "#7E93BD", // mono labels on dark
        frost: "#EAF2FF", // bright nav text on dark
        // status
        live: "#48E6A0",
        danger: "#FF8A9B",
      },
      fontFamily: {
        // `--font-arabic` sits after the Latin faces: Latin glyphs resolve to
        // the Latin font, Arabic codepoints fall through to the Arabic face.
        display: ["var(--font-display)", "var(--font-arabic)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-arabic)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "var(--font-arabic)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1200px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,46,107,.06), 0 8px 24px rgba(16,46,107,.06)",
        md2: "0 12px 40px rgba(16,46,107,.12)",
        glow: "0 18px 60px rgba(90,197,241,.28)",
        darkcard: "0 24px 60px rgba(11,27,58,.45)",
        darkcard2: "0 22px 56px rgba(11,27,58,.4)",
        glass: "0 28px 64px rgba(7,15,37,.5)",
      },
      screens: {
        // desktop-first max-width breakpoints (match the original media queries)
        "mx-lg": { max: "980px" },
        "mx-md": { max: "720px" },
        "mx-sm": { max: "560px" },
      },
      transitionTimingFunction: {
        smooth: EASE,
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "450": "450ms",
      },
      keyframes: {
        spin360: { to: { transform: "rotate(360deg)" } },
        orbit: { to: { transform: "rotate(360deg)" } },
        beam: { to: { transform: "translateX(130%)" } },
        wheel: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "70%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { transform: "translateY(88vh)", opacity: "0" },
        },
        blink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
        "pulse-live": {
          "0%": { boxShadow: "0 0 0 0 rgba(72,230,160,.55)" },
          "70%": { boxShadow: "0 0 0 8px rgba(72,230,160,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(72,230,160,0)" },
        },
        "pulse-cyan": {
          "0%": { boxShadow: "0 0 0 0 rgba(90,197,241,.5)" },
          "70%": { boxShadow: "0 0 0 7px rgba(90,197,241,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(90,197,241,0)" },
        },
        equalize: {
          "0%,100%": { height: "28%" },
          "50%": { height: "100%" },
        },
        tlpulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(90,197,241,.5)" },
          "70%": { boxShadow: "0 0 0 9px rgba(90,197,241,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(90,197,241,0)" },
        },
        flowmove: {
          "0%": { left: "11%", opacity: "0" },
          "6%": { opacity: "1" },
          "44%": { left: "89%", opacity: "1" },
          "52%": { left: "89%", opacity: "0" },
          "53%": { left: "11%", opacity: "0" },
          "100%": { left: "11%", opacity: "0" },
        },
      },
      animation: {
        spin360: "spin360 7s linear infinite",
        orbit: "orbit 7s linear infinite",
        beam: `beam 1s ${EASE} infinite`,
        wheel: "wheel 1.8s infinite",
        scan: `scan 7s ${EASE} infinite`,
        blink: "blink 1.1s steps(1) infinite",
        "pulse-live": `pulse-live 2s ${EASE} infinite`,
        "pulse-cyan": `pulse-cyan 2.4s ${EASE} infinite`,
        equalize: `equalize 1.7s ${EASE} infinite`,
        tlpulse: `tlpulse 2.6s ${EASE} infinite`,
        flowmove: `flowmove 6.5s ${EASE} infinite`,
      },
    },
  },
  plugins: [],
};

export default config;
