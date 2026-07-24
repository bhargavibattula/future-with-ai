import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--border)]",
        primary:
          "bg-[var(--primary)] text-white shadow-soft-sm",
        mint:
          "bg-[var(--mint-soft)] text-[var(--mint)] border border-[var(--border)]",
        pink:
          "bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--border)]",
        outline:
          "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
