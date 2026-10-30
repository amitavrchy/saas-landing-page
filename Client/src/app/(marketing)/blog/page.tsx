import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Product thinking and shipping notes from the Orbit team.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on shipping without chaos"
        description="Cycles, AI triage, migrations, and the culture of calm product orgs."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-[1120px] px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/40 sm:p-10"
          >
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 className="display mt-4 max-w-2xl text-[clamp(1.5rem,3vw,2.25rem)] transition-colors group-hover:text-white">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-muted">{featured.excerpt}</p>
            <p className="mt-6 text-[13px] text-muted-2">
              {featured.authorName} · {featured.publishedAt} ·{" "}
              {featured.readingMinutes} min read
            </p>
          </Link>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/35"
              >
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-bg px-1.5 py-0.5 text-[10px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-[16px] font-semibold leading-snug tracking-tight group-hover:text-white">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] text-muted">{post.excerpt}</p>
                <p className="mt-4 text-[12px] text-muted-2">
                  {post.publishedAt} · {post.readingMinutes} min
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
