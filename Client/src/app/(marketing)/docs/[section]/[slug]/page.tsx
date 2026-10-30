import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { docSections, findDoc } from "@/content/docs";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return docSections.flatMap((section) =>
    section.items.map((item) => ({
      section: section.slug,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const { item } = findDoc(section, slug);
  if (!item) return {};
  return { title: `${item.title} · Docs` };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section: sectionSlug, slug } = await params;
  const { section, item } = findDoc(sectionSlug, slug);
  if (!section || !item) notFound();

  return (
    <div className="mx-auto flex max-w-[1120px] gap-10 px-6 py-12 lg:py-16">
      <aside className="hidden w-56 shrink-0 lg:block">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-2">
          Documentation
        </p>
        <nav className="space-y-6" aria-label="Docs">
          {docSections.map((s) => (
            <div key={s.slug}>
              <p className="mb-2 text-[12px] font-medium text-text">{s.title}</p>
              <ul className="space-y-1">
                {s.items.map((i) => {
                  const href = `/docs/${s.slug}/${i.slug}`;
                  const active = s.slug === sectionSlug && i.slug === slug;
                  return (
                    <li key={i.slug}>
                      <Link
                        href={href}
                        className={cn(
                          "block rounded-lg px-2.5 py-1.5 text-[13px] transition-colors",
                          active
                            ? "bg-surface-2 text-text"
                            : "text-muted hover:text-text",
                        )}
                      >
                        {i.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <article className="min-w-0 flex-1">
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-accent">
          {section.title}
        </p>
        <h1 className="display mt-3 text-[clamp(1.75rem,3vw,2.5rem)]">
          {item.title}
        </h1>
        <div className="mt-8 space-y-4">
          {item.body.map((para) => (
            <p
              key={para.slice(0, 40)}
              className="text-[15px] leading-relaxed text-muted"
            >
              <span className="text-text/90">{para}</span>
            </p>
          ))}
        </div>

        {/* Mobile nav */}
        <div className="mt-14 border-t border-border pt-8 lg:hidden">
          <p className="mb-3 text-[12px] font-medium text-muted">More docs</p>
          <ul className="space-y-1">
            {docSections.flatMap((s) =>
              s.items.map((i) => (
                <li key={`${s.slug}-${i.slug}`}>
                  <Link
                    href={`/docs/${s.slug}/${i.slug}`}
                    className="text-[13px] text-muted hover:text-text"
                  >
                    {s.title}: {i.title}
                  </Link>
                </li>
              )),
            )}
          </ul>
        </div>
      </article>
    </div>
  );
}
