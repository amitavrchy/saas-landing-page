"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPricingYearly } from "@/features/ui/uiSlice";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    icp: "For solo PMs",
    monthly: 12,
    blurb: "Everything you need to run cycles alone or with a tiny crew.",
    cta: "Start free trial",
    href: "/signup",
    features: [
      "Up to 5 seats",
      "Unlimited issues",
      "Cycles & board views",
      "Slack + GitHub sync",
      "Email support",
    ],
  },
  {
    id: "team",
    name: "Team",
    icp: "For product teams",
    monthly: 29,
    blurb: "AI triage, automations, and views for teams that ship weekly.",
    cta: "Start free trial",
    href: "/signup",
    featured: true,
    features: [
      "Everything in Starter",
      "Unlimited seats",
      "AI triage & suggestions",
      "Automations & digests",
      "Custom views & roadmaps",
      "Priority chat support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icp: "For orgs",
    monthly: null,
    blurb: "Security, compliance, and scale for multi-team product orgs.",
    cta: "Book a demo",
    href: "/signup",
    features: [
      "Everything in Team",
      "SSO / SAML & SCIM",
      "Audit log & DPA",
      "EU / US data residency",
      "Dedicated success manager",
      "Custom MSA",
    ],
  },
];

const COMPARISON = [
  {
    feature: "Active cycles",
    starter: "2",
    team: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "AI triage",
    starter: "—",
    team: "Included",
    enterprise: "Included + custom models",
  },
  {
    feature: "Automations",
    starter: "3",
    team: "Unlimited",
    enterprise: "Unlimited",
  },
  { feature: "SSO", starter: "—", team: "—", enterprise: "SAML / OIDC" },
  {
    feature: "Audit log",
    starter: "—",
    team: "7 days",
    enterprise: "1 year +",
  },
  {
    feature: "Support",
    starter: "Email",
    team: "Chat",
    enterprise: "Dedicated",
  },
];

export function PricingCards() {
  const yearly = useAppSelector((s) => s.ui.pricingYearly);
  const dispatch = useAppDispatch();

  function priceLabel(monthly: number | null) {
    if (monthly === null) return "Custom";
    const value = yearly ? Math.round(monthly * 0.8) : monthly;
    return `$${value}`;
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1">
          <button
            type="button"
            onClick={() => dispatch(setPricingYearly(false))}
            className={cn(
              "rounded-lg px-4 py-2 text-sm transition-all duration-200",
              !yearly
                ? "bg-surface-2 text-text shadow-[inset_0_0_0_1px_var(--border)]"
                : "text-muted",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => dispatch(setPricingYearly(true))}
            className={cn(
              "rounded-lg px-4 py-2 text-sm transition-all duration-200",
              yearly
                ? "bg-surface-2 text-text shadow-[inset_0_0_0_1px_var(--border)]"
                : "text-muted",
            )}
          >
            Annual
            <span className="ml-1.5 text-[14px] text-success">−20%</span>
          </button>
        </div>
        <p className="font-mono text-[14px] text-muted">
          Seat math: Team @ {priceLabel(29)}
          {yearly ? "/mo billed yearly" : "/mo"} · 10 seats = $
          {yearly ? Math.round(29 * 0.8 * 10) : 29 * 10}
          /mo
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.08,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "relative flex flex-col rounded-2xl border p-6",
              tier.featured
                ? "border-accent/50 bg-accent/5 shadow-[0_0_60px_-20px_rgba(94,106,210,0.4)]"
                : "border-border bg-surface",
            )}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-6 rounded-md bg-accent px-2 py-0.5 text-[14px] font-medium text-bg">
                Most popular
              </span>
            )}
            <p className="text-[14px] text-muted">{tier.icp}</p>
            <h3 className="mt-1 text-xl font-semibold">{tier.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <motion.span
                key={`${tier.id}-${yearly}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-4xl tracking-tight"
              >
                {priceLabel(tier.monthly)}
              </motion.span>
              {tier.monthly !== null && (
                <span className="text-sm text-muted">/seat/mo</span>
              )}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              {tier.blurb}
            </p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2 text-[14px]">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={tier.href}
              className={cn(
                buttonVariants({
                  variant: tier.featured ? "primary" : "secondary",
                  size: "lg",
                }),
                "mt-8 w-full",
              )}
            >
              {tier.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 overflow-x-auto">
        <h3 className="mb-6 text-center text-lg font-semibold">
          Compare plans
        </h3>
        <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-medium text-muted">Feature</th>
              <th className="py-3 px-4 font-medium">Starter</th>
              <th className="py-3 px-4 font-medium">Team</th>
              <th className="py-3 pl-4 font-medium">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-border/70">
                <td className="py-3.5 pr-4 text-muted">{row.feature}</td>
                <td className="px-4 py-3.5">{row.starter}</td>
                <td className="px-4 py-3.5">{row.team}</td>
                <td className="py-3.5 pl-4">{row.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
