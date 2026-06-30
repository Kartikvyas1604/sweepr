"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import type { Pool, Participant } from "@/lib/types";
import { TEAMS } from "@/lib/types";

interface UsePoolReturn {
  pool: Pool;
  participants: Participant[];
  addParticipant: (name: string, walletAddress: string) => Participant;
  updateScore: (participantId: string, points: number) => void;
  simulateGoal: () => string | null;
  sortedParticipants: Participant[];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function usePool(initialPool: Pool): UsePoolReturn {
  const [pool] = useState<Pool>(initialPool);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [availableTeams] = useState(() => shuffleArray(TEAMS));
  const teamIndexRef = useRef(0);

  const addParticipant = useCallback(
    (name: string, walletAddress: string): Participant => {
      const idx = teamIndexRef.current;
      teamIndexRef.current = (idx + 1) % availableTeams.length;
      const team = availableTeams[idx];

      const newParticipant: Participant = {
        id: `p-${Date.now()}`,
        name,
        walletAddress,
        team,
        score: 0,
        rank: 0,
      };

      setParticipants((prev) => {
        const updated = [...prev, newParticipant];
        return updated.map((p, i) => ({ ...p, rank: i + 1 }));
      });

      return newParticipant;
    },
    [availableTeams],
  );

  const updateScore = useCallback(
    (participantId: string, points: number) => {
      setParticipants((prev) =>
        prev
          .map((p) =>
            p.id === participantId
              ? { ...p, score: p.score + points }
              : p,
          )
          .sort((a, b) => b.score - a.score || a.rank - b.rank)
          .map((p, i) => ({ ...p, rank: i + 1 })),
      );
    },
    [],
  );

  const simulateGoal = useCallback((): string | null => {
    if (participants.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * participants.length);
    const targetId = participants[randomIndex].id;
    updateScore(targetId, 1);
    return targetId;
  }, [participants, updateScore]);

  const sortedParticipants = useMemo(
    () =>
      [...participants].sort(
        (a, b) => b.score - a.score || a.rank - b.rank,
      ),
    [participants],
  );

  return {
    pool,
    participants,
    addParticipant,
    updateScore,
    simulateGoal,
    sortedParticipants,
  };
}
