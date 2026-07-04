import { Resend } from "resend";
import { CONTACT } from "@/lib/data";

/*
 * Server-only email helpers shared by the /api route handlers. Nothing here is
 * imported by client components, so the Resend key never reaches the browser.
 */

/**
 * Lazily construct the Resend client. Built at call time (never at module load)
 * so `next build` succeeds in environments without the key — the routes only
 * touch this on an actual request.
 */
export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

/** Sender identity. Must be on a domain verified in your Resend account. */
export const fromEmail = (): string =>
  process.env.CONTACT_FROM_EMAIL || "Femto Isotope <onboarding@resend.dev>";

/** Where contact-form enquiries are delivered. Falls back to the public inbox. */
export const inboxEmail = (): string =>
  process.env.CONTACT_INBOX_EMAIL || CONTACT.email;

/** Resend Audience that newsletter sign-ups are added to. */
export const audienceId = (): string | undefined =>
  process.env.RESEND_AUDIENCE_ID;

/** Mirrors the client-side EMAIL_RE in ContactMain.tsx. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (v: unknown): v is string =>
  typeof v === "string" && EMAIL_RE.test(v.trim());

/**
 * A non-empty honeypot value means a bot filled a field real users never see.
 * Callers short-circuit with a fake success so bots don't learn they were caught.
 */
export const isBot = (hp: unknown): boolean =>
  typeof hp === "string" && hp.trim().length > 0;

/** Trim and length-cap a free-text field; returns "" for non-strings. */
export const clean = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
