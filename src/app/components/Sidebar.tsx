'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const PRESET_TAGS = [
  "Opinion",
  "News",
  "Injury",
  "UCL",
  "EPL",
  "ELC",
  "FACup",
  "Transfer",
  "Tactics",
  "Finances",
  "Match",
];

export default function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // controls visibility

  const currentTags = (searchParams.get('tags') || '')
    .split(',')
    .filter(Boolean);

  const toggleTag = (tag: string) => {
    let newTags: string[];
    if (currentTags.includes(tag)) {
      newTags = currentTags.filter((t) => t !== tag);
    } else {
      newTags = [...currentTags, tag];
    }

    const query = new URLSearchParams(searchParams.toString());
    if (newTags.length > 0) {
      query.set('tags', newTags.join(','));
    } else {
      query.delete('tags');
    }

    router.push(`/?${query.toString()}`);
  };

  return (
    <>
      {/* Toggle tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top  left-0 z-50 bg-gray-600 text-white px-3 py-2 rounded-r shadow hover:bg-gray-200 transition-colors"
      >
        {isOpen ? '<' : '>'}
      </button>

      {/* Sidebar panel */}
      <aside
        className={`fixed top-30  left-0 h-full w-64 bg-gray-900 text-white p-6 shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="font-bold mb-4 text-lg">Filter Posts by Tags</h2>
        <div className="flex flex-col gap-2">
          {PRESET_TAGS.map((tag) => {
            const selected = currentTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded text-left transition-colors ${
                  selected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
