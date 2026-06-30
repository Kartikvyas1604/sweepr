import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "flare" | "goalnet" | "escrow" | "success";
  size?: "sm" | "md";
}

function Badge({
  className,
  variant = "default",
  size = "sm",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono font-medium tracking-wider uppercase",
        {
          sm: "h-5 px-2 text-[10px]",
          md: "h-6 px-2.5 text-[11px]",
        }[size],
        {
          default: "bg-chalk/8 text-chalk-muted border border-chalk/10",
          flare: "bg-flare/15 text-flare border border-flare/20",
          goalnet: "bg-goalnet/15 text-goalnet border border-goalnet/20",
          escrow: "bg-escrow/15 text-escrow border border-escrow/20",
          success: "bg-success/15 text-success border border-success/20",
        }[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
export type { BadgeProps };
