import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/providers/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Orbit — Ship the roadmap without the chaos",
    template: "%s · Orbit",
  },
  description:
    "AI-assisted project ops for product teams. Cycles, issues, and triage that keep shipping honest.",
  openGraph: {
    title: "Orbit — Ship the roadmap without the chaos",
    description:
      "AI-assisted project ops for product teams. Cycles, issues, and triage that keep shipping honest.",
    type: "website",
    siteName: "Orbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit — Ship the roadmap without the chaos",
    description:
      "AI-assisted project ops for product teams. Cycles, issues, and triage that keep shipping honest.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
