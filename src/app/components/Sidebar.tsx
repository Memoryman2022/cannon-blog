'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

/* ------------------ TAG DEFINITIONS ------------------ */

const PRESET_TAGS = [
  'News',
  'Match',
  'Opinion',
  'Transfer',
  'Injury',
  'Tactics',
  'Stats',
  'Finances',
];

const COMPETITION_TAGS = ['EPL', 'UCL', 'FA Cup', 'ELC'];

/* ------------------ COMPONENT ------------------ */

export default function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [competitionsOpen, setCompetitionsOpen] = useState(false);

  /* ------------------ CURRENT TAGS ------------------ */

  const currentTags = (searchParams.get('tags') || '')
    .split(',')
    .filter(Boolean);

  /* ------------------ HELPERS ------------------ */

  const updateQuery = (newTags: string[]) => {
    const query = new URLSearchParams(searchParams.toString());

    if (newTags.length > 0) {
      query.set('tags', newTags.join(','));
    } else {
      query.delete('tags');
    }

    router.push(`/?${query.toString()}`);
  };

  const toggleTag = (tag: string) => {
    let newTags: string[];

    if (currentTags.includes(tag)) {
      newTags = currentTags.filter((t) => t !== tag);
    } else {
      newTags = [...currentTags, tag];
    }

    updateQuery(newTags);
  };

  /* ------------------ COMPETITIONS LOGIC ------------------ */

  const hasAllCompetitions = COMPETITION_TAGS.every((tag) =>
    currentTags.includes(tag)
  );

  const toggleCompetitions = () => {
    let newTags: string[];

    if (hasAllCompetitions) {
      newTags = currentTags.filter(
        (tag) => !COMPETITION_TAGS.includes(tag)
      );
    } else {
      newTags = Array.from(
        new Set([...currentTags, ...COMPETITION_TAGS])
      );
    }

    updateQuery(newTags);
  };

  /* ------------------ RENDER ------------------ */

  return (
    <>
      {/* Toggle tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-40 left-0 z-50 bg-gray-900 text-white px-3 py-2 rounded-r shadow hover:bg-gray-700 transition-colors"
      >
        {isOpen ? '<' : '>'}
      </button>

      {/* Sidebar panel */}
      <aside
        className={`fixed top-45 left-0 h-full w-64 text-white p-6 shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="font-bold mb-4 text-lg">Filters</h2>

        <div className="flex flex-col gap-2">

          {/* Standard tags */}
          {PRESET_TAGS.map((tag) => {
            const selected = currentTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded text-left transition-colors ${
                  selected
                    ? 'bg-red-900 text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            );
          })}

          {/* Competitions parent */}
          <button
            onClick={toggleCompetitions}
            className={`px-3 py-1 rounded text-left flex justify-between items-center transition-colors ${
              hasAllCompetitions
                ? 'bg-red-900 text-white'
                : 'hover:bg-gray-700'
            }`}
          >
            Competitions
            <span
              onClick={(e) => {
                e.stopPropagation();
                setCompetitionsOpen(!competitionsOpen);
              }}
              className="ml-2 cursor-pointer select-none"
            >
              {competitionsOpen ? '▾' : '▸'}
            </span>
          </button>

          {/* Nested competition tags */}
          {competitionsOpen && (
            <div className="ml-4 flex flex-col gap-1">
              {COMPETITION_TAGS.map((tag) => {
                const selected = currentTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded text-left text-sm transition-colors ${
                      selected
                        ? 'bg-red-900 text-white'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </aside>
    </>
  );
}
