import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { changelog } from "@/content/changelog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What’s new in Orbit — releases, improvements, and fixes.",
};

const tagStyle = {
  New: "bg-accent/15 text-accent-bright",
  Improved: "bg-cyan/10 text-cyan",
  Fix: "bg-surface-3 text-muted",
} as const;

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="What shipped"
        description="Every release that makes Orbit calmer, faster, or more honest about your roadmap."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-[720px] px-6">
          <ol className="relative space-y-0 border-l border-border">
            {changelog.map((entry) => (
              <li key={entry.version} className="relative pb-12 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent ring-4 ring-bg" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[13px] text-accent">{entry.version}</span>
                  <span className="text-[12px] text-muted-2">{entry.date}</span>
                  {entry.tags.map((t) => (
                    <span
                      key={t}
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                        tagStyle[t],
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-tight">
                  {entry.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {entry.body.map((line) => (
                    <li
                      key={line.slice(0, 40)}
                      className="text-[14px] leading-relaxed text-muted before:mr-2 before:text-border-strong before:content-['—']"
                    >
                      <span className="text-text/85">{line}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
