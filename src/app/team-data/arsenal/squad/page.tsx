// src/app/team-data/arsenal/squad/page.tsx
import React from "react";
import Image from "next/image";
import { getFlagPath } from "@/app/lib/flagMap";

const API_URL = "https://api.football-data.org/v4/teams/57";
const API_TOKEN = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;

interface SquadPlayer {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default async function SquadPage() {
  let squad: SquadPlayer[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(API_URL, {
      headers: { "X-Auth-Token": API_TOKEN || "" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch squad (status ${res.status})`);
    }

    const data = await res.json();
    squad = data.squad || [];
  } catch (err: unknown) {
    if (err instanceof Error) error = err.message;
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!squad.length)
    return <p className="text-white">No squad data available.</p>;

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">First Team Squad</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white text-black rounded shadow">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Nationality</th>
              <th className="p-3">Age</th>
            </tr>
          </thead>
          <tbody>
            {squad.map((player) => (
              <tr key={player.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{player.name}</td>
                <td className="p-3">{player.position || "—"}</td>
                <td className="p-3 flex items-center gap-2">
                  {getFlagPath(player.nationality) && (
                    <Image
                      src={getFlagPath(player.nationality)!}
                      alt={player.nationality}
                      width={20}
                      height={14}
                      className="rounded-sm"
                    />
                  )}
                </td>
                <td className="p-3">{calculateAge(player.dateOfBirth)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
