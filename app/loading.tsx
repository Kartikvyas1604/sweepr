"use client";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-1 font-mono text-xs uppercase tracking-widest text-ink-muted/40">
          <span
            className="animate-pulse"
            style={{ animationDelay: "0ms", animationDuration: "1.5s" }}
          >
            L
          </span>
          <span
            className="animate-pulse"
            style={{ animationDelay: "100ms", animationDuration: "1.5s" }}
          >
            O
          </span>
          <span
            className="animate-pulse"
            style={{ animationDelay: "200ms", animationDuration: "1.5s" }}
          >
            A
          </span>
          <span
            className="animate-pulse"
            style={{ animationDelay: "300ms", animationDuration: "1.5s" }}
          >
            D
          </span>
          <span
            className="animate-pulse"
            style={{ animationDelay: "400ms", animationDuration: "1.5s" }}
          >
            I
          </span>
          <span
            className="animate-pulse"
            style={{ animationDelay: "500ms", animationDuration: "1.5s" }}
          >
            N
          </span>
          <span
            className="animate-pulse"
            style={{ animationDelay: "600ms", animationDuration: "1.5s" }}
          >
            G
          </span>
        </div>
      </div>
    </div>
  );
}
