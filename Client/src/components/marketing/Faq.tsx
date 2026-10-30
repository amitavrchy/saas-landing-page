"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

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
  heading = "Frequently asked questions",
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
    <section className="section-pad border-t border-border/50" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHeading id="faq-heading" title={heading} />
        <div className="mx-auto max-w-2xl">
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
