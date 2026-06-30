export interface Pool {
  id: string;
  name: string;
  entryFee: number;
  totalPot: number;
  escrowAddress: string;
  status: "open" | "active" | "settled";
  matchCount: number;
  participantCount: number;
  createdAt: Date;
  expiresAt: Date;
  isPrivate: boolean;
  passphrase: string;
}

export interface Participant {
  id: string;
  name: string;
  walletAddress: string;
  team: Team;
  score: number;
  rank: number;
}

export interface Team {
  name: string;
  flag: string;
  group: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: "scheduled" | "live" | "finished";
  minute?: number;
}

export const TEAMS: Team[] = [
  { name: "Brazil", flag: "🇧🇷", group: "A" },
  { name: "Argentina", flag: "🇦🇷", group: "A" },
  { name: "France", flag: "🇫🇷", group: "B" },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "B" },
  { name: "Germany", flag: "🇩🇪", group: "C" },
  { name: "Spain", flag: "🇪🇸", group: "C" },
  { name: "Portugal", flag: "🇵🇹", group: "D" },
  { name: "Netherlands", flag: "🇳🇱", group: "D" },
  { name: "Italy", flag: "🇮🇹", group: "E" },
  { name: "Belgium", flag: "🇧🇪", group: "E" },
  { name: "Croatia", flag: "🇭🇷", group: "F" },
  { name: "Uruguay", flag: "🇺🇾", group: "F" },
  { name: "Morocco", flag: "🇲🇦", group: "G" },
  { name: "Japan", flag: "🇯🇵", group: "G" },
  { name: "USA", flag: "🇺🇸", group: "H" },
  { name: "Colombia", flag: "🇨🇴", group: "H" },
];
