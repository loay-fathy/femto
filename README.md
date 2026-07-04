# Femto Isotope — Website

Redesigned corporate site for **Femto Isotope**, a Berlin-based supplier of medical and
industrial radioisotopes (Mo-99, I-131, Lu-177, Ir-192, Yb-176) offering custom
radiolabelling and contract radiochemistry.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm run start   # production build
```

> Requires Node 18.17+ (Node 20 LTS recommended).

## Forms & environment

The contact and newsletter forms POST to Next.js Route Handlers
(`app/api/contact`, `app/api/newsletter`) that use [Resend](https://resend.com)
for email delivery and newsletter list storage. Copy the env template and fill it in:

```bash
cp .env.example .env.local   # .env.local is gitignored
```

| Variable              | Purpose                                                              |
| --------------------- | ------------------------------------------------------------------- |
| `RESEND_API_KEY`      | Resend API key ([dashboard](https://resend.com/api-keys)).          |
| `RESEND_AUDIENCE_ID`  | Audience newsletter sign-ups are added to (create one in Resend).   |
| `CONTACT_FROM_EMAIL`  | Sender identity; its domain **must be verified** in Resend.         |
| `CONTACT_INBOX_EMAIL` | Where enquiries land (defaults to `CONTACT.email` in `lib/data.ts`).|

Before verifying a domain you can test sends with
`CONTACT_FROM_EMAIL="Femto Isotope <onboarding@resend.dev>"`. Both forms include a
hidden honeypot field; submissions that fill it are silently dropped server-side.

## Design system

| Token            | Value     | Role                          |
| ---------------- | --------- | ----------------------------- |
| `navy`           | `#174094` | Primary brand (from logo)     |
| `cyan`           | `#5AC5F1` | Accent / "illumination"       |
| `ink`            | `#0B1B3A` | Deep nuclear dark backgrounds |
| `cloud`          | `#F4F7FB` | Clinical light section base   |
| `mist`           | `#5B6B8C` | Secondary text                |

- **Display:** Space Grotesk · **Body:** Inter · **Data/labels:** JetBrains Mono
  (loaded via `next/font`, exposed as CSS variables and mapped in `tailwind.config.ts`).
- Signature: the hero **nucleus canvas** (driven by the `useNucleusCanvas` hook in
  `hooks/useNucleusCanvas.ts`) and the **periodic-tile isotope catalogue**
  (`components/Isotopes.tsx`).
- All motion respects `prefers-reduced-motion` and the canvas pauses on tab blur.

## Structure

```
app/
  layout.tsx        fonts, metadata, <html> wrapper
  page.tsx          composes the homepage sections
  globals.css       Tailwind layers + brand tokens + component classes
components/
  Navbar  Hero  Partners  About  Capabilities
  Isotopes  Stats  WhyFemto  Applications  News  ContactCTA  Footer
  Reveal  Counter     scroll-reveal + count-up primitives
  icons.tsx           named SVG icon set
lib/
  data.ts           all editable content (isotopes, stats, news, contact…)
public/
  femto-logo.png    the existing brand logo (reused)
```

## Editing content

Copy lives in `lib/data.ts` — isotopes, capabilities, pillars, applications, news
posts, stats and contact details. Update there; the components map over it.

> The stat figures (150+, 60, 35+, 15+) and the "2009" founding marker are
> placeholders — replace with verified numbers before launch.
"# femto" 
