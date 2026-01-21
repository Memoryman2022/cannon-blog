// src/app/team-data/arsenal/page.tsx
import React from "react";
import Image from 'next/image';


const API_URL = "https://api.football-data.org/v4/teams/57";
const API_TOKEN = process.env.FOOTBALL_DATA_API_KEY; // server-side key

interface TeamData {
  name: string;
  tla: string;
  crest: string;
  address: string;
  phone: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  coach: {
    name: string;
    nationality: string;
  };
  runningCompetitions: { name: string; code: string; type: string }[];
}

export default async function ArsenalPage() {
  let team: TeamData | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(API_URL, {
      headers: { "X-Auth-Token": API_TOKEN || "" },
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(`Failed to fetch team data (status: ${res.status})`);

    const data = await res.json();

    // Pick only the fields we want to display
    team = {
      name: data.name,
      tla: data.tla,
      crest: data.crest,
      address: data.address,
      phone: data.phone,
      website: data.website,
      founded: data.founded,
      clubColors: data.clubColors,
      venue: data.venue,
      coach: data.coach,
      runningCompetitions: data.runningCompetitions,
    };
  } catch (err: unknown) {
    if (err instanceof Error) error = err.message;
  }

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!team) return <p className="p-6 text-white">Loading...</p>;

  return (
    <main className="p-6 bg-black min-h-screen">
      <div className="w-full mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          {team.name} ({team.tla})
        </h1>
        <p className="text-gray-700 mb-2">
          <strong>Founded:</strong> {team.founded}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Venue:</strong> {team.venue}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Colors:</strong> {team.clubColors}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Coach:</strong> {team.coach.name} ({team.coach.nationality})
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Competitions:</strong>{" "}
          {team.runningCompetitions.map((c) => c.name).join(", ")}
        </p>
        <p className="text-gray-700">
          <strong>Website:</strong>
          <a
            href={team.website}
            target="_blank"
            className="text-blue-600 underline ml-1"
          >
            {team.website}
          </a>
        </p>
      </div>
    </main>
  );
}
