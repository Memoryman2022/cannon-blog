// src/app/team-data/arsenal/layout.tsx
import Link from 'next/link';

export default function ArsenalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-black min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://crests.football-data.org/57.png"
            alt="Arsenal"
            className="h-20"
          />
          <h1 className="text-3xl font-bold text-white">Arsenal FC</h1>
        </div>

        {/* Sub navigation */}
        <nav className="flex gap-6 mb-8 border-b border-gray-700 pb-2 text-white">
          <Link href="/team-data/arsenal">Info</Link>
          <Link href="/team-data/arsenal/squad">Squad</Link>
          <Link href="/team-data/arsenal/competitions">Competitions</Link>
          <Link href="/team-data/arsenal/fixtures">Fixtures</Link>
          <Link href="/team-data/arsenal/history">History</Link>
        </nav>

        {children}
      </div>
    </main>
  );
}
