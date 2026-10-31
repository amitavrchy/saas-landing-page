import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-[#203017] hover:bg-accent-bright shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
        secondary:
          "bg-surface-2/90 text-text border border-border hover:bg-surface-3 hover:border-border-strong",
        ghost: "text-muted hover:text-text hover:bg-surface-2",
        outline:
          "border border-border text-text hover:bg-surface-2 hover:border-border-strong",
      },
      size: {
        sm: "h-8 px-3 text-[14px] rounded-lg",
        md: "h-10 px-4 text-sm rounded-lg",
        lg: "h-12 px-6 text-[15px] rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
