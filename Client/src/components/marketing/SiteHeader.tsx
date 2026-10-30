"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileNavOpen, toggleMobileNav } from "@/features/ui/uiSlice";

const NAV = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers", label: "Customers" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
  { href: "/docs", label: "Docs" },
];

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 font-semibold tracking-tight", className)}
    >
      <span className="relative flex size-7 items-center justify-center rounded-lg bg-accent/20 ring-1 ring-accent/40">
        <span className="size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
      </span>
      <span className="text-[15px] text-text">Orbit</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const open = useAppSelector((s) => s.ui.mobileNavOpen);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-bg/65 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-text",
                pathname.startsWith(item.href) && "text-text",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            Start free
          </Link>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => dispatch(toggleMobileNav())}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => dispatch(setMobileNavOpen(false))}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                <Link
                  href="/login"
                  onClick={() => dispatch(setMobileNavOpen(false))}
                  className={cn(buttonVariants({ variant: "secondary", size: "md" }), "w-full")}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => dispatch(setMobileNavOpen(false))}
                  className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full")}
                >
                  Start free
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
