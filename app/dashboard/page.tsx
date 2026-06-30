"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TopNav } from "@/components/ui/top-nav";
import { WalletButton } from "@/components/ui/wallet-button";
import { useWallet } from "@/components/wallet-provider";
import {
  getPoolsForUser,
  getParticipantInPool,
} from "@/lib/store";
import type { Pool } from "@/lib/types";
import {
  Plus,
  Trophy,
  Users,
  Clock,
  CheckCircle2,
  Wallet,
  TrendingUp,
  Medal,
  EyeOff,
} from "lucide-react";

interface PoolCardProps {
  pool: Pool;
  userAddress: string;
  isPast: boolean;
  index: number;
  onClick: () => void;
}

function PoolCard({ pool, userAddress, isPast, index, onClick }: PoolCardProps) {
  const participant = getParticipantInPool(pool.id, userAddress);
  const isWinner =
    isPast &&
    participant &&
    pool.winnerAddresses?.includes(userAddress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: "easeOut" }}
    >
      <Card
        className="cursor-pointer transition-all duration-200 hover:bg-elevated/20"
        onClick={onClick}
      >
        <CardContent className="flex items-center gap-4 py-4">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-elevated/50">
            <span className="text-xl">{participant?.team.flag ?? "🏳️"}</span>
            {isWinner && (
              <motion.div
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-money"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <Trophy className="h-3 w-3 text-base" />
              </motion.div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2">
              <span className="truncate font-body text-sm font-medium text-ink">
                {pool.name}
              </span>
              {isPast ? (
                <Badge variant="elevated" size="sm">Settled</Badge>
              ) : (
                <Badge variant="live" size="sm">Active</Badge>
              )}
              {pool.isPrivate && (
                <EyeOff className="h-3 w-3 shrink-0 text-ink-muted/40" />
              )}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-[11px] text-ink-muted/60">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {pool.participantCount}
              </span>
              <span>{pool.totalPot} USDC pot</span>
              <span>{pool.entryFee} USDC entry</span>
              {participant && (
                <span className="flex items-center gap-1 text-ink-muted/40">
                  <Medal className="h-3 w-3" />
                  #{participant.rank}
                </span>
              )}
            </div>
          </div>

          {isWinner && (
            <div className="flex shrink-0 flex-col items-center gap-0.5">
              <span className="font-display text-lg text-money">🏆</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-money">
                Winner
              </span>
            </div>
          )}

          {isPast && participant && !isWinner && (
            <div className="flex shrink-0 flex-col items-center gap-0.5">
              <span className="font-display text-lg text-ink-muted/60">
                #{participant.rank}
              </span>
              <span className="font-mono text-[10px] text-ink-muted/30">
                {participant.score} pts
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex flex-1 flex-col gap-1.5 rounded-lg border border-hairline bg-panel/60 px-4 py-3 backdrop-blur-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3" style={{ color }} />
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: `${color}99` }}>
          {label}
        </span>
      </div>
      <span
        className="font-display text-2xl tracking-tight"
        style={{ color }}
      >
        {value}
      </span>
    </motion.div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { connected, address } = useWallet();
  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    if (address) {
      setPools(getPoolsForUser(address));
    } else {
      setPools([]);
    }
  }, [address]);

  const { current, past, stats } = useMemo(() => {
    const current = pools.filter((p) => p.status !== "settled");
    const past = pools.filter((p) => p.status === "settled");
    const wins = past.filter((p) => p.winnerAddresses?.includes(address ?? ""));
    const bestRank = (() => {
      let best = Infinity;
      for (const p of pools) {
        const participant = getParticipantInPool(p.id, address ?? "");
        if (participant && participant.rank > 0 && participant.rank < best) {
          best = participant.rank;
        }
      }
      return best === Infinity ? "-" : `#${best}`;
    })();
    return {
      current,
      past,
      stats: { total: pools.length, active: current.length, wins: wins.length, bestRank },
    };
  }, [pools, address]);

  return (
    <div className="relative flex min-h-dvh flex-col">
      <TopNav
        title="Dashboard"
        right={<WalletButton />}
        onLogoClick={() => router.push("/")}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8">
        {!connected ? (
          <motion.div
            className="flex flex-1 flex-col items-center justify-center gap-6 py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-elevated/50">
              <Wallet className="h-8 w-8 text-ink-muted/40" />
            </div>
            <div className="text-center">
              <h2 className="font-display text-xl uppercase tracking-tight text-ink">
                Connect Your Wallet
              </h2>
              <p className="mt-2 font-body text-sm text-ink-muted">
                Connect to see your pools, track wins, and view past results.
              </p>
            </div>
            <WalletButton className="scale-110" />
          </motion.div>
        ) : pools.length === 0 ? (
          <>
            <div className="flex gap-3">
              {[
                { icon: Trophy, label: "Total Pools", value: 0, color: "#F4F1E8" },
                { icon: TrendingUp, label: "Active", value: 0, color: "#FF5A1F" },
                { icon: CheckCircle2, label: "Wins", value: 0, color: "#34D399" },
                { icon: Medal, label: "Best Finish", value: "-", color: "#F2C94C" },
              ].map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.1 + i * 0.06} />
              ))}
            </div>

            <motion.div
              className="flex flex-col items-center gap-4 py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Users className="h-10 w-10 text-ink-muted/20" />
              <p className="font-body text-sm text-ink-muted/40">
                You haven&apos;t joined any pools yet
              </p>
              <Button size="sm" onClick={() => router.push("/")}>
                <Plus className="h-4 w-4" />
                Create or join a pool
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <div className="flex gap-3">
              <StatCard
                icon={Trophy}
                label="Total Pools"
                value={stats.total}
                color="#F4F1E8"
                delay={0.08}
              />
              <StatCard
                icon={TrendingUp}
                label="Active"
                value={stats.active}
                color="#FF5A1F"
                delay={0.14}
              />
              <StatCard
                icon={CheckCircle2}
                label="Wins"
                value={stats.wins}
                color="#34D399"
                delay={0.2}
              />
              <StatCard
                icon={Medal}
                label="Best Finish"
                value={stats.bestRank}
                color="#F2C94C"
                delay={0.26}
              />
            </div>

            {current.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <div className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </div>
                  <h2 className="font-display text-sm uppercase tracking-wider text-ink">
                    Current Pools
                  </h2>
                  <span className="font-mono text-[11px] text-ink-muted/40">
                    {current.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {current.map((pool, i) => (
                    <PoolCard
                      key={pool.id}
                      pool={pool}
                      userAddress={address!}
                      isPast={false}
                      index={i}
                      onClick={() => router.push(`/pool/${pool.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-ink-muted/40" />
                  <h2 className="font-display text-sm uppercase tracking-wider text-ink-muted/80">
                    Past Pools
                  </h2>
                  <span className="font-mono text-[11px] text-ink-muted/40">
                    {past.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {past.map((pool, i) => (
                    <PoolCard
                      key={pool.id}
                      pool={pool}
                      userAddress={address!}
                      isPast={true}
                      index={i}
                      onClick={() => router.push(`/pool/${pool.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
