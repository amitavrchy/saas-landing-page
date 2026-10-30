import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s · Docs",
    default: "Docs",
  },
  description:
    "Orbit documentation — getting started, cycles, AI triage, and API.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
