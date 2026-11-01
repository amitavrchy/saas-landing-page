"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden hero-aurora pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="page-container relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="text-[14px] font-medium uppercase tracking-[0.14em] text-accent"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.5, ease }}
          className="display mt-4 max-w-3xl text-[clamp(2.1rem,5vw,3.5rem)]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease }}
          className="lead mt-5 max-w-xl"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
