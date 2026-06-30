"use client";

import { useState, useEffect, useCallback } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(targetDate: Date): Countdown {
  const calculate = useCallback(() => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const diff = Math.max(0, target - now);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: diff === 0,
    };
  }, [targetDate]);

  const [countdown, setCountdown] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculate]);

  return countdown;
}
