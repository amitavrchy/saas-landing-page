"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "@/lib/api";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/changelog", label: "Changelog" },
      { href: "/docs", label: "Docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/customers", label: "Customers" },
      { href: "/blog", label: "Blog" },
      { href: "/#", label: "Careers" },
      { href: "/#", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/#", label: "Privacy" },
      { href: "/#", label: "Terms" },
      { href: "/#", label: "Security" },
    ],
  },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const mutation = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: () => {
      setDone(true);
      setEmail("");
    },
  });

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-semibold">
              <span className="relative flex size-7 items-center justify-center rounded-lg bg-accent/20 ring-1 ring-accent/40">
                <span className="size-2.5 rounded-full bg-accent" />
              </span>
              <span>Orbit</span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              AI-assisted project ops for product teams who ship. Plan cycles,
              triage issues, and keep the roadmap honest.
            </p>

            <form
              className="mt-6 flex max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                mutation.mutate(email);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email for newsletter
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="h-10 flex-1 rounded-lg border border-border bg-surface px-3 text-sm text-text placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button type="submit" size="sm" disabled={mutation.isPending}>
                {done ? "Joined" : "Subscribe"}
              </Button>
            </form>
            {mutation.isError && (
              <p className="mt-2 text-xs text-danger">
                Couldn&apos;t subscribe — try again later.
              </p>
            )}
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium text-text">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-[12px] text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Orbit Labs. All rights reserved.</p>
          <p className="font-mono">Ship the roadmap without the chaos.</p>
        </div>
      </div>
    </footer>
  );
}
