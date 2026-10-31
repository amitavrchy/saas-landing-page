import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Hash,
  Layers2,
  Sparkles,
  Webhook,
  Zap,
} from "lucide-react";
import { OrbitLogo } from "./OrbitLogo";
import { GitHubMark as Github } from "./GitHubMark";

export function FeatureGrid() {
  return (
    <section
      className="platform-section section-pad"
      aria-labelledby="features-heading"
    >
      <div className="page-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span /> LESS FRICTION. MORE FORWARD.
          </span>
          <span className="section-index">02 / THE LITTLE SUPERPOWERS</span>
        </div>
        <div className="feature-heading-row">
          <h2 id="features-heading" className="section-display">
            Your focus.
            <br />
            <span>With superpowers.</span>
          </h2>
          <p className="section-description">
            Thoughtful tools that get out of the way.
            <br />
            So your best work can take center stage.
          </p>
        </div>
        <div className="feature-bento">
          <Link href="/features/ai-triage" className="bento-card bento-ai">
            <div className="bento-heading">
              <span>
                <Sparkles size={16} /> YOUR AI COPILOT
              </span>
              <ArrowUpRight size={18} />
            </div>
            <h3>
              A head start on
              <br />
              the work that matters.
            </h3>
            <p>
              Turn incoming noise into clear priorities.
              <br />
              AI suggests. You stay in control.
            </p>
            <div className="ai-preview">
              <div className="ai-input">
                <span className="person-avatar avatar-lavender">MR</span>
                <span>
                  Login crashes on mobile after update
                  <small>New issue · just now</small>
                </span>
              </div>
              <div className="ai-connection">
                <span />
                <Sparkles size={12} />
                <span />
              </div>
              <div className="ai-output">
                <div>
                  <Sparkles size={14} />
                  <strong>A little clarity, instantly.</strong>
                  <span className="ai-ready">READY</span>
                </div>
                <p>Suggested priority and team</p>
                <div className="ai-tags">
                  <span>
                    <i /> High priority
                  </span>
                  <span>Engineering</span>
                  <span>
                    <Check size={10} /> Ready to review
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="/features/automations"
            className="bento-card bento-automation"
          >
            <div className="bento-heading">
              <span>
                <Zap size={16} /> QUIETLY ON AUTOPILOT
              </span>
              <ArrowUpRight size={18} />
            </div>
            <h3>
              The busywork?
              <br />
              Consider it handled.
            </h3>
            <p>
              Keep work moving with automations.
              <br />
              Less clicking. More creating.
            </p>
            <div className="automation-flow">
              <div>
                <span className="automation-icon">
                  <Github size={16} />
                </span>
                <span>
                  Pull request merged<small>When something good happens</small>
                </span>
                <span className="flow-check">
                  <Check size={12} />
                </span>
              </div>
              <ArrowDown size={17} />
              <div>
                <span className="automation-icon mint">
                  <Check size={16} />
                </span>
                <span>
                  Move issue to Done<small>Orbit takes it from here</small>
                </span>
                <Zap size={12} />
              </div>
            </div>
          </Link>
          <Link
            href="/features/integrations"
            className="bento-card bento-integrations"
          >
            <div>
              <div className="bento-heading">
                <span>
                  <Layers2 size={16} /> BETTER, TOGETHER
                </span>
              </div>
              <h3>
                All your tools.
                <br />
                One happy orbit.
              </h3>
              <p>
                GitHub, Slack, and your favorite tools.
                <br />
                Connected to the way you already work.
              </p>
              <span className="text-link">
                Meet your integrations <ArrowRight size={14} />
              </span>
            </div>
            <div className="integration-diagram" aria-hidden="true">
              <span className="diagram-ring" />
              <span className="diagram-center">
                <OrbitLogo markOnly />
              </span>
              <span className="diagram-node diagram-github">
                <Github size={27} />
              </span>
              <span className="diagram-node diagram-slack">
                <Hash size={27} />
              </span>
              <span className="diagram-node diagram-linear">
                <Layers2 size={26} />
              </span>
              <span className="diagram-node diagram-webhook">
                <Webhook size={27} />
              </span>
              <span className="diagram-line horizontal" />
              <span className="diagram-line vertical" />
            </div>
            <ArrowUpRight className="bento-corner-arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
