import type { Metadata } from "next";
import { PricingCards } from "@/components/marketing/PricingCards";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Orbit pricing for solo PMs, product teams, and orgs. Annual saves 20%.",
};

const PRICING_FAQS = [
  {
    q: "How does seat billing work?",
    a: "You pay per active member of a workspace. Guests with comment-only access are free. Annual plans are billed upfront at −20%.",
  },
  {
    q: "Can we switch plans later?",
    a: "Yes. Upgrades are prorated instantly. Downgrades take effect at the next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Starter and Team include a 14-day Team trial with AI triage. No card required for the free plan.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cards via Stripe for self-serve. Enterprise can invoice via ACH / wire with net-30.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple plans for how product teams ship"
        description="Named for your ICP — solo PMs, product teams, and orgs. Transparent seat math. No surprise add-ons."
      />

      <section className="pb-16">
        <div className="mx-auto max-w-[1120px] px-6">
          <PricingCards />
        </div>
      </section>

      <Faq items={PRICING_FAQS} heading="Pricing FAQ" />
      <FinalCta />
    </>
  );
}
