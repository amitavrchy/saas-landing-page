"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Starter",
    icp: "For solo PMs",
    price: "$12",
    blurb: "Cycles + issues for one workspace.",
    perks: ["Unlimited issues", "2 cycles ahead", "Slack sync"],
  },
  {
    name: "Team",
    icp: "For product teams",
    price: "$29",
    blurb: "AI triage and automations that scale.",
    perks: ["Everything in Starter", "AI triage", "Automations", "Views"],
    featured: true,
  },
  {
    name: "Enterprise",
    icp: "For orgs",
    price: "Custom",
    blurb: "SSO, audit logs, dedicated support.",
    perks: ["SSO / SAML", "Audit log", "Priority support"],
  },
];

export function PricingTeaser() {
  return (
    <section className="section-pad" aria-labelledby="pricing-teaser-heading">
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHeading
          id="pricing-teaser-heading"
          eyebrow="Pricing"
          title="Transparent pricing. Named for how you work."
          description="Start free. Upgrade when the team outgrows the chaos. Annual saves 20%."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                tier.featured
                  ? "border-accent/45 bg-accent/5 shadow-[0_0_60px_-20px_rgba(94,106,210,0.45)]"
                  : "border-border bg-surface",
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 rounded-md bg-accent px-2.5 py-0.5 text-[11px] font-medium text-white">
                  Most popular
                </span>
              )}
              <p className="text-[13px] text-muted">{tier.icp}</p>
              <h3 className="mt-1 text-lg font-semibold">{tier.name}</h3>
              <p className="mt-5 font-mono text-3xl tracking-tight">
                {tier.price}
                {tier.price !== "Custom" && (
                  <span className="text-sm text-muted"> /seat/mo</span>
                )}
              </p>
              <p className="mt-2 text-[13px] text-muted">{tier.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[13px]">
                    <Check className="size-3.5 text-success" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({
                    variant: tier.featured ? "primary" : "secondary",
                    size: "md",
                  }),
                  "mt-7 w-full",
                )}
              >
                {tier.name === "Enterprise" ? "Talk to sales" : "Get started"}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-text"
          >
            Compare all features &amp; seat math
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
