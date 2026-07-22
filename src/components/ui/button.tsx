"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7FE8] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "btn-gsap-primary",
        primaryLight:
          "bg-[#D8D2FA] text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white shadow-soft-sm",
        accentPink:
          "btn-gsap-pink",
        mint:
          "btn-gsap-mint",
        outline:
          "btn-gsap-outline",
        ghost:
          "text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#D8D2FA]/30",
        link: "text-[#8B7FE8] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, ...props }, ref) => {
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef;

    // GSAP Spring Magnetic Hover Animation
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.4,
          ease: "elastic.out(1.2, 0.4)",
        });
      }
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
      if (onMouseLeave) onMouseLeave(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.15,
          ease: "power1.in",
        });
      }
      if (onMouseDown) onMouseDown(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(2)",
        });
      }
      if (onMouseUp) onMouseUp(e);
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={buttonRef as unknown as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size, className }))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
