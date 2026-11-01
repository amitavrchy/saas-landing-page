import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-[14px] font-medium uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="display text-[clamp(1.65rem,3.2vw,2.35rem)] text-text"
      >
        {title}
      </h2>
      {description && <p className="lead mt-4">{description}</p>}
    </div>
  );
}
