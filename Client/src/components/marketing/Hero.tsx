import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  GitMerge,
  Play,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CycleBoardMock } from "@/components/product-mock/CycleBoardMock";
import { OrbitLogo } from "./OrbitLogo";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="orbit-hero" aria-labelledby="hero-heading">
      <div className="page-container">
        <div className="hero-layout">
          <div className="hero-copy">
            <Link href="/changelog" className="release-link">
              <span>NEW IN ORBIT 2.0</span> Meet your AI copilot{" "}
              <ArrowRight size={13} />
            </Link>
            <h1 id="hero-heading">
              Less chaos.
              <br />
              <span>More shipping.</span>
            </h1>
            <p>
              Your best work deserves a better workspace. Bring your projects,
              people, and priorities into one clear orbit.
            </p>
            <div className="hero-actions">
              <Link
                href="/signup"
                className={cn(buttonVariants({ size: "lg" }), "hero-primary")}
              >
                Get started for free <ArrowRight size={18} />
              </Link>
              <Link href="#demo" className="demo-link">
                <span>
                  <Play size={14} fill="currentColor" />
                </span>{" "}
                See it in action
              </Link>
            </div>
            <div className="hero-footnote">
              <span>
                <Check size={12} /> Free for up to 3 people
              </span>
              <span>
                <Check size={12} /> No credit card needed
              </span>
            </div>
          </div>
          <div className="orbital-scene" aria-hidden="true">
            <div className="orbital-grid" />
            <div className="orbital-ring ring-one" />
            <div className="orbital-ring ring-two" />
            <div className="orbital-ring ring-three" />
            <div className="orbital-core">
              <OrbitLogo markOnly />
            </div>
            <div className="orbit-node node-plan">
              <span className="node-icon">
                <Sparkles size={20} />
              </span>
              <div>
                <small>A LITTLE LESS BUSYWORK</small>
                <strong>A lot more possibility.</strong>
              </div>
            </div>
            <div className="orbit-node node-ship">
              <span className="node-icon">
                <GitMerge size={20} />
              </span>
              <div>
                <strong>Big ideas, shipped.</strong>
                <small>Everything moving together</small>
              </div>
              <span className="node-check">
                <Check size={12} />
              </span>
            </div>
            <span className="orbital-dot dot-one" />
            <span className="orbital-dot dot-two" />
            <span className="orbital-star">+</span>
            <span className="scene-caption">
              GOOD WORK HAS A GRAVITATIONAL PULL.
            </span>
          </div>
        </div>
        <div className="product-stage">
          <div className="product-caption">
            <span>
              <span className="status-dot" /> YOUR NEXT BIG THING STARTS HERE
            </span>
            <span>
              EXPLORE THE WORKSPACE <ArrowDown size={12} />
            </span>
          </div>
          <CycleBoardMock />
          <div className="preview-footnote">
            <span>One workspace. Every moving part.</span>
            <span>
              Interactive product preview <span className="status-dot" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
