import { Hero } from "@/components/marketing/Hero";
import { LogoCloud } from "@/components/marketing/LogoCloud";
import { ScrollStory } from "@/components/marketing/ScrollStory";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { InteractiveDemo } from "@/components/marketing/InteractiveDemo";
import { PricingTeaser } from "@/components/marketing/PricingTeaser";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <ScrollStory />
      <FeatureGrid />
      <InteractiveDemo />
      <PricingTeaser />
      <Faq />
      <FinalCta />
    </>
  );
}
