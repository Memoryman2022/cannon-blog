// src/app/team-data/arsenal/fixtures/page.tsx
import React from "react";

const API_TOKEN = process.env.FOOTBALL_DATA_API_KEY;
const ARSENAL_ID = 57; // Arsenal team ID
const SEASON = 2025; // current season

interface Match {
  id: number;
  utcDate: string;
  competition: { name: string };
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
  score: {
    fullTime: { home: number | null; away: number | null };
  };
}

interface MatchesResponse {
  matches: Match[];
}

async function fetchFixtures(): Promise<Match[]> {
  const res = await fetch(
    `https://api.football-data.org/v4/teams/${ARSENAL_ID}/matches?season=${SEASON}`,
    {
      headers: { "X-Auth-Token": API_TOKEN || "" },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Failed to fetch fixtures: ${res.status}`);
  const data: MatchesResponse = await res.json();
  return data.matches;
}

export default async function ArsenalFixturesPage() {
  let matches: Match[] = [];

  try {
    matches = await fetchFixtures();
  } catch (err) {
    return (
      <p className="p-6 text-red-500">
        Error fetching Arsenal fixtures: {(err as Error).message}
      </p>
    );
  }

  // Determine result for Arsenal
  const getResultIcon = (match: Match) => {
    const { homeTeam, awayTeam, score } = match;
    const isArsenalHome = homeTeam.id === ARSENAL_ID;

    if (score.fullTime.home === null || score.fullTime.away === null) return null;

    const arsenalGoals = isArsenalHome ? score.fullTime.home : score.fullTime.away;
    const opponentGoals = isArsenalHome ? score.fullTime.away : score.fullTime.home;

    if (arsenalGoals > opponentGoals) return <span className="w-4 h-4 inline-block rounded-full bg-green-500"></span>;
    if (arsenalGoals < opponentGoals) return <span className="w-4 h-4 inline-block rounded-full bg-red-500"></span>;
    return <span className="w-4 h-4 inline-block rounded-full bg-gray-500"></span>;
  };

  return (
    <main className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-white mb-6"> Fixtures</h1>

      {matches.length === 0 && <p>No fixtures found for this season.</p>}

      {matches.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-left">
            <thead className="bg-red-900">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Competition</th>
                <th className="px-4 py-2">Home</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Away</th>
                <th className="px-2 py-2"></th> {/* Win/Loss/Draw column */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-white text-black">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-300">
                  <td className="px-4 py-2">{new Date(match.utcDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{match.competition.name}</td>
                  <td className="px-4 py-2">{match.homeTeam.name}</td>
                  <td className="px-4 py-2">
                    {match.score.fullTime.home !== null
                      ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                      : "-"}
                  </td>
                  <td className="px-4 py-2">{match.awayTeam.name}</td>
                  <td className="px-2 py-2 text-center">{getResultIcon(match)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
