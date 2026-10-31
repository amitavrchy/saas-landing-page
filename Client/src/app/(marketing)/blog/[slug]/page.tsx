import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FinalCta } from "@/components/marketing/FinalCta";
import { blogPosts, getPost } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="relative overflow-hidden hero-aurora">
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-25" />
        <div className="relative mx-auto max-w-[720px] px-6 pt-16 pb-10 sm:pt-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted hover:text-text"
          >
            <ArrowLeft className="size-3.5" />
            Blog
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-surface px-2 py-0.5 text-[14px] text-muted ring-1 ring-border"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="display mt-5 text-[clamp(1.85rem,4vw,2.75rem)]">
            {post.title}
          </h1>
          <p className="mt-5 text-[14px] text-muted">
            {post.authorName} · {post.publishedAt} · {post.readingMinutes} min
            read
          </p>
        </div>
      </article>

      <div className="mx-auto max-w-[720px] space-y-5 px-6 pb-20">
        {post.body.map((para) => (
          <p key={para.slice(0, 40)} className="text-[16px] leading-[1.75] text-muted">
            <span className="text-text/92">{para}</span>
          </p>
        ))}
      </div>

      <FinalCta />
    </>
  );
}
