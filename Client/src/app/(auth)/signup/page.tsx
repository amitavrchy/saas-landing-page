import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-8">
        <Link href="/" className="flex items-center justify-center gap-2 font-semibold">
          <span className="relative flex size-7 items-center justify-center rounded-lg bg-accent/20 ring-1 ring-accent/40">
            <span className="size-2.5 rounded-full bg-accent" />
          </span>
          Orbit
        </Link>
        <h1 className="mt-6 text-center text-xl font-semibold">Start free</h1>
        <p className="mt-2 text-center text-[13px] text-muted">
          Creates your user, workspace, and membership once the API is live.
        </p>
        <form className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="text-[13px] font-medium">
              Name
            </label>
            <input
              id="name"
              className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Alex Kim"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-[13px] font-medium">
              Work email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-[13px] font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
          >
            Create workspace
          </button>
        </form>
        <p className="mt-6 text-center text-[13px] text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-text hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
