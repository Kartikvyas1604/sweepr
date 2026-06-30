"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-display uppercase tracking-wider transition-all duration-200",
          "disabled:opacity-40 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-live focus-visible:ring-offset-2 focus-visible:ring-offset-base",
          {
            primary:
              "bg-live text-base hover:bg-live/90 active:bg-live/80 shadow-lg shadow-live/20",
            secondary:
              "bg-ink/10 text-ink hover:bg-ink/20 active:bg-ink/15 border border-ink/10",
            ghost:
              "text-ink-muted hover:text-ink hover:bg-ink/5",
            outline:
              "border border-ink/20 text-ink hover:bg-ink/5 hover:border-ink/40",
          }[variant],
          {
            sm: "h-8 px-3 text-xs gap-1.5",
            md: "h-10 px-5 text-sm gap-2",
            lg: "h-12 px-8 text-base gap-2.5",
          }[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
