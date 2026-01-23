// lib/formations.ts
export type Position = {
  id: string;
  x: number; // % across pitch
  y: number; // % down pitch
  role: 'GK' | 'DEF' | 'MID' | 'FWD';
};

export type Formation = {
  name: string;
  positions: Position[];
};

export const formations: Formation[] = [
  // 4-4-2
  {
    name: '4-4-2',
    positions: [
      { id: 'gk', x: 50, y: 95, role: 'GK' },
      { id: 'def1', x: 20, y: 75, role: 'DEF' },
      { id: 'def2', x: 40, y: 75, role: 'DEF' },
      { id: 'def3', x: 60, y: 75, role: 'DEF' },
      { id: 'def4', x: 80, y: 75, role: 'DEF' },
      { id: 'mid1', x: 20, y: 50, role: 'MID' },
      { id: 'mid2', x: 40, y: 50, role: 'MID' },
      { id: 'mid3', x: 60, y: 50, role: 'MID' },
      { id: 'mid4', x: 80, y: 50, role: 'MID' },
      { id: 'fwd1', x: 35, y: 25, role: 'FWD' },
      { id: 'fwd2', x: 65, y: 25, role: 'FWD' },
    ],
  },

  // 4-3-3
  {
    name: '4-3-3',
    positions: [
      { id: 'gk', x: 50, y: 95, role: 'GK' },
      { id: 'def1', x: 15, y: 75, role: 'DEF' },
      { id: 'def2', x: 35, y: 75, role: 'DEF' },
      { id: 'def3', x: 65, y: 75, role: 'DEF' },
      { id: 'def4', x: 85, y: 75, role: 'DEF' },
      { id: 'mid1', x: 30, y: 50, role: 'MID' },
      { id: 'mid2', x: 50, y: 50, role: 'MID' },
      { id: 'mid3', x: 70, y: 50, role: 'MID' },
      { id: 'fwd1', x: 20, y: 25, role: 'FWD' },
      { id: 'fwd2', x: 50, y: 20, role: 'FWD' },
      { id: 'fwd3', x: 80, y: 25, role: 'FWD' },
    ],
  },

  // 3-5-2
  {
    name: '3-5-2',
    positions: [
      { id: 'gk', x: 50, y: 95, role: 'GK' },
      { id: 'def1', x: 30, y: 75, role: 'DEF' },
      { id: 'def2', x: 50, y: 75, role: 'DEF' },
      { id: 'def3', x: 70, y: 75, role: 'DEF' },
      { id: 'mid1', x: 15, y: 50, role: 'MID' },
      { id: 'mid2', x: 35, y: 50, role: 'MID' },
      { id: 'mid3', x: 50, y: 50, role: 'MID' },
      { id: 'mid4', x: 65, y: 50, role: 'MID' },
      { id: 'mid5', x: 85, y: 50, role: 'MID' },
      { id: 'fwd1', x: 35, y: 25, role: 'FWD' },
      { id: 'fwd2', x: 65, y: 25, role: 'FWD' },
    ],
  },

  // 4-2-3-1
  {
    name: '4-2-3-1',
    positions: [
      { id: 'gk', x: 50, y: 95, role: 'GK' },
      { id: 'def1', x: 20, y: 75, role: 'DEF' },
      { id: 'def2', x: 40, y: 75, role: 'DEF' },
      { id: 'def3', x: 60, y: 75, role: 'DEF' },
      { id: 'def4', x: 80, y: 75, role: 'DEF' },
      { id: 'mid1', x: 35, y: 60, role: 'MID' },
      { id: 'mid2', x: 65, y: 60, role: 'MID' },
      { id: 'mid3', x: 20, y: 40, role: 'MID' },
      { id: 'mid4', x: 50, y: 40, role: 'MID' },
      { id: 'mid5', x: 80, y: 40, role: 'MID' },
      { id: 'fwd1', x: 50, y: 20, role: 'FWD' },
    ],
  },

  // 5-3-2
  {
    name: '5-3-2',
    positions: [
      { id: 'gk', x: 50, y: 95, role: 'GK' },
      { id: 'def1', x: 10, y: 75, role: 'DEF' },
      { id: 'def2', x: 30, y: 75, role: 'DEF' },
      { id: 'def3', x: 50, y: 75, role: 'DEF' },
      { id: 'def4', x: 70, y: 75, role: 'DEF' },
      { id: 'def5', x: 90, y: 75, role: 'DEF' },
      { id: 'mid1', x: 25, y: 50, role: 'MID' },
      { id: 'mid2', x: 50, y: 50, role: 'MID' },
      { id: 'mid3', x: 75, y: 50, role: 'MID' },
      { id: 'fwd1', x: 40, y: 25, role: 'FWD' },
      { id: 'fwd2', x: 60, y: 25, role: 'FWD' },
    ],
  },
];
