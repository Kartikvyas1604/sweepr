"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lock, Unlock, Timer, Coins } from "lucide-react";

interface EscrowStatusProps {
  totalPot: number;
  participantCount: number;
  entryFee: number;
  status: "locked" | "unlocked" | "settled";
  fee: number;
  className?: string;
}

function EscrowStatus({
  totalPot,
  participantCount,
  entryFee,
  status,
  fee,
  className,
}: EscrowStatusProps) {
  const feeAmount = totalPot * fee;

  return (
    <div
      className={cn(
        "rounded-lg border bg-surface px-4 py-3 backdrop-blur-sm",
        status === "settled"
          ? "border-success/20"
          : "border-surface-border",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {status === "locked" && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="h-4 w-4 text-escrow" />
            </motion.div>
          )}
          {status === "unlocked" && (
            <Unlock className="h-4 w-4 text-goalnet" />
          )}
          {status === "settled" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Coins className="h-4 w-4 text-success" />
            </motion.div>
          )}
          <span
            className={cn(
              "font-mono text-[11px] uppercase tracking-widest",
              status === "locked" && "text-escrow",
              status === "unlocked" && "text-goalnet",
              status === "settled" && "text-success",
            )}
          >
            Escrow {status}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs tabular-nums text-chalk">
          <span className="font-display text-lg tracking-tight">
            {totalPot.toLocaleString("en-US")}{" "}
            <span className="text-[10px] font-mono font-normal text-chalk-muted/40">
              USDC
            </span>
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-surface-border pt-2">
        <div className="flex items-center gap-3 font-mono text-[10px] text-chalk-muted/40">
          <span>
            {participantCount} × {entryFee} USDC
          </span>
          <span className="text-chalk-muted/20">|</span>
          <span>
            Fee: {feeAmount.toLocaleString("en-US")} USDC ({(fee * 100).toFixed(1)}%)
          </span>
        </div>
        {status === "locked" && (
          <div className="flex items-center gap-1 font-mono text-[10px] text-escrow">
            <Timer className="h-3 w-3" />
            Auto-settle after final match
          </div>
        )}
      </div>
    </div>
  );
}

export { EscrowStatus };
