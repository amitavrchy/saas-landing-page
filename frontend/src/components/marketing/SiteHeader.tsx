"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { OrbitLogo } from "./OrbitLogo";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileNavOpen, toggleMobileNav } from "@/features/ui/uiSlice";

const NAV = [
  { href: "/features", label: "Product" },
  { href: "/customers", label: "Customers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Resources" },
  { href: "/changelog", label: "Changelog" },
];
export function SiteHeader() {
  const pathname = usePathname();
  const open = useAppSelector((state) => state.ui.mobileNavOpen);
  const dispatch = useAppDispatch();
  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <Link
          href="/"
          aria-label="Orbit home"
          onClick={() => dispatch(setMobileNavOpen(false))}
        >
          <OrbitLogo />
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className={cn(pathname.startsWith(item.href) && "current")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/login" className="header-login">
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants({ size: "sm" })}>
            Get started <ArrowRight size={13} />
          </Link>
        </div>
        <button
          type="button"
          className="mobile-menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => dispatch(toggleMobileNav())}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile"
          >
            {[
              ...NAV,
              { href: "/docs", label: "Documentation" },
              { href: "/login", label: "Log in" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => dispatch(setMobileNavOpen(false))}
              >
                {item.label}
                <ArrowRight size={14} />
              </Link>
            ))}
            <Link
              href="/signup"
              className={buttonVariants({ size: "lg" })}
              onClick={() => dispatch(setMobileNavOpen(false))}
            >
              Get started for free <ArrowRight size={15} />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
