"use client";

import type { Pool, Participant } from "@/lib/types";
import { TEAMS } from "@/lib/types";

const POOLS_KEY = "sweepr_pools";
const PARTICIPANTS_KEY = "sweepr_participants";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function generatePassphrase(): string {
  const words = [
    "thunder", "crystal", "falcon", "shadow", "blaze",
    "ocean", "summit", "ember", "winter", "storm",
    "ridge", "valley", "horizon", "aurora", "phantom",
    "echo", "drift", "flux", "grove", "peak",
  ];
  const a = words[Math.floor(Math.random() * words.length)];
  const b = words[Math.floor(Math.random() * words.length)];
  const n = Math.floor(Math.random() * 99) + 10;
  return `${a}-${b}-${n}`;
}

export function getPools(): Pool[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(POOLS_KEY);
  if (!raw) return [];
  return JSON.parse(raw).map((p: Pool) => ({
    ...p,
    createdAt: new Date(p.createdAt),
    expiresAt: new Date(p.expiresAt),
  }));
}

export function getPool(id: string): Pool | undefined {
  return getPools().find((p) => p.id === id);
}

export function createPool(
  name: string,
  entryFee: number,
  isPrivate: boolean,
  passphrase?: string,
): Pool {
  const pools = getPools();
  const now = new Date();
  const pool: Pool = {
    id: generateId(),
    name,
    entryFee,
    totalPot: 0,
    escrowAddress: `Escrow${generateId()}`,
    status: "open",
    matchCount: 0,
    participantCount: 0,
    createdAt: now,
    expiresAt: new Date("2026-07-19"),
    isPrivate,
    passphrase: passphrase || generatePassphrase(),
  };
  localStorage.setItem(POOLS_KEY, JSON.stringify([pool, ...pools]));
  return pool;
}

function getParticipantsForPool(poolId: string): Participant[] {
  const raw = localStorage.getItem(`${PARTICIPANTS_KEY}_${poolId}`);
  if (!raw) return [];
  return JSON.parse(raw);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getPoolWithParticipants(poolId: string): {
  pool: Pool | undefined;
  participants: Participant[];
} {
  const pool = getPool(poolId);
  const participants = getParticipantsForPool(poolId);
  return { pool, participants };
}

export function settlePool(poolId: string): void {
  const pools = getPools();
  const index = pools.findIndex((p) => p.id === poolId);
  if (index === -1) return;

  const participants = getParticipantsForPool(poolId);
  const sorted = [...participants].sort((a, b) => b.score - a.score);
  sorted.forEach((p, i) => { p.rank = i + 1; });
  localStorage.setItem(`${PARTICIPANTS_KEY}_${poolId}`, JSON.stringify(sorted));

  const winners = sorted.filter((p) => p.rank === 1);
  pools[index].status = "settled";
  pools[index].winnerAddresses = winners.map((w) => w.walletAddress);
  pools[index].settledAt = new Date();
  localStorage.setItem(POOLS_KEY, JSON.stringify(pools));
}

export function getPoolsForUser(walletAddress: string): Pool[] {
  return getPools().filter((pool) => {
    const participants = getParticipantsForPool(pool.id);
    return participants.some((p) => p.walletAddress === walletAddress);
  });
}

export function getParticipantInPool(
  poolId: string,
  walletAddress: string,
): Participant | undefined {
  return getParticipantsForPool(poolId).find(
    (p) => p.walletAddress === walletAddress,
  );
}

export function joinPool(
  poolId: string,
  name: string,
  walletAddress: string,
): Participant | null {
  const pools = getPools();
  const poolIndex = pools.findIndex((p) => p.id === poolId);
  if (poolIndex === -1) return null;

  const participants = getParticipantsForPool(poolId);
  const usedTeams = new Set(participants.map((p) => p.team.name));
  const available = TEAMS.filter((t) => !usedTeams.has(t.name));
  const team = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : TEAMS[Math.floor(Math.random() * TEAMS.length)];

  const participant: Participant = {
    id: `p-${Date.now()}`,
    name,
    walletAddress,
    team,
    score: 0,
    rank: participants.length + 1,
  };

  const updatedParticipants = [...participants, participant];
  localStorage.setItem(
    `${PARTICIPANTS_KEY}_${poolId}`,
    JSON.stringify(updatedParticipants),
  );

  pools[poolIndex].participantCount = updatedParticipants.length;
  pools[poolIndex].totalPot = updatedParticipants.length * pools[poolIndex].entryFee;
  localStorage.setItem(POOLS_KEY, JSON.stringify(pools));

  return participant;
}
