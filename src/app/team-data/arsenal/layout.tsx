// src/app/team-data/arsenal/layout.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function ArsenalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-black min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Image src="/Arsenal.png"
                         alt="Arsenal"
                         className='w-40px'
                          width={100}
                          height={100}></Image>
          <h1 className="text-3xl font-bold text-white">Arsenal FC</h1>
        </div>

        {/* Sub navigation */}
        <nav className="flex gap-6 mb-8 border-b border-gray-700 pb-2 text-white">
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
