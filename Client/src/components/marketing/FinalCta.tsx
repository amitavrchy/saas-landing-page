import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OrbitLogo } from "./OrbitLogo";
export function FinalCta() {
  return (
    <section className="final-cta-section" aria-labelledby="final-cta-heading">
      <div className="page-container">
        <div className="final-cta">
          <div className="cta-orbits" aria-hidden="true">
            <i />
            <i />
            <i />
            <OrbitLogo markOnly />
          </div>
          <div className="final-cta-copy">
            <span className="eyebrow">MAKE ROOM FOR YOUR BEST WORK.</span>
            <h2 id="final-cta-heading">
              Big things start
              <br />
              with a little orbit.
            </h2>
            <p>Your team. Your next chapter. All in one place.</p>
            <Link href="/signup" className="cta-dark-button">
              Find your flow. Start free. <ArrowRight size={17} />
            </Link>
            <span className="cta-note">
              No credit card. No complicated setup. Just possibility.
            </span>
          </div>
          <span className="cta-bottom-label">LESS CHAOS. MORE SHIPPING. ↗</span>
        </div>
      </div>
    </section>
  );
}
