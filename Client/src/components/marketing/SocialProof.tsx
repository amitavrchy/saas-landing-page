"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "12k+", label: "issues triaged / day" },
  { value: "2.4×", label: "faster cycle close" },
  { value: "0", label: "status meetings needed" },
];

export function SocialProof() {
  return (
    <section className="section-pad !pt-8">
      <div className="mx-auto max-w-[1120px] px-6">
        <motion.blockquote
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="pointer-events-none absolute -top-8 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <p className="relative display text-[clamp(1.35rem,3vw,2rem)] leading-snug text-text">
            “Orbit replaced three tools and the weekly status theater. Our
            roadmap finally matches what ships.”
          </p>
          <footer className="relative mt-10 flex flex-col items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-surface-2 font-mono text-xs text-muted ring-1 ring-border">
              RC
            </div>
            <div>
              <cite className="not-italic text-sm font-medium text-text">
                Riley Chen
              </cite>
              <p className="text-[13px] text-muted">VP Product, Meridian</p>
            </div>
          </footer>
        </motion.blockquote>

        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-6 border-t border-border/60 pt-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="font-mono text-2xl tracking-tight text-text sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-[12px] text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
