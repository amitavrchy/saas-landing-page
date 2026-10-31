import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { FinalCta } from "@/components/marketing/FinalCta";
import { features, getFeature } from "@/content/features";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return {
    title: feature.title,
    description: feature.summary,
  };
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const others = features.filter((f) => f.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="relative overflow-hidden hero-aurora">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
        <div className="page-container relative pt-16 pb-8 sm:pt-24">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted hover:text-text"
          >
            <ArrowLeft className="size-3.5" />
            All features
          </Link>

          <p className="mt-8 text-[14px] font-medium uppercase tracking-[0.14em] text-accent">
            {feature.eyebrow} · {feature.title}
          </p>
          <h1 className="display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
            {feature.promise}
          </h1>
          <p className="lead mt-5 max-w-2xl">{feature.summary}</p>

          <div className="mt-10 inline-flex items-baseline gap-3 rounded-2xl border border-border bg-surface/80 px-5 py-4 glass">
            <span className="font-mono text-3xl tracking-tight text-text">
              {feature.metric.value}
            </span>
            <span className="text-[14px] text-muted">{feature.metric.label}</span>
          </div>
        </div>
      </article>

      <section className="pb-20">
        <div className="page-container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {feature.body.map((para) => (
              <p key={para.slice(0, 24)} className="text-[16px] leading-relaxed text-muted">
                <span className="text-text">{para}</span>
              </p>
            ))}
            <Link
              href="/signup"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-4")}
            >
              Start free with {feature.title}
            </Link>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
            <p className="text-[14px] font-medium text-text">What you get</p>
            <ul className="mt-4 space-y-3">
              {feature.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[14px] text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-text/90">{b}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="page-container mt-20">
          <p className="mb-6 text-[14px] font-medium text-muted">Keep exploring</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {others.map((f) => (
              <Link
                key={f.slug}
                href={`/features/${f.slug}`}
                className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/35"
              >
                <p className="text-[14px] uppercase tracking-wider text-accent">
                  {f.eyebrow}
                </p>
                <p className="mt-1 font-medium">{f.title}</p>
                <p className="mt-1 line-clamp-2 text-[14px] text-muted">{f.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
