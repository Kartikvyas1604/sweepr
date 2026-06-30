"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

function CountdownTimer({
  targetDate,
  className,
  label,
  size = "md",
}: CountdownTimerProps) {
  const countdown = useCountdown(targetDate);

  const unitClass = {
    sm: "font-mono text-[10px] tabular-nums",
    md: "font-mono text-sm tabular-nums",
    lg: "font-display text-2xl tabular-nums tracking-tight",
  }[size];

  const labelClass = {
    sm: "font-mono text-[8px] uppercase tracking-widest text-chalk-muted/40",
    md: "font-mono text-[9px] uppercase tracking-widest text-chalk-muted/40",
    lg: "font-mono text-[10px] uppercase tracking-widest text-chalk-muted/40",
  }[size];

  if (countdown.isExpired) {
    return (
      <span
        className={cn(
          "font-mono text-xs uppercase tracking-wider text-flare",
          className,
        )}
      >
        Expired
      </span>
    );
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {label && <span className={labelClass}>{label}</span>}
      <div className="flex items-center gap-0.5">
        {countdown.days > 0 && (
          <>
            <span className={unitClass}>{countdown.days}</span>
            <span className={cn(labelClass, "mx-0.5")}>d</span>
          </>
        )}
        <span className={unitClass}>
          {String(countdown.hours).padStart(2, "0")}
        </span>
        <span className={cn(unitClass, "text-chalk-muted/30")}>:</span>
        <span className={unitClass}>
          {String(countdown.minutes).padStart(2, "0")}
        </span>
        <span className={cn(unitClass, "text-chalk-muted/30")}>:</span>
        <span className={unitClass}>
          {String(countdown.seconds).padStart(2, "0")}
        </span>
        {!label && (
          <span className={cn(labelClass, "ml-1")}>left</span>
        )}
      </div>
    </div>
  );
}

export { CountdownTimer };
