import { cn } from "@/lib/utils";

export function OrbitLogo({
  className,
  markOnly = false,
}: {
  className?: string;
  markOnly?: boolean;
}) {
  return (
    <span className={cn("orbit-logo", className)}>
      <span className="orbit-mark" aria-hidden="true">
        <span />
      </span>
      {!markOnly && (
        <span>
          orbit<span className="orbit-logo-period">.</span>
        </span>
      )}
    </span>
  );
}
