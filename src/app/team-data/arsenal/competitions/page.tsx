// src/app/team-data/arsenal/competitions/page.tsx
import React from "react";
import CompetitionsTabs from "./CompetitionsTabs";

const API_TOKEN = process.env.FOOTBALL_DATA_API_KEY;

// API endpoints
const EPL_API_URL = "https://api.football-data.org/v4/competitions/PL/standings";
const UCL_API_URL = "https://api.football-data.org/v4/competitions/CL/standings";


interface TeamStanding {
  position: number;
  team: { id: number; name: string; crest: string };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}
// Add this above fetchStandings
interface StandingsResponse {
  standings: {
    type: "TOTAL" | "HOME" | "AWAY";
    stage: string;
    table: TeamStanding[];
  }[];
}


interface Match {
  id: number;
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
  score: { fullTime: { home: number | null; away: number | null } };
  utcDate: string;
}

async function fetchStandings(url: string): Promise<TeamStanding[]> {
  const res = await fetch(url, {
    headers: { "X-Auth-Token": API_TOKEN || "" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

  // Fully typed JSON response
  const data: StandingsResponse = await res.json();

  // Use proper typing instead of any
  const totalStandings = data.standings.find(
    (s) => s.type === "TOTAL"
  );

  return totalStandings?.table || [];
}


async function fetchMatches(url: string): Promise<Match[]> {
  const res = await fetch(url, {
    headers: { "X-Auth-Token": API_TOKEN || "" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const data = await res.json();
  return data.matches || [];
}

export default async function CompetitionsPage() {
  const [eplStandings, uclStandings] = await Promise.all([
    fetchStandings(EPL_API_URL),
    fetchStandings(UCL_API_URL),
  ]);

  return (
    <main className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-white mb-6">Competitions</h1>

      <CompetitionsTabs
        eplStandings={eplStandings}
        uclStandings={uclStandings}
      />
    </main>
  );
}
