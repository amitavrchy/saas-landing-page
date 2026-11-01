import { ArrowUpRight, Hash, Layers2, Webhook } from "lucide-react";
import Link from "next/link";
import { GitHubMark as Github } from "./GitHubMark";
const INTEGRATIONS = [
  { name: "GitHub", icon: Github },
  { name: "Slack", icon: Hash },
  { name: "Linear", icon: Layers2 },
  { name: "Webhooks", icon: Webhook },
];
export function LogoCloud() {
  return (
    <section className="integrations-strip" aria-label="Integrations">
      <div className="page-container integration-inner">
        <p>
          Fits right into
          <br />
          <strong>your kind of workflow.</strong>
        </p>
        <div className="integration-wordmarks">
          {INTEGRATIONS.map((item) => (
            <span key={item.name}>
              <item.icon size={24} strokeWidth={1.6} />
              {item.name}
            </span>
          ))}
        </div>
        <Link href="/features/integrations">
          Explore integrations <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
