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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flare focus-visible:ring-offset-2 focus-visible:ring-offset-pitch",
          {
            primary:
              "bg-flare text-pitch hover:bg-flare/90 active:bg-flare/80 shadow-lg shadow-flare/20",
            secondary:
              "bg-chalk/10 text-chalk hover:bg-chalk/20 active:bg-chalk/15 border border-chalk/10",
            ghost:
              "text-chalk-muted hover:text-chalk hover:bg-chalk/5",
            outline:
              "border border-chalk/20 text-chalk hover:bg-chalk/5 hover:border-chalk/40",
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
