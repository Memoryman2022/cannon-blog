'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { formations, Formation } from '../lib/formations';

type Position = {
  id: string;
  x: number; // % across pitch
  y: number; // % down pitch
  role: 'GK' | 'DEF' | 'MID' | 'FWD';
  player?: string; // optional player name
};

// Drag item type
const ItemTypes = {
  KIT: 'kit',
};

// Draggable Kit
const Kit = ({ player, id }: { player?: string; id: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KIT,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`w-12 h-12 cursor-pointer ${isDragging ? 'opacity-50' : ''}`}
    >
      <Image
        src="/Kit_icon.png"
        alt={player || 'Player Kit'}
        width={48}
        height={48}
        className="object-contain"
      />
    </div>
  );
};

// Droppable position on pitch
const PositionSlot = ({
  pos,
  onDrop,
}: {
  pos: Position;
  onDrop: (fromId: string, toId: string) => void;
}) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.KIT,
    drop: (item: { id: string }) => onDrop(item.id, pos.id),
  }));

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className="absolute w-12 h-12"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Kit player={pos.player} id={pos.id} />
    </div>
  );
};

export default function TeamSelection() {
  const [formationIndex, setFormationIndex] = useState(0);
  const [currentFormation, setCurrentFormation] = useState<Formation & { positions: (Position & { player?: string })[] }>(
  formations[formationIndex]
);


  const handleFormationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    setFormationIndex(index);
    setCurrentFormation(formations[index]);
  };

  // Swap players between kits
  const handleDrop = (fromId: string, toId: string) => {
    const newPositions = currentFormation.positions.map((p) => {
      if (p.id === fromId) return { ...p, player: currentFormation.positions.find((x) => x.id === toId)?.player };
      if (p.id === toId) return { ...p, player: currentFormation.positions.find((x) => x.id === fromId)?.player };
      return p;
    });
    setCurrentFormation({ ...currentFormation, positions: newPositions });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Team Selection</h2>

        <select
          value={formationIndex}
          onChange={handleFormationChange}
          className="mb-4 p-2 rounded border"
        >
          {formations.map((f, idx) => (
            <option key={f.name} value={idx}>
              {f.name}
            </option>
          ))}
        </select>

        <div className="relative w-[400px] h-[600px] bg-green-700 rounded-lg overflow-hidden">
          {/* Pitch */}
          <Image
            src="/Football_field.svg"
            alt="Football Pitch"
            fill
            className="object-cover"
          />

          {/* Player positions */}
          {currentFormation.positions.map((pos) => (
            <PositionSlot key={pos.id} pos={pos} onDrop={handleDrop} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
