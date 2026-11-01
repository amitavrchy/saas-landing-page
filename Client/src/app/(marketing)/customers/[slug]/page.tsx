import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FinalCta } from "@/components/marketing/FinalCta";
import { customers, getCustomer } from "@/content/customers";

export function generateStaticParams() {
  return customers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCustomer(slug);
  if (!c) return {};
  return {
    title: `${c.company} · Customer story`,
    description: c.quote,
  };
}

export default async function CustomerStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCustomer(slug);
  if (!c) notFound();

  return (
    <>
      <article className="relative overflow-hidden hero-aurora">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
        <div className="relative mx-auto max-w-[800px] px-6 pt-16 pb-12 sm:pt-24">
          <Link
            href="/customers"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted hover:text-text"
          >
            <ArrowLeft className="size-3.5" />
            All customers
          </Link>

          <p className="mt-8 text-[14px] font-medium uppercase tracking-[0.14em] text-accent">
            {c.industry} · {c.size}
          </p>
          <h1 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">{c.company}</h1>
          <blockquote className="mt-8 border-l-2 border-accent/50 pl-5 text-[clamp(1.15rem,2.5vw,1.4rem)] leading-snug text-text">
            “{c.quote}”
          </blockquote>
          <p className="mt-4 text-[14px] text-muted">
            {c.person}, {c.role}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-3">
            {c.results.map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-border bg-surface/80 px-4 py-4 text-center glass"
              >
                <p className="font-mono text-2xl tracking-tight">{r.value}</p>
                <p className="mt-1 text-[14px] text-muted">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="pb-20">
        <div className="mx-auto max-w-[800px] space-y-12 px-6">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
              Challenge
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-text">{c.challenge}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
              Solution
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-text">{c.solution}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
              Story
            </h2>
            <div className="mt-3 space-y-4">
              {c.story.map((p) => (
                <p key={p.slice(0, 32)} className="text-[16px] leading-relaxed text-muted">
                  <span className="text-text/95">{p}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
