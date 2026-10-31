import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { customers } from "@/content/customers";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "How product teams use Orbit to cut status meetings and ship the roadmap.",
};

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Customers"
        title="Product orgs that chose calm over chaos"
        description="From 28-person startups to 200-person infra teams — same cycle board, less theater."
      />

      <section className="pb-24">
        <div className="page-container grid gap-4 md:grid-cols-2">
          {customers.map((c) => (
            <Link
              key={c.slug}
              href={`/customers/${c.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-7 transition-all hover:border-accent/40 hover:bg-surface-2/60"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold tracking-tight">{c.company}</p>
                  <p className="text-[14px] text-muted">
                    {c.industry} · {c.size}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-text">
                “{c.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-bg font-mono text-[14px] text-muted ring-1 ring-border">
                  {c.initials}
                </span>
                <div>
                  <p className="text-[14px] font-medium">{c.person}</p>
                  <p className="text-[14px] text-muted">{c.role}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {c.results.map((r) => (
                  <div key={r.label} className="rounded-lg bg-bg px-2.5 py-2">
                    <p className="font-mono text-sm text-text">{r.value}</p>
                    <p className="text-[14px] leading-tight text-muted">{r.label}</p>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
