"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  durationMs?: number;
  /** How to format the displayed value. */
  format?: "default" | "string";
};

function formatValue(value: number, mode: CounterProps["format"]) {
  if (mode === "string") return String(value);
  return value.toLocaleString();
}

/** Eases from 0 to `to` once on first scroll into view (respects reduced motion). */
export default function Counter({
  to,
  durationMs = 1600,
  format = "default",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setValue(to);
      return;
    }

    let raf = 0;
    const run = () => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(step);
        else setValue(to);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs]);

  return <span ref={ref}>{formatValue(value, format)}</span>;
}
