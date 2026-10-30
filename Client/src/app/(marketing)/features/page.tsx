import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { features } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Cycles, issues, views, automations, AI triage, and integrations — the Orbit platform for product teams.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="The platform behind calm shipping"
        description="Six pillars designed as one system. Click any pillar for diagrams, metrics, and how teams actually use it."
      />

      <section className="pb-24">
        <div className="mx-auto grid max-w-[1120px] gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.slug}
              href={`/features/${f.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:bg-surface-2/70"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                  {f.eyebrow}
                </span>
                <ArrowUpRight className="size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{f.title}</h2>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">
                {f.summary}
              </p>
              <p className="mt-6 font-mono text-[12px] text-muted-2">
                {f.metric.value}{" "}
                <span className="text-muted">· {f.metric.label}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
