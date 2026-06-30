"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="font-mono text-[11px] uppercase tracking-widest text-chalk-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={cn(
            "h-10 w-full rounded-md border border-surface-border bg-pitch-light/50 px-3.5 py-2",
            "font-mono text-sm text-chalk placeholder:text-chalk-muted/40",
            "transition-colors duration-200",
            "focus:outline-none focus:border-flare/50 focus:ring-1 focus:ring-flare/20",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
