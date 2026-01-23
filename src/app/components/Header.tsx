'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home page with query param
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  return (
<nav className="p-4 bg-red-800 flex flex-col md:flex-row md:items-center md:justify-between px-[300px] gap-4">
    
    {/* LEFT: Logo (Home link) */}
    <Link href="/" className="flex items-center">
      <Image
        src="/All-About-Arsenal.png"
        alt="Arsenal"
        width={120}
        height={120}
        className="w-[80px]"
        priority
      />
    </Link>

    {/* RIGHT: Nav links + search */}
<div className="flex items-center gap-6 md:justify-end">
      <Link href="/admin/add-post" className="text-white hover:underline">
        Add Post (Admin)
      </Link>

      <Link href="/team-data/arsenal" className="text-white hover:underline">
        The Club
      </Link>

      <form onSubmit={handleSearch} className="flex items-center gap-x-2">
        <input
          type="text"
          placeholder="Search titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded px-2 py-1 bg-red-900 text-black"
        />
        <button
          type="submit"
          className="bg-white text-red-800 px-2 py-1 rounded hover:bg-gray-400 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-4 text-red-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </button>
      </form>
    </div>

  </nav>
);
}