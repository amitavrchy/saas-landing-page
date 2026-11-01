import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const TIERS = [
  {
    name: "Starter",
    audience: "For solo PMs & small crews",
    price: "$12",
    body: "The essentials for turning good ideas into shipped work.",
    perks: [
      "Unlimited issues",
      "Cycle planning & board views",
      "Slack & GitHub sync",
      "Up to 5 seats",
    ],
  },
  {
    name: "Team",
    audience: "For teams finding their momentum",
    price: "$29",
    body: "A shared space for ambitious teams, with a little extra intelligence.",
    featured: true,
    perks: [
      "Everything in Starter",
      "AI triage & suggestions",
      "Automations & digests",
      "Custom views & roadmaps",
    ],
  },
  {
    name: "Enterprise",
    audience: "For your next stage of growth",
    price: "Let's talk",
    body: "More control, thoughtful security, and support that knows your name.",
    perks: [
      "Everything in Team",
      "SSO / SAML",
      "Audit logs",
      "Dedicated success manager",
    ],
  },
];
export function PricingTeaser() {
  return (
    <section className="section-pad" aria-labelledby="pricing-teaser-heading">
      <div className="page-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span /> ROOM TO GROW
          </span>
          <span className="section-index">04 / SIMPLE BY DESIGN</span>
        </div>
        <div className="pricing-heading-row">
          <h2 id="pricing-teaser-heading" className="section-display">
            Small beginnings.
            <br />
            <span>Unlimited possibilities.</span>
          </h2>
          <p>
            Start free with up to 3 people.
            <br />
            Find your rhythm. Grow at your own pace.
          </p>
        </div>
        <div className="pricing-grid">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn("price-card", tier.featured && "featured")}
            >
              <h3 className="price-name">
                {tier.name}
                {tier.featured && <span>THE TEAM FAVORITE</span>}
              </h3>
              <p className="price-audience">{tier.audience}</p>
              <p className="price-number">
                {tier.price}
                {tier.name !== "Enterprise" && <span> / member / month</span>}
              </p>
              <p>{tier.body}</p>
              <Link
                href={tier.name === "Enterprise" ? "/pricing" : "/signup"}
                className={buttonVariants({
                  variant: tier.featured ? "primary" : "outline",
                })}
              >
                {tier.name === "Enterprise"
                  ? "Explore Enterprise"
                  : "Start your free trial"}
                <ArrowRight size={13} />
              </Link>
              <div className="price-divider" />
              <ul>
                {tier.perks.map((perk) => (
                  <li key={perk}>
                    <Check size={12} />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pricing-bottom">
          <span>Monthly pricing shown. Annual billing saves 20%.</span>
          <Link href="/pricing">
            All the details. No surprises. <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
