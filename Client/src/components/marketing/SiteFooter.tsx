"use client";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api";
import { OrbitLogo } from "./OrbitLogo";
const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Overview" },
      { href: "/features/ai-triage", label: "Orbit AI" },
      { href: "/features/integrations", label: "Integrations" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/customers", label: "Customer stories" },
      { href: "/blog", label: "The Orbit blog" },
      { href: "/changelog", label: "What's new" },
      { href: "/#demo", label: "Try the sandbox" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs/get-started/quickstart", label: "Getting started" },
      { href: "/login", label: "Your workspace" },
      { href: "/signup", label: "Join Orbit" },
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
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Orbit home">
              <OrbitLogo />
            </Link>
            <p>
              A calmer workspace.
              <br />
              For teams going places.
            </p>
            <form
              className="footer-newsletter"
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) mutation.mutate(email.trim());
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email for newsletter
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Good things in your inbox. Your email?"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setDone(false);
                }}
                autoComplete="email"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : done ? (
                  <Check size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </form>
            <div aria-live="polite">
              {done && (
                <p className="newsletter-status">
                  You&apos;re in. A little more Orbit, coming your way.
                </p>
              )}
              {mutation.isError && (
                <p className="newsletter-status newsletter-error">
                  Couldn&apos;t subscribe. Please try again later.
                </p>
              )}
            </div>
          </div>
          {COLUMNS.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          orbit<span>.</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Orbit. Made for the work ahead.
          </span>
          <span>
            <span className="status-dot" /> Less chaos. More shipping.
          </span>
        </div>
      </div>
    </footer>
  );
}
