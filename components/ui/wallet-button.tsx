"use client";

import { motion } from "framer-motion";
import { cn, formatAddress } from "@/lib/utils";
import { useWallet } from "@/components/wallet-provider";
import { Wallet, CheckCircle2, LogOut } from "lucide-react";

interface WalletButtonProps {
  className?: string;
}

function WalletButton({ className }: WalletButtonProps) {
  const { connected, address, connect, disconnect } = useWallet();

  if (connected && address) {
    return (
      <button
        onClick={disconnect}
        className={cn(
          "group flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200",
          "border-success/20 bg-success/5 text-success hover:border-success/30 hover:bg-success/10",
          className,
        )}
      >
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <CheckCircle2 className="h-3.5 w-3.5" />
        </motion.span>
        <span>{formatAddress(address)}</span>
        <LogOut className="ml-0.5 h-3 w-3 text-success/40 transition-opacity group-hover:text-success/70" />
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200",
        "border-hairline text-ink-muted hover:border-ink-muted/30 hover:text-ink",
        className,
      )}
    >
      <Wallet className="h-3.5 w-3.5" />
      Connect
    </button>
  );
}

export { WalletButton };
