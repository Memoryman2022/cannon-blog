'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home page with query param
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="p-4 bg-red-800 flex flex-col md:flex-row justify-between items-center px-[300px] gap-2 md:gap-0">
      <h1 className="font-bold text-xl text-white">Cannon Blog</h1>

      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
        <Link href="/admin/add-post" className="text-white hover:underline">
          Add Post (Admin)
        </Link>

        <form onSubmit={handleSearch} className="ml-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded px-2 py-1 bg-red-900 text-black"
          />
          <button
            type="submit"
            className="ml-2 bg-white text-red-800 px-2 py-1 rounded hover:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-red-800"
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
