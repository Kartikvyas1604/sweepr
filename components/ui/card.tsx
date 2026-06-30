import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
}

function Card({
  className,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-panel/80 backdrop-blur-sm",
        {
          default: "border border-hairline",
          bordered: "border-2 border-ink/10",
          elevated:
            "border border-hairline shadow-lg shadow-black/20",
        }[variant],
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-3 px-5 py-4 border-b border-hairline", className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 py-4", className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-4 border-t border-hairline",
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardFooter };
export type { CardProps };
