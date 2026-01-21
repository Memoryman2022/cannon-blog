import React from 'react';
import Image from 'next/image';
import { connectDB } from '@/app/lib/mongodb';
import { Player } from '@/app/models/Player';
import { getFlagPath } from '@/app/lib/flagMap';

interface SquadPlayer {
  _id: string;
  name: string;
  position: string;
  dateOfBirth: Date;
  nationality: string;
}

function calculateAge(dateOfBirth: Date): number {
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
  await connectDB();

  const squad: SquadPlayer[] = await Player.find({ teamId: 57 })
    .sort({ position: 1, name: 1 })
    .lean();

  if (!squad.length) {
    return (
      <p className="p-6 text-white">
        No squad data available. Run the sync first.
      </p>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        First Team Squad
      </h2>

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
              <tr
                key={player._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{player.name}</td>
                <td className="p-3">{player.position || '—'}</td>
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
                  <span>{player.nationality}</span>
                </td>
                <td className="p-3">
                  {calculateAge(player.dateOfBirth)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
