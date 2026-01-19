import React from 'react';
import { DialogueEntry } from '../types';

interface DialogueItemProps {
  entry: DialogueEntry;
}

export const DialogueItem: React.FC<DialogueItemProps> = ({ entry }) => {
  const isMorgan = entry.speaker === 'Morgan';

  return (
    <div className={`flex flex-col mb-12 relative ${isMorgan ? 'pl-0 md:pl-8' : 'pr-0 md:pr-8 opacity-70'}`}>
      {isMorgan && (
        <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-gradient-to-b from-electric-teal to-transparent md:block hidden"></div>
      )}
      
      <div className="flex items-baseline mb-3">
        <span className={`
          text-[10px] font-mono uppercase tracking-widest
          ${isMorgan ? 'text-electric-teal font-bold' : 'text-white/40'}
        `}>
          {isMorgan ? 'K. MORGAN' : 'INFRASTRUCTURE ARCHITECT'}
        </span>
      </div>
      
      <div className={`
        leading-relaxed text-lg md:text-xl
        ${isMorgan ? 'font-serif text-white font-light' : 'font-sans font-medium text-white/50'}
      `}>
        {entry.text}
      </div>
    </div>
  );
};