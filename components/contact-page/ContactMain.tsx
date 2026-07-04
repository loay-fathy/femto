"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Arrow,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SendIcon,
} from "@/components/icons";
import { EASE, revealProps, staggerContainer } from "@/lib/motion";
import { CONTACT, INQUIRY_TYPES } from "@/lib/data";

const btnBase =
  "inline-flex items-center gap-[.6em] font-semibold text-[.95rem] px-6 py-[.92em] rounded-full relative overflow-hidden isolate transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1";

/** Dark input chrome shared by every field. */
const fieldIn =
  "w-full bg-fg/[.04] dark:bg-white/[.04] border rounded-xl py-[.8em] px-[1em] text-fg dark:text-white font-[450] transition-[border-color,box-shadow,background] duration-300 ease-smooth placeholder:text-subtle dark:placeholder:text-[#6b7fa8] focus:outline-none focus:border-cyan focus:bg-fg/[.06] dark:focus:bg-white/[.06] focus:shadow-[0_0_0_3px_rgba(90,197,241,.25)]";
const fieldErr = "border-danger shadow-[0_0_0_3px_rgba(255,138,155,.18)]";
const fieldOk = "border-hairline dark:border-white/[.14]";
const fieldK =
  "font-mono text-[.66rem] font-medium tracking-[.16em] uppercase text-muted dark:text-[#8ea3cb]";

/** Light info-rail row (mirrors .crail .cinfo). */
const railRow =
  "group flex gap-4 items-start py-4 border-b border-hairline first:pt-0 last:border-b-0 last:pb-0 [&_svg]:w-5 [&_svg]:h-5";
const railIc =
  "flex-none w-[42px] h-[42px] rounded-[11px] grid place-items-center bg-[linear-gradient(150deg,#eaf4fc,#dff0fb)] text-navy";
const railK = "font-mono text-[.66rem] tracking-[.16em] uppercase text-muted";
const railV =
  "font-medium text-base mt-[.15rem] text-fg transition-colors duration-250 group-hover:text-cyan";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";
type Fields = {
  inquiry: string;
  name: string;
  email: string;
  org: string;
  message: string;
  /** Honeypot — hidden from users; a non-empty value marks a bot. */
  hp: string;
};

const EMPTY: Fields = {
  inquiry: INQUIRY_TYPES[0].value,
  name: "",
  email: "",
  org: "",
  message: "",
  hp: "",
};

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "name";
  if (!f.email.trim()) e.email = "email";
  else if (!EMAIL_RE.test(f.email)) e.email = "emailInvalid";
  if (!f.message.trim()) e.message = "message";
  return e;
}

export default function ContactMain() {
  const reduce = useReducedMotion();
  const t = useTranslations("Contact");
  const rtl = useLocale() === "ar";

  /** Info rail slides in from the inline-end edge and blooms slightly (mirrors ContactCTA). */
  const railIn: Variants = {
    hidden: { opacity: 0, x: rtl ? -48 : 48, scale: 0.96 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  /** The form column slides in from the inline-start edge. */
  const formIn: Variants = {
    hidden: { opacity: 0, x: rtl ? 32 : -32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {}
  );
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof Fields) => (value: string) =>
    setFields((s) => ({ ...s, [key]: value }));

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus("idle");
      return;
    }
    setStatus("submitting");
    try {
      // --- send() boundary: POST to the /api/contact Route Handler (Resend) ---
      const label = fields.inquiry
        ? t(`inquiry.${fields.inquiry}`)
        : t("form.generalLabel");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, inquiryLabel: label }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setFields(EMPTY);
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] bg-base" id="contact-form">
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="grid grid-cols-[1.1fr_.9fr] gap-[clamp(2rem,5vw,4rem)] items-start mx-lg:grid-cols-1"
          variants={staggerContainer(0.14)}
          {...revealProps(reduce)}
        >
          {/* ---------------- FORM ---------------- */}
          <motion.form
            className="relative overflow-hidden text-fg dark:text-white panel-card rounded-[22px] p-[clamp(1.7rem,3vw,2.6rem)] [&>*]:relative [&>*]:z-[1]"
            onSubmit={handleSubmit}
            variants={formIn}
            noValidate
          >
            <span
              className="absolute top-[-46px] end-[-46px] w-[170px] h-[170px] rounded-full border border-dashed border-[rgba(90,197,241,.32)] pointer-events-none z-0 after:content-[''] after:absolute after:top-[-4px] after:left-1/2 after:w-2 after:h-2 after:-ml-1 after:rounded-full after:bg-cyan after:shadow-[0_0_12px_2px_#5AC5F1] after:[transform-origin:0_85px] after:animate-orbit"
              aria-hidden="true"
            />
            {/* Honeypot: off-screen and skipped by keyboard; a bot that fills it
                is silently dropped server-side. Inline styles beat the parent's
                [&>*]:relative rule so it stays truly hidden. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor="cf-company">Company website</label>
              <input
                id="cf-company"
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={fields.hp}
                onChange={(e) => set("hp")(e.target.value)}
              />
            </div>
            <div className="mb-[.4rem]">
              <span className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-navy dark:before:bg-cyan">
                {t("form.eyebrow")}
              </span>
              <h3 className="font-display font-semibold text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.12] mt-2 max-w-[22ch]">
                {t("form.heading")}
              </h3>
            </div>

            <div className="mt-[1.1rem] flex flex-col gap-[.45rem]">
              <span className={fieldK}>{t("form.inquiryType")}</span>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t("form.inquiryType")}>
                {INQUIRY_TYPES.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`text-[.85rem] py-[.5em] px-[1em] rounded-full bg-fg/[.04] dark:bg-white/[.04] border transition-[background,color,border-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:border-[rgba(90,197,241,.5)] ${
                      fields.inquiry === opt.value
                        ? "bg-cyan text-ink border-cyan font-semibold"
                        : "text-muted dark:text-foam border-hairline dark:border-white/[.16] font-medium"
                    }`}
                    aria-pressed={fields.inquiry === opt.value}
                    onClick={() => set("inquiry")(opt.value)}
                  >
                    {t(`inquiry.${opt.value}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mx-sm:grid-cols-1">
              <div className="mt-[1.1rem] flex flex-col gap-[.45rem]">
                <label className={fieldK} htmlFor="cf-name">
                  {t("form.name")}
                </label>
                <input
                  id="cf-name"
                  className={`${fieldIn} ${errors.name ? fieldErr : fieldOk}`}
                  value={fields.name}
                  onChange={(e) => set("name")(e.target.value)}
                  placeholder={t("form.namePlaceholder")}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="text-[.8rem] text-[#c81e3c] dark:text-[#ffb3bf]">{t(`form.errors.${errors.name}`)}</span>
                )}
              </div>
              <div className="mt-[1.1rem] flex flex-col gap-[.45rem]">
                <label className={fieldK} htmlFor="cf-email">
                  {t("form.email")}
                </label>
                <input
                  id="cf-email"
                  type="email"
                  className={`${fieldIn} ${errors.email ? fieldErr : fieldOk}`}
                  value={fields.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder={t("form.emailPlaceholder")}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="text-[.8rem] text-[#c81e3c] dark:text-[#ffb3bf]">{t(`form.errors.${errors.email}`)}</span>
                )}
              </div>
            </div>

            <div className="mt-[1.1rem] flex flex-col gap-[.45rem]">
              <label className={fieldK} htmlFor="cf-org">
                {t("form.org")}{" "}
                <span className="text-muted dark:text-[#5f74a0] tracking-normal normal-case text-[.62rem]">
                  {t("form.optional")}
                </span>
              </label>
              <input
                id="cf-org"
                className={`${fieldIn} ${fieldOk}`}
                value={fields.org}
                onChange={(e) => set("org")(e.target.value)}
                placeholder={t("form.orgPlaceholder")}
                autoComplete="organization"
              />
            </div>

            <div className="mt-[1.1rem] flex flex-col gap-[.45rem]">
              <label className={fieldK} htmlFor="cf-msg">
                {t("form.message")}
              </label>
              <textarea
                id="cf-msg"
                rows={5}
                className={`${fieldIn} resize-y min-h-[128px] leading-[1.6] ${
                  errors.message ? fieldErr : fieldOk
                }`}
                value={fields.message}
                onChange={(e) => set("message")(e.target.value)}
                placeholder={t("form.messagePlaceholder")}
              />
              {errors.message && (
                <span className="text-[.8rem] text-[#c81e3c] dark:text-[#ffb3bf]">{t(`form.errors.${errors.message}`)}</span>
              )}
            </div>

            <button
              type="submit"
              className={`${btnBase} bg-cyan text-ink hover:shadow-glow mt-[1.6rem] w-full justify-center [&_svg]:w-[18px] [&_svg]:h-[18px] disabled:opacity-75 disabled:cursor-progress`}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? t("form.transmitting") : t("form.send")}
              <SendIcon />
              {!reduce && status === "submitting" && (
                <span
                  className="absolute inset-0 z-[2] pointer-events-none rounded-full bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.45)_45%,transparent_60%)] -translate-x-[130%] animate-beam"
                  aria-hidden="true"
                />
              )}
            </button>

            <div className="mt-4 min-h-[1.4rem] text-[.9rem]" role="status" aria-live="polite">
              {status === "success" && (
                <p className="text-navy dark:text-cyan">
                  {t("form.success")}
                </p>
              )}
              {status === "error" && (
                <p className="text-[#c81e3c] dark:text-[#ffb3bf]">
                  {t("form.error", { email: CONTACT.email })}
                </p>
              )}
            </div>
          </motion.form>

          {/* ---------------- INFO RAIL ---------------- */}
          <motion.aside
            className="bg-elevated border border-hairline rounded-[22px] p-[clamp(1.6rem,2.6vw,2.2rem)] shadow-soft"
            variants={railIn}
          >
            <span className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-cyan">
              {t("rail.eyebrow")}
            </span>
            <h3 className="font-display font-semibold text-[1.3rem] leading-[1.2] mt-2 mb-[.4rem] max-w-[22ch]">
              {t("rail.heading")}
            </h3>

            <a className={railRow} href={`mailto:${CONTACT.email}`}>
              <span className={railIc}>
                <MailIcon />
              </span>
              <span className="flex flex-col">
                <span className={railK}>{t("rail.email")}</span>
                <span className={railV}>{CONTACT.email}</span>
              </span>
            </a>
            <a className={railRow} href={CONTACT.phoneHref}>
              <span className={railIc}>
                <PhoneIcon />
              </span>
              <span className="flex flex-col">
                <span className={railK}>{t("rail.phoneBerlin")}</span>
                <span className={railV}>{CONTACT.phoneLabel}</span>
              </span>
            </a>
            <a className={railRow} href={CONTACT.phoneUsHref}>
              <span className={railIc}>
                <PhoneIcon />
              </span>
              <span className="flex flex-col">
                <span className={railK}>{t("rail.phoneNy")}</span>
                <span className={railV}>{CONTACT.phoneUsLabel}</span>
              </span>
            </a>
            <a
              className={railRow}
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={railIc}>
                <LinkedInIcon />
              </span>
              <span className="flex flex-col">
                <span className={railK}>{t("rail.linkedin")}</span>
                <span className={railV}>{t("rail.linkedinValue")}</span>
              </span>
            </a>
            <div className={railRow}>
              <span className={railIc}>
                <PinIcon />
              </span>
              <span className="flex flex-col">
                <span className={railK}>{t("rail.headquarters")}</span>
                <span className="font-medium text-base mt-[.15rem] text-fg">
                  {CONTACT.address.join(", ")}
                </span>
              </span>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
