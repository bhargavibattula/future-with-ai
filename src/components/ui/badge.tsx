import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]",
  {
    variants: {
      variant: {
        default:
          "bg-[#F3F0FE] text-[#8B7FE8] border border-[#D8D2FA]",
        primary:
          "bg-[#8B7FE8] text-white shadow-soft-sm",
        mint:
          "bg-[#B8E8D8] text-[#1E1B2E] border border-[#B8E8D8]",
        pink:
          "bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFC9DE]",
        outline:
          "border border-[#EAE6FE] bg-white text-[#1E1B2E]",
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
