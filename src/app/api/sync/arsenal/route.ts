import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Team } from "@/app/models/Team";
import { Player } from "@/app/models/Player";

const TEAM_ID = 57;

interface FootballApiPlayer {
  id: number;
  name: string;
  position: string | null;
  nationality: string;
  dateOfBirth: string;
}

export async function POST() {
  await connectDB();

  const API_TOKEN = process.env.FOOTBALL_DATA_API_KEY;

  const res = await fetch(
    `https://api.football-data.org/v4/teams/${TEAM_ID}`,
    {
      headers: {
        "X-Auth-Token": API_TOKEN ?? "",
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Football API fetch failed" },
      { status: 500 }
    );
  }

  const data = await res.json();

  /* ------------------ TEAM ------------------ */
  await Team.findOneAndUpdate(
    { teamId: data.id },
    {
      teamId: data.id,
      name: data.name,
      shortName: data.shortName,
      tla: data.tla,
      crest: data.crest,
      venue: data.venue,
      founded: data.founded,
      clubColors: data.clubColors,
      website: data.website,
      coach: {
        name: data.coach?.name,
        nationality: data.coach?.nationality,
      },
    },
    { upsert: true, new: true }
  );

  /* ------------------ PLAYERS ------------------ */
  const players = (data.squad as FootballApiPlayer[]).map((p) => ({
  playerId: p.id,
  teamId: data.id,
  name: p.name,
  position: p.position ?? "Unknown",
  nationality: p.nationality,
  dateOfBirth: p.dateOfBirth,
}));


  // clean replace (safe for static data)
  await Player.deleteMany({ teamId: data.id });
  await Player.insertMany(players);

  return NextResponse.json({
    success: true,
    team: data.name,
    playersSynced: players.length,
  });
}
