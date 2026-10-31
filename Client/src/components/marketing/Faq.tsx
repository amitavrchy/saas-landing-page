"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FAQS = [
  {
    q: "Who is Orbit built for?",
    a: "Product managers, eng leads, and founders at 5–200 person product orgs who need cycles and issues without enterprise ceremony.",
  },
  {
    q: "Can we import from Linear or Jira?",
    a: "Yes. CSV and Linear API import ship in every plan. Jira Cloud import is available on Team and Enterprise.",
  },
  {
    q: "How does AI triage work?",
    a: "Orbit reads inbound issue text, labels urgency and area, and suggests assignees from your recent cycle patterns. You always approve before it mutates data.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — free forever for up to 3 seats with unlimited issues and 1 active cycle. No credit card required.",
  },
  {
    q: "Where is data hosted?",
    a: "US and EU regions. Enterprise customers can request dedicated VPC and custom DPA. We never train models on your workspace content.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Annual billing saves 20% on Starter and Team. See the pricing page for the toggle and seat math.",
  },
];

export function Faq({
  items = FAQS,
  heading = "A few things, cleared up.",
}: {
  items?: { q: string; a: string }[];
  heading?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="faq-section section-pad" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="page-container faq-layout">
        <div className="faq-copy">
          <span className="eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</span>
          <h2 id="faq-heading" className="section-display">
            {heading}
          </h2>
          <p>
            A little clarity before your next big move. Here are the things
            teams ask us.
          </p>
          <Link href="/docs" className="text-link">
            Find more in our docs <ArrowRight size={13} />
          </Link>
        </div>
        <div className="faq-list">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
