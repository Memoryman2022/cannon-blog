// src/app/team-data/arsenal/competitions/CompetitionsTabs.tsx
'use client';

import React, { useState } from "react";

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

interface Match {
  id: number;
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
  score: { fullTime: { home: number | null; away: number | null } };
  utcDate: string;
}

interface CompetitionsTabsProps {
  eplStandings: TeamStanding[];
  uclStandings: TeamStanding[];
}

const tabs = [
  { id: "epl", label: "Premier League" },
  { id: "ucl", label: "UEFA Champions League" },
];

export default function CompetitionsTabs({
  eplStandings,
  uclStandings,
}: CompetitionsTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("epl");

  const renderStandingsTable = (standings: TeamStanding[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-left">
        <thead className="bg-red-900">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Team</th>
            <th className="px-4 py-2">Played</th>
            <th className="px-4 py-2">W</th>
            <th className="px-4 py-2">D</th>
            <th className="px-4 py-2">L</th>
            <th className="px-4 py-2">GF</th>
            <th className="px-4 py-2">GA</th>
            <th className="px-4 py-2">GD</th>
            <th className="px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-black">
          {standings.map((team) => (
            <tr
              key={team.team.id}
              className={`hover:bg-gray-900 ${team.team.name === "Arsenal" ? "bg-red-800/30" : ""}`}
            >
              <td className="px-4 py-2">{team.position}</td>
              <td className="px-4 py-2 flex items-center gap-2">
                <img src={team.team.crest} alt={team.team.name} className="w-6 h-6 object-contain" />
                {team.team.name}
              </td>
              <td className="px-4 py-2">{team.playedGames}</td>
              <td className="px-4 py-2">{team.won}</td>
              <td className="px-4 py-2">{team.draw}</td>
              <td className="px-4 py-2">{team.lost}</td>
              <td className="px-4 py-2">{team.goalsFor}</td>
              <td className="px-4 py-2">{team.goalsAgainst}</td>
              <td className="px-4 py-2">{team.goalDifference}</td>
              <td className="px-4 py-2">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMatchesTable = (matches: Match[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-left">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Home</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Away</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-black">
          {matches.map((match) => (
            <tr key={match.id} className="hover:bg-gray-900">
              <td className="px-4 py-2">{new Date(match.utcDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{match.homeTeam.name}</td>
              <td className="px-4 py-2">
                {match.score.fullTime.home ?? "-"} : {match.score.fullTime.away ?? "-"}
              </td>
              <td className="px-4 py-2">{match.awayTeam.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md font-semibold ${
              activeTab === tab.id
                ? "bg-red-800 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-900 p-4 rounded-md min-h-[300px]">
        {activeTab === "epl" && renderStandingsTable(eplStandings)}
        {activeTab === "ucl" && renderStandingsTable(uclStandings)}
      </div>
    </>
  );
}
