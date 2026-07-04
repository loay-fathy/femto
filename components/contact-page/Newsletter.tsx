"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Arrow } from "@/components/icons";
import { fadeUp, revealProps } from "@/lib/motion";

const btnBase =
  "inline-flex items-center gap-[.6em] font-semibold text-[.95rem] px-6 py-[.92em] rounded-full relative overflow-hidden isolate transition-[transform,box-shadow] duration-400 ease-smooth hover:-translate-y-0.5 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.25)_45%,transparent_60%)] before:-translate-x-[130%] before:transition-transform before:duration-700 before:ease-smooth hover:before:translate-x-[130%] [&_.arr]:transition-transform [&_.arr]:duration-400 [&_.arr]:ease-smooth hover:[&_.arr]:translate-x-1";

type Status = "idle" | "submitting" | "success" | "error";

export default function Newsletter() {
  const reduce = useReducedMotion();
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hp }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative py-[clamp(72px,9vw,128px)] bg-base">
      <div className="w-full max-w-wrap mx-auto px-[clamp(20px,5vw,40px)]">
        <motion.div
          className="flex gap-[clamp(1.5rem,4vw,3rem)] items-center justify-between flex-wrap text-fg dark:text-white rounded-[22px] overflow-hidden relative panel-hero p-[clamp(1.8rem,3.5vw,2.8rem)]"
          variants={fadeUp(24)}
          {...revealProps(reduce)}
        >
          <div className="max-w-[46ch]">
            <span className="inline-flex items-center gap-[.6em] font-mono text-[.72rem] font-medium tracking-[.28em] uppercase text-navy dark:text-cyan before:content-[''] before:w-[26px] before:h-px before:bg-navy dark:before:bg-cyan">
              {t("eyebrow")}
            </span>
            <h3 className="font-display font-semibold text-[clamp(1.4rem,2.4vw,1.9rem)] mt-2 mb-[.6rem]">
              {t("heading")}
            </h3>
            <p className="text-muted dark:text-haze text-[.96rem] leading-[1.6]">
              {t("body")}
            </p>
          </div>
          <form
            className="flex gap-[.6rem] flex-wrap flex-1 min-w-[280px] max-w-[440px] mx-sm:max-w-none"
            onSubmit={handleSubmit}
          >
            {/* Honeypot: hidden from users; a filled value is dropped server-side. */}
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
              <label htmlFor="nl-company">Company website</label>
              <input
                id="nl-company"
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </div>
            <input
              type="email"
              required
              disabled={status === "submitting"}
              className="w-full bg-fg/[.04] dark:bg-white/[.04] border border-hairline dark:border-white/[.14] rounded-xl py-[.8em] px-[1em] text-fg dark:text-white font-[450] transition-[border-color,box-shadow,background] duration-300 ease-smooth placeholder:text-subtle dark:placeholder:text-[#6b7fa8] focus:outline-none focus:border-cyan focus:bg-fg/[.06] dark:focus:bg-white/[.06] focus:shadow-[0_0_0_3px_rgba(90,197,241,.25)] flex-1 min-w-[200px] disabled:opacity-75"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              aria-label={t("emailAria")}
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className={`${btnBase} bg-cyan text-ink hover:shadow-glow disabled:opacity-75 disabled:cursor-progress`}
            >
              {status === "submitting" ? t("sending") : t("subscribe")} <Arrow />
            </button>
            <p
              className="basis-full min-h-[1.2rem] text-[.85rem] mt-1"
              role="status"
              aria-live="polite"
            >
              {status === "success" && (
                <span className="text-navy dark:text-cyan">{t("success")}</span>
              )}
              {status === "error" && (
                <span className="text-[#c81e3c] dark:text-[#ffb3bf]">
                  {t("error")}
                </span>
              )}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
